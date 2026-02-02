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

// Imagenes de la parte superior From
const imgBinanceSuperior = document.getElementById('icon-bin-sup');
const imgVESSuperior = document.getElementById('icon-ves-sup');
const imgUSDSuperior = document.getElementById('icon-usd-sup');

// obtengo la etiqueta body
const body = document.body;

// Obtenga del body las variables
let bcvRate = parseFloat(body.dataset.bcv);
let usdtRate = parseFloat(body.dataset.usdt);

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

    if (fromCurr === 'VES' && toCurr === 'USD') {
        imgBinanceInferior.classList.add('hidden')
        imgUSDInferior.classList.remove('hidden')
        tasaDeCambio.textContent = bcvRate
        result = fromVal / bcvRate;

    } else if (fromCurr === 'VES' && toCurr === 'USDT') {
        imgUSDInferior.classList.add('hidden')
        imgBinanceInferior.classList.remove('hidden')
        tasaDeCambio.textContent = usdtRate
        result = fromVal / usdtRate;

    } else if (fromCurr === 'USD' && toCurr === 'VES') {

        imgBinanceSuperior.classList.add('hidden')
        imgUSDSuperior.classList.remove('hidden')
        tasaDeCambio.textContent = bcvRate
        result = bcvRate * fromVal;

    } else if (fromCurr === 'USDT' && toCurr === 'VES') {

        imgBinanceSuperior.classList.remove('hidden')
        imgUSDSuperior.classList.add('hidden')
        tasaDeCambio.textContent = usdtRate
        result = usdtRate * fromVal;
    } 

    if (!fromAmount.value) {
        toAmount.value = '';
        totalReceive.textContent = '';
        return;
    };

    toAmount.value = result.toFixed(2);
    totalReceive.textContent = result.toFixed(2);

};


// Evento al clickear el boton de swap
swapButton.addEventListener('click', () => {
    
    opcionSeleccionarFrom = fromCurrency.options
    opcionSeleccionarTo = toCurrency.options

    // SE MUESTRAN AHORA LAS OPCIONES OCULTAS DEL FROM
    for (var i = 0; i < opcionSeleccionarFrom.length; i++) {
        if (opcionSeleccionarFrom[i].classList.contains('hidden')) {
            opcionSeleccionarFrom[i].classList.remove('hidden')

            if (opcionSeleccionarFrom[i].value === 'USD' && !(opcionSeleccionarFrom[i].classList.contains('hidden'))) {
                opcionSeleccionarFrom[i].selected = true
                imgVESSuperior.classList.add('hidden')
                imgUSDSuperior.classList.remove('hidden')

            
            } else if (opcionSeleccionarFrom[i].value === 'VES' && !(opcionSeleccionarFrom[i].classList.contains('hidden'))) {
                opcionSeleccionarFrom[i].selected = true
                imgVESSuperior.classList.remove('hidden')
                imgBinanceSuperior.classList.add('hidden')
                imgUSDSuperior.classList.add('hidden')
            };

        } else {
            opcionSeleccionarFrom[i].classList.add('hidden')
        };

    };

    // SE MUESTRAN AHORA LAS OPCIONES OCULTAS DEL TO
    for (var i = 0; i < opcionSeleccionarTo.length; i++) {
        if (opcionSeleccionarTo[i].classList.contains('hidden')) {
            opcionSeleccionarTo[i].classList.remove('hidden')

            if (opcionSeleccionarTo[i].value === 'VES' && !(opcionSeleccionarTo[i].classList.contains('hidden'))) {
                opcionSeleccionarTo[i].selected = true
                imgVESInferior.classList.remove('hidden')
                imgUSDInferior.classList.add('hidden')
                imgBinanceInferior.classList.add('hidden')

            
            } else if (opcionSeleccionarTo[i].value === 'USD' && !(opcionSeleccionarTo[i].classList.contains('hidden'))) {
                opcionSeleccionarTo[i].selected = true
                imgUSDInferior.classList.remove('hidden')
                imgVESInferior.classList.add('hidden')
                imgBinanceInferior.classList.add('hidden')

            };

        } else {
            opcionSeleccionarTo[i].classList.add('hidden')
        };

    };

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

    actulizadorUSDT = document.querySelectorAll('.precio_usdt');
    actulizadorBCV = document.querySelectorAll('.precio_bcv');
    

    actulizadorBCV.forEach(element => {
        element.textContent = bcvRate; 
    });

    actulizadorUSDT.forEach(element => {
        element.textContent = usdtRate;
    });

    valorDiferencia = document.querySelector('.diferencia');
    valorDiferencia.textContent = (usdtRate - bcvRate).toFixed(2);
    
}

// Cada 1 min 
setInterval(actualizarTasas, 60000);

// Inicializar
calculateTo();