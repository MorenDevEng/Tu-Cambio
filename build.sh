#!/bin/bash

echo "🚀 [BUILD] Iniciando instalación forzada de dependencias..."

# 1. Asegurar que usamos el ejecutable de Python correcto en el entorno de Vercel
PYTHON_EXE=$(which python3)
echo "🐍 Usando Python en: $PYTHON_EXE"

# 2. Actualizar pip de forma aislada
$PYTHON_EXE -m pip install --upgrade pip

# 3. Instalación Forzada: 
# --no-cache-dir: Ignora paquetes descargados previamente.
# --force-reinstall: Sobrescribe cualquier versión existente.
# --upgrade: Asegura tener la versión más reciente según tu requirements.txt.
echo "📥 Descargando e instalando paquetes desde cero..."
$PYTHON_EXE -m pip install --no-cache-dir --force-reinstall --upgrade -r requirements.txt

# 4. Verificación detallada
echo "📋 Verificando librerías críticas:"
$PYTHON_EXE -m pip list | grep -E "Flask|asgiref|python-dotenv|httpx|beautifulsoup4"

echo "✅ [SUCCESS] Proceso de construcción finalizado."