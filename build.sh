#!/bin/bash
echo "🔥 [FORCE INSTALL] Eliminando cache y forzando descarga..."

# 1. Instalación agresiva de dependencias
python3.12 -m pip install -r requirements.txt --break-system-packages

echo "📋 Verificando dependencias instaladas:"
python3.12 -m pip show python-dotenv
python3.12 -m pip show aiohttp

echo "🛡️  VERIFICANDO SSL EN EL SISTEMA:"
# Esta es la única forma real de saber si SSL funciona en Python
python3.12 -c "import ssl; print('✅ Módulo SSL cargado correctamente'); print('✅ Versión OpenSSL:', ssl.OPENSSL_VERSION)"

echo "📁 Verificando existencia de certificado en core/:"
if [ -f "core/bcvcert.crt" ]; then
    echo "✅ Archivo bcvcert.crt encontrado."
else
    echo "❌ ERROR: bcvcert.crt no existe en la carpeta core."
    ls -R core/
fi

echo "✅ Proceso de build finalizado."