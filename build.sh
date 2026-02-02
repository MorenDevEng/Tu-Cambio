#!/bin/bash
echo "🚀 [BUILD] Forzando descarga limpia de dependencias..."

# Forzamos la reinstalación ignorando la caché
python3.12 -m pip install --no-cache-dir --force-reinstall -r requirements.txt

# Listamos para confirmar en el log de Vercel
echo "📋 Paquetes verificados:"
pip list | grep -E "Flask|asgiref|python-dotenv"