const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const swapButton = document.getElementById('swapButton');
const totalReceive = document.getElementById('totalReceive');
const tasaDeCambio = document.getElementById('tasa-cambio');
const botonLimpiador = document.getElementById('Boton-Limpiador');

// Imagenes inferiores de To
const imgBinanceInferior = document.getElementById('icon-bin-inf');
const imgUSDInferior = document.getElementById('icon-usd-inf');
const imgVESInferior = document.getElementById('icon-ves-inf');
const imgEURInferior = document.getElementById('icon-eur-inf');

// Imagenes de la parte superior From
const imgBinanceSuperior = document.getElementById('icon-bin-sup');
const imgVESSuperior = document.getElementById('icon-ves-sup');
const imgUSDSuperior = document.getElementById('icon-usd-sup');
const imgEURSuperior = document.getElementById('icon-eur-sup');

// obtengo la etiqueta body
const body = document.body;

// Obtenga del body las variables
let bcvRate = parseFloat(body.dataset.bcv);
let usdtRate = parseFloat(body.dataset.usdt);
let euroRate = parseFloat(body.dataset.euro);

// Evento para calcular en tiempo real
toCurrency.addEventListener('change', () => {
    calculateTo()
})

// Función para calcular el monto To
function calculateTo() {
    const fromVal = parseFloat(fromAmount.value) || 0;
    const fromCurr = fromCurrency.value;
    const toCurr = toCurrency.value;

    let result = 0;

    // Ocultar todos los iconos primero
    imgBinanceInferior.classList.add('hidden');
    imgUSDInferior.classList.add('hidden');
    imgVESInferior.classList.add('hidden');
    imgEURInferior.classList.add('hidden');
    imgBinanceSuperior.classList.add('hidden');
    imgVESSuperior.classList.add('hidden');
    imgUSDSuperior.classList.add('hidden');
    imgEURSuperior.classList.add('hidden');

    // Mostrar icono según la moneda de origen
    if (fromCurr === 'VES') {
        imgVESSuperior.classList.remove('hidden');
    } else if (fromCurr === 'USD') {
        imgUSDSuperior.classList.remove('hidden');
    } else if (fromCurr === 'USDT') {
        imgBinanceSuperior.classList.remove('hidden');
    } else if (fromCurr === 'EUR') {
        imgEURSuperior.classList.remove('hidden');
    }

    // Mostrar icono según la moneda de destino
    if (toCurr === 'USD') {
        imgUSDInferior.classList.remove('hidden');
    } else if (toCurr === 'USDT') {
        imgBinanceInferior.classList.remove('hidden');
    } else if (toCurr === 'EUR') {
        imgEURInferior.classList.remove('hidden');
    } else if (toCurr === 'VES') {
        imgVESInferior.classList.remove('hidden');
    }

    // Calcular según las monedas
    if (fromCurr === 'VES' && toCurr === 'USD') {
        tasaDeCambio.textContent = bcvRate
        result = fromVal / bcvRate;
    } else if (fromCurr === 'VES' && toCurr === 'USDT') {
        tasaDeCambio.textContent = usdtRate
        result = fromVal / usdtRate;
    } else if (fromCurr === 'VES' && toCurr === 'EUR') {
        tasaDeCambio.textContent = euroRate
        result = fromVal / euroRate;
    } else if (fromCurr === 'USD' && toCurr === 'VES') {
        tasaDeCambio.textContent = bcvRate
        result = bcvRate * fromVal;
    } else if (fromCurr === 'USDT' && toCurr === 'VES') {
        tasaDeCambio.textContent = usdtRate
        result = usdtRate * fromVal;
    } else if (fromCurr === 'EUR' && toCurr === 'VES') {
        tasaDeCambio.textContent = euroRate
        result = euroRate * fromVal;
    } else {
        // Por defecto mostrar tasa USD
        tasaDeCambio.textContent = bcvRate;
    }

    if (!fromAmount.value) {
        toAmount.value = '';
        totalReceive.textContent = '';
        return;
    };

    toAmount.value = result.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    });

    totalReceive.textContent = toAmount.value;

};


// Evento al clickear el boton de swap
swapButton.addEventListener('click', () => {
    
    opcionSeleccionarFrom = fromCurrency.options
    opcionSeleccionarTo = toCurrency.options

    // Guardar los valores actuales
    const valorTo = toCurrency.value;
    const valorFrom = fromCurrency.value;

    // Ocultar todos los iconos primero
    imgBinanceInferior.classList.add('hidden');
    imgUSDInferior.classList.add('hidden');
    imgVESInferior.classList.add('hidden');
    imgEURInferior.classList.add('hidden');
    imgBinanceSuperior.classList.add('hidden');
    imgVESSuperior.classList.add('hidden');
    imgUSDSuperior.classList.add('hidden');
    imgEURSuperior.classList.add('hidden');

    // SE MUESTRAN LAS OPCIONES OCULTAS DEL FROM
    for (var i = 0; i < opcionSeleccionarFrom.length; i++) {
        if (opcionSeleccionarFrom[i].classList.contains('hidden')) {
            opcionSeleccionarFrom[i].classList.remove('hidden')
        } else {
            opcionSeleccionarFrom[i].classList.add('hidden')
        };
    };

    // SE MUESTRAN LAS OPCIONES OCULTAS DEL TO
    for (var i = 0; i < opcionSeleccionarTo.length; i++) {
        if (opcionSeleccionarTo[i].classList.contains('hidden')) {
            opcionSeleccionarTo[i].classList.remove('hidden')
        } else {
            opcionSeleccionarTo[i].classList.add('hidden')
        };
    };

    // Intercambiar valores directamente
    fromCurrency.value = valorTo;
    toCurrency.value = valorFrom;
    
    // Actualizar icono de arriba según el nuevo valor de From (antes estaba en To)
    if (valorTo === 'USD') {
        imgUSDSuperior.classList.remove('hidden')
    } else if (valorTo === 'USDT') {
        imgBinanceSuperior.classList.remove('hidden')
    } else if (valorTo === 'EUR') {
        imgEURSuperior.classList.remove('hidden')
    } else if (valorTo === 'VES') {
        imgVESSuperior.classList.remove('hidden')
    }

    // Actualizar icono de abajo según el nuevo valor de To (antes estaba en From)
    if (valorFrom === 'USD') {
        imgUSDInferior.classList.remove('hidden')
    } else if (valorFrom === 'USDT') {
        imgBinanceInferior.classList.remove('hidden')
    } else if (valorFrom === 'EUR') {
        imgEURInferior.classList.remove('hidden')
    } else if (valorFrom === 'VES') {
        imgVESInferior.classList.remove('hidden')
    }

    // Limpiar inputs
    limpiarInput()
    
});

// Evento para calcular en tiempo real
fromAmount.addEventListener('input', calculateTo);
fromCurrency.addEventListener('change', () => {
    // Ajustar toCurrency automáticamente
    toCurrency.value = fromCurrency.value === 'VES' ? 'USD' : 'VES';
    calculateTo();
});

botonLimpiador.addEventListener('click', () => {
    limpiarInput()
})

function limpiarInput(){
    fromAmount.value = '';
    toAmount.value = ''
    totalReceive.textContent = '';
}

async function actualizarTasas() {
    const res = await fetch('/price/ves-prices');
    if (!res.ok) throw new Error('No response');
    const data = await res.json();

    usdtRate = (data.usdt_valor).toFixed(2);
    bcvRate = (data.bcv_valor).toFixed(2);
    euroRate = (data.euro_valor).toFixed(2);

    actulizadorUSDT = document.querySelectorAll('.precio_usdt');
    actulizadorBCV = document.querySelectorAll('.precio_bcv');
    actulizadorEUR = document.querySelectorAll('.precio_euro');
    

    actulizadorBCV.forEach(element => {
        element.textContent = bcvRate; 
    });

    actulizadorUSDT.forEach(element => {
        element.textContent = usdtRate;
    });

    actulizadorEUR.forEach(element => {
        element.textContent = euroRate;
    });

    valorDiferencia = document.querySelector('.diferencia');
    valorDiferencia.textContent = (usdtRate - bcvRate).toFixed(2);
    
}

// Cada 1 min 
setInterval(actualizarTasas, 60000);

// Inicializar - mostrar iconos correctos al inicio
imgVESSuperior.classList.remove('hidden');
imgUSDInferior.classList.remove('hidden');
calculateTo();