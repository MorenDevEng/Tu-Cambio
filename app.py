import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request, flash
from core.get_price import valor_obtenido
import asyncio

# Load variables from .env if present
load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")

JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

USER_ENV_KEY = "USER"
PASS_ENV_KEY = "PASS"


def _jwt_secret():
    secret = os.getenv("SECRET_KEY")
    if not secret:
        raise RuntimeError("SECRET_KEY is not configured")
    return secret


def _create_access_token(username):
    now = datetime.now(timezone.utc)
    payload = {
        "sub": username,
        "iat": now,
        "exp": now + timedelta(hours=JWT_EXPIRATION_HOURS),
    }
    return jwt.encode(payload, _jwt_secret(), algorithm=JWT_ALGORITHM)


def _get_bearer_token():
    authorization = request.headers.get("Authorization", "")
    if authorization.startswith("Bearer "):
        return authorization[len("Bearer "):].strip()
    return None


def _require_jwt():
    token = _get_bearer_token()
    if not token:
        return None, (jsonify({"error": "Missing or invalid Authorization header"}), 401)
    try:
        claims = jwt.decode(token, _jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        return None, (jsonify({"error": "Invalid or expired token"}), 401)
    return claims, None


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    configured_user = os.getenv(USER_ENV_KEY)
    configured_password = os.getenv(PASS_ENV_KEY)

    if not configured_user or not configured_password:
        return jsonify({"error": "Authentication is not configured"}), 500

    if not username or not password or username != configured_user or password != configured_password:
        return jsonify({"error": "Invalid credentials"}), 401

    token = _create_access_token(username)
    return jsonify(
        {
            "access_token": token,
            "token_type": "Bearer",
            "expires_in": JWT_EXPIRATION_HOURS * 3600,
        }
    )


@app.route("/")
def home():
    valor = asyncio.run(valor_obtenido())

    usdt_valor, err_usdt = valor["price_usdt"]
    bcv_valor, err_bcv = valor["price_dolar_bcv"]
    euro_valor, err_euro = valor["price_euro_bcv"]

    if err_bcv and err_usdt:
        mens = err_bcv + " " + err_usdt
        flash(mens, "danger")
    elif err_bcv:
        flash(err_bcv, "warning")
    elif err_usdt:
        flash(err_usdt, "warning")

    return render_template(
        "index.html", usdt_valor=usdt_valor, bcv_valor=bcv_valor, euro_valor=euro_valor
    )


@app.route("/price/ves-prices")
def price_usdt_usd_ves():
    _, auth_error = _require_jwt()
    if auth_error:
        return auth_error

    valor = asyncio.run(valor_obtenido())

    usdt_valor = valor["price_usdt"][0]
    bcv_valor = valor["price_dolar_bcv"][0]
    euro_valor = valor["price_euro_bcv"][0]

    return {"usdt_valor": usdt_valor, "bcv_valor": bcv_valor, "euro_valor": euro_valor}


app = app

# Para que Vercel lo ejecute
if __name__ == "__main__":
    app.run(debug=True)
