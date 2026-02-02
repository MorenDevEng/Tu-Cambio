import os
from flask import Flask, render_template, flash
from core.get_price import valor_obtenido
import asyncio
from dotenv import load_dotenv

# Cargar el archivo .env
load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv('SECRET_KEY')

@app.get('/')
def home():

    valor = asyncio.run(valor_obtenido())

    usdt_valor, err_usdt = valor['price_usdt']
    bcv_valor, err_bcv = valor['price_bcv']

    if err_bcv and err_usdt:
        mens = err_bcv+' '+err_usdt
        flash(mens, "danger")

    elif err_bcv:
        flash(err_bcv, "warning")
    
    elif err_usdt:
        flash(err_usdt, "warning")

    return render_template('index.html', usdt_valor = usdt_valor, bcv_valor = bcv_valor)


@app.route("/price/ves-prices")
def price_usdt_usd_ves():

    valor = asyncio.run(valor_obtenido())

    usdt_valor, err_usdt = valor['price_usdt']
    bcv_valor, err_bcv = valor['price_bcv']

    if err_bcv and err_usdt:
        mens = err_bcv+' '+err_usdt
        flash(mens, "danger")

    elif err_bcv:
        flash(err_bcv, "warning")
    
    elif err_usdt:
        flash(err_usdt, "warning")

    return {"usdt_valor":usdt_valor, "bcv_valor":bcv_valor}

# Solo para ejecución local
if __name__ == "__main__":
    app.run(debug=True)