#!/bin/bash
echo "🔥 [FORCE INSTALL] Eliminando cache y forzando descarga..."

python3.12 -m pip install --no-cache-dir --force-reinstall -vv -r requirements.txt

echo "📋 Verificando si dotenv está presente:"
pip show python-dotenv

echo "✅ Instalación finalizada."