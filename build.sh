#!/bin/bash
echo "🔥 [FORCE INSTALL] Eliminando cache y forzando descarga..."

# Forzamos a que pip sea extremadamente ruidoso (-vv) 
# y que no use nada guardado en cache (--no-cache-dir)
python3.12 -m pip install --upgrade pip
python3.12 -m pip install --no-cache-dir --force-reinstall -vv -r requirements.txt

echo "📋 Verificando si dotenv está presente:"
pip show python-dotenv

echo "✅ Instalación finalizada."