import os
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import json 
import time
import asyncio
import aiohttp
import ssl
import logging
from dotenv import load_dotenv

# Cargar el archivo .env
load_dotenv()

logger = logging.getLogger(__name__)

URL_BINANCE = os.getenv('URL_BINANCE')

URL_BCV = os.getenv('URL_BCV')

BASE_DIR = Path(__file__).resolve().parent

ubicacion_json = os.path.join(BASE_DIR, 'dolar_ves.json')

headers = {
    "Content-Type": "application/json",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

ssl_contenido = ssl.create_default_context(cafile=os.path.join(BASE_DIR, 'bcv.org.ve.crt'))

async def obtener_valor_usdt():
    """Busca el dato directamente en el endpoint de Binance"""

    payload = {
        "fiat":"VES",
        "tradeType":"BUY",
        "asset":"USDT",
        "payTypes":["PagoMovil"],
        "publisherType":"merchant",
        "page":1,
        "rows":1
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(URL_BINANCE, json=payload, headers=headers, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                data = await resp.json()

        if resp.status != 200:
            return 0, "No se pudo extraer informacion de la URL de Binance"

        prices = [float(item["adv"]["price"]) for item in data['data']]
        price = {
            'Minimo':round(prices[0], 2),
            'Promedio':round(sum(prices) / len(prices), 2),
            'Maximo':round(prices[-1], 2)
        }

        price = round(prices[0], 2)

        return price,''

    except asyncio.TimeoutError:
        return 0, "Timeout consultando Binance"
    except aiohttp.ClientError:
        return 0, "Error de conexión con Binance"
    except (KeyError, ValueError):
        return 0, "Error procesando datos de Binance"


async def obtener_dolar_bcv():
    """Busca el dato con WebScrapping"""

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(URL_BCV, headers=headers, timeout=10, ssl=ssl_contenido) as resp:
                respuesta = await resp.text()

        if resp.status != 200:
            return 0, "BCV no disponible"

        soup = BeautifulSoup(respuesta, 'html.parser')

        valor_dolar = soup.find('div', id='dolar').find('strong').string

        dolar_bcv = float(valor_dolar.replace(" ", "").replace(',', '.'))
        
        return round(dolar_bcv, 2), ''

    except ssl.SSLError:
        return 0, "Error SSL con BCV"
    except asyncio.TimeoutError:
        return 0, "Timeout consultando BCV"
    except aiohttp.ClientError:
        return 0, "Error de conexión con BCV"
    except (AttributeError, ValueError):
        return 0, "Error procesando datos del BCV"

async def actualizacion_json():

    price_usdt, price_bcv = await asyncio.gather(
        obtener_valor_usdt(),
        obtener_dolar_bcv()
    )

    data = {
        "price_usdt": price_usdt,
        "price_bcv": price_bcv,
    }

    try:
        # Crea el archivo por primera vez

        with open(ubicacion_json, 'x', encoding='utf-8') as archivo:
            json.dump(data, archivo, indent=4)    

    except FileExistsError:
        # Modifica el contenido del archivo si ya existe

        with open(ubicacion_json, 'w', encoding='utf-8') as archivo:
            json.dump(data, archivo, indent=4)


async def valor_obtenido():
    """Obtiene el valor del JSON"""
    
    await actualizacion_json()

    try:

        with open(ubicacion_json, 'r', encoding='utf-8') as archivo:
            data = json.load(archivo)

    except Exception as e:
        pass
    
    return data
