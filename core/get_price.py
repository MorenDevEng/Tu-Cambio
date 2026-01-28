import os
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import json

URL_BINANCE = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"

URL_BCV = "https://www.bcv.org.ve/"

BASE_DIR = Path(__file__).resolve().parent

ubicacion_json = os.path.join(BASE_DIR, 'dolar_ves.json')

headers = {
    "Content-Type": "application/json",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

def obtener_valor_usdt():
    """Busca el dato directamente en el endpoint de Binance"""

    payload = {
        "fiat":"VES",
        "tradeType":"BUY",
        "asset":"USDT",
        "payTypes":["PagoMovil"],
        "publisherType":"merchant",
        "page":1,
        "rows":5
    }

    response = requests.post(URL_BINANCE,json=payload, headers=headers, timeout=10)
    response.raise_for_status()

    data = response.json()['data']
    prices = [float(item["adv"]["price"]) for item in data]
    price = {
        'Minimo':prices[0],
        'Promedio':round(sum(prices) / len(prices), 2),
        'Maximo':prices[-1]
    }

    return price

def obtener_dolar_bcv():
    """Busca el dato con WebScrapping"""

    respuesta = requests.get(URL_BCV, verify=os.path.join(BASE_DIR, 'bcv.org.ve.crt'), headers=headers)

    if respuesta.status_code == 200:

        soup = BeautifulSoup(respuesta.text, 'html.parser')

        valor_dolar = soup.find('div', id='dolar').find('strong').string

        dolar_bcv = float(valor_dolar.replace(" ", "").replace(',', '.'))
        
        return round(dolar_bcv, 2)

def crear_json():

    # data = {
    #     'price_usdt': obtener_valor_usdt(),
    #     'price_bcv': obtener_dolar_bcv()
    # }

    try:
        # Crea el archivo por primera vez

        with open(ubicacion_json, 'x', encoding='utf-8') as archivo:
            json.dump(data, archivo, indent=4)    

    except FileExistsError:
        # Modifica el contenido del archivo si ya existe

        with open(ubicacion_json, 'w', encoding='utf-8') as archivo:
            json.dump(data, archivo, indent=4)






