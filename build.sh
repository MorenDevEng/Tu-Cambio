#!/bin/bash
echo "🚀 [BUILD] Iniciando instalación..."

# Instalamos las dependencias
# Forzamos la reinstalación ignorando la caché de Vercel
python3 -m pip install --upgrade pip
pip install --no-cache-dir --force-reinstall -r requirements.txt

# Esto es lo que querías: ver si realmente están ahí
echo "📋 Verificando instalación:"
pip list | grep -E "Flask|asgiref|python-dotenv"