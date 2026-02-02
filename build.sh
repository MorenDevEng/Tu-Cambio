#!/bin/bash

echo "--- Iniciando Build Custom ---"

# 1. Asegurar que pip esté actualizado
python3 -m pip install --upgrade pip

# 2. Instalar las dependencias del archivo requirements.txt
# El flag --force-reinstall asegura que no use caché corrupta
pip install --force-reinstall -r requirements.txt

echo "--- Dependencias instaladas con éxito ---"