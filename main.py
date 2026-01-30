from flask import Flask, redirect, render_template
from core.get_price import valor_obtenido

app = Flask(__name__)



@app.get('/')
def home():

    valor = valor_obtenido()

    usdt_valor = valor['price_usdt']['Minimo']
    bcv_valor = valor['price_bcv']

    return render_template('index.html', usdt_valor = usdt_valor, bcv_valor = bcv_valor)



@app.route("/price/usdt-ves")
def price_usdt_ves():

    valor = valor_obtenido()

    usdt_valor = valor['price_usdt']['Minimo']
    bcv_valor = valor['price_bcv']

    return {"usdt_valor":usdt_valor, "bcv_valor":bcv_valor}
