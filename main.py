import os
from flask import Flask, render_template, flash
from core.get_price import valor_obtenido
from dotenv import load_dotenv

# Cargar el archivo .env
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-key-default')

# 1. Convertimos las rutas a 'async def'
@app.route('/')
async def home():
    # 2. Usamos 'await' directamente. Flask se encarga del resto.
    try:
        valor = await valor_obtenido()
        
        usdt_valor, err_usdt = valor['price_usdt']
        bcv_valor, err_bcv = valor['price_bcv']

        if err_bcv and err_usdt:
            flash(f"{err_bcv} {err_usdt}", "danger")
        elif err_bcv:
            flash(err_bcv, "warning")
        elif err_usdt:
            flash(err_usdt, "warning")

        return render_template('index.html', usdt_valor=usdt_valor, bcv_valor=bcv_valor)
    except Exception as e:
        return f"Error obteniendo precios: {e}", 500

@app.route("/price/ves-prices")
async def price_usdt_usd_ves():
    # 3. Aplicamos lo mismo aquí
    valor = await valor_obtenido()
    
    usdt_valor = valor['price_usdt'][0]
    bcv_valor = valor['price_bcv'][0]

    return {"usdt_valor": usdt_valor, "bcv_valor": bcv_valor}

# Borramos la función run_async ya que no es necesaria y causa el error 500

app = app

if __name__ == "__main__":
    app.run(debug=True)