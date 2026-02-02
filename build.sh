#!/bin/bash
echo "🔥 [FORCE BUILD] Borrando rastros e instalando desde cero..."

python3.12 -m pip install -r requirements.txt --break-system-packages

echo "📊 Verificación de paquetes instalados:"
pip list