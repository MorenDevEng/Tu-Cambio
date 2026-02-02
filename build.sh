#!/bin/bash
echo "🚀 [BUILD] Iniciando instalación..."

# Instalamos las dependencias
if [ -f requirements.txt ]; then
    # Usamos --user o simplemente confiamos en el entorno virtual de Vercel
    pip install -r requirements.txt
    echo "✅ Dependencias instaladas."
else
    echo "❌ No se encontró requirements.txt"
    exit 1
fi

# Esto es lo que querías: ver si realmente están ahí
echo "📋 Verificando instalación:"
pip list | grep -E "Flask|asgiref|python-dotenv"