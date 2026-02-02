#!/bin/bash

echo "--- 1. Instalando dependencias de Python ---"
# Usamos --break-system-packages para permitir la instalación en el entorno de Vercel
python3.12 -m pip install -r requirements.txt --break-system-packages

echo "--- ¡PROCESO FINALIZADO EXITOSAMENTE! ---"