#!/bin/bash
echo "🔥 [FORCE BUILD] Borrando rastros e instalando desde cero..."

# Forzamos a que use el pip de la versión de Python actual
python3 -m pip install --upgrade pip

# --no-cache-dir: No uses nada guardado
# -vv: Super verboso (verás cada link de descarga)
python3 -m pip install --no-cache-dir --force-reinstall -vv -r requirements.txt

echo "📊 Verificación de paquetes instalados:"
pip list