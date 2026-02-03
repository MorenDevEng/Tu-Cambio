**Conversor VES ↔ USD / USDT (BCV & Binance P2P)**

Este proyecto es una aplicación web desarrollada con Flask (Python) que permite consultar y convertir montos entre Bolívares (VES), Dólar BCV (USD) y USDT, utilizando datos reales y actualizados desde:

* Banco Central de Venezuela (BCV) → vía web scraping

* Binance P2P → mediante su endpoint público

La aplicación actualiza los precios de forma dinámica, sin recargar la página, usando JavaScript + Fetch API.

**Características principales**

* Conversión en tiempo real entre VES, USD y USDT
* Consulta del dólar oficial BCV
* Consulta del precio USDT/VES desde Binance P2P
* Actualización automática de tasas cada cierto intervalo
* Interfaz web simple y clara
* Backend asíncrono para mejorar el rendimiento
* Manejo de errores para evitar que la app se caiga si una API no responde

**Tecnologías utilizadas**

Backend

* Python 3
* Flask
* aiohttp (requests asíncronas)
* BeautifulSoup (web scraping BCV)

Frontend

* HTML
* TailwindCSS
* JavaScript (Fetch API)

Despliegue
* Vercel

Estructura del Proyecto

```csharp
Tu-Cambio/
│
├── core/
│   ├── bcv.org.ve.crt        # Certificado SSL para BCV
│   ├── dolar_ves.json        # Cache local de precios
│   └── get_price.py          # Lógica de consulta (Binance + BCV)  
│
├── env_calculadora_VES       # Entorno virtual
│
├── node_modules/             # Dependencias frontend
│
├── static/
│   ├── css/
│   │   ├── input.css
│   │   └── output.css
│   │
│   ├── img/
│   │   ├── binance.png
│   │   ├── cambio.png
│   │   ├── usa.png
│   │   └── VE_C.png
│   │
│   └── js/
│       ├── actualizacion.js  # Fetch + lógica de precios
│       └── alertas_web.js    # Mensajes
│
├── templates/
│   └── index.html            # HTML principal
│
├── .env                      # Variables de entorno
├── app.py                    # App de Flask
├── .gitignore
├── package.json              # Tailwind / frontend
├── package-lock.json
├── requirements.txt          # Python deps
├── tailwind.config.js
└── vercel.json               # Config Vercel
```

⚙️ Cómo ejecutar el proyecto localmente

1️⃣ Clonar el repositorio
```bash
git clone https://github.com/MorenDevEng/Tu-Cambio.git
cd Tu-Cambio
```

2️⃣ Crear entorno virtual (opcional pero recomendado)
```bash
python -m venv venv
source venv/bin/activate  # Linux / Mac
venv\Scripts\activate     # Windows
```

3️⃣ Instalar dependencias
```bash
pip install -r requirements.txt
```

4️⃣ Ejecutar la aplicación
```bash
python app.py
```

Luego abre tu navegador en:
```bash
http://127.0.0.1:5000
```

⚠️ Consideraciones importantes

* Binance P2P es consultado usando un endpoint público.
* Se usan timeouts y manejo de errores para evitar bloqueos.
* Si alguna fuente falla (BCV o Binance), la web sigue funcionando.
* El proyecto está pensado para uso educativo y personal.

📦 Despliegue en Vercel

El proyecto está configurado para ejecutarse en Vercel como una función serverless en Python, utilizando:

* vercel.json

👨‍💻 Autor

Proyecto desarrollado con fines educativos para practicar:

* Consumo de APIs externas
* Web scraping
* Asincronía en Python
* Integración frontend + backend