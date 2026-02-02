#!/bin/bash
echo "🚀 INICIANDO INSTALACIÓN FORZADA"

# Forzar instalación de dependencias
python3.12 -m pip install --no-cache-dir --force-reinstall -r requirements.txt

echo "📊 VERIFICANDO PAQUETES EXTERNOS:"
python3.12 -m pip show python-dotenv
python3.12 -m pip show aiohttp

echo "🛡️ VERIFICANDO SSL NATIVO:"
# Esto comprueba que el módulo interno de Python funciona
python3.12 -c "import ssl; print('✅ Módulo SSL cargado'); print('✅ Versión OpenSSL:', ssl.OPENSSL_VERSION)"

echo "📁 BUSCANDO CERTIFICADO:"
ls -l core/bcvcert.crt || echo "❌ El certificado no existe en la carpeta core"

echo "✅ BUILD FINALIZADO"