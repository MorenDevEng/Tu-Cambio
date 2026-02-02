#!/bin/bash

echo "🚀 [BUILD] Iniciando proceso de instalación detallado..."

# Mostrar la versión de Python que está usando Vercel
python3 --version

# Actualizar pip y mostrar progreso
echo "📦 Actualizando pip..."
python3 -m pip install --upgrade pip

# Instalar dependencias con VERBOSE (-v) para ver la descarga
echo "📥 Instalando dependencias desde requirements.txt..."
if [ -f requirements.txt ]; then
    pip install -v -r requirements.txt
    echo "✅ [SUCCESS] Todas las dependencias se instalaron."
else
    echo "❌ [ERROR] No se encontró el archivo requirements.txt en la raíz."
    exit 1
fi

echo "📋 Listado final de paquetes instalados:"
pip freeze