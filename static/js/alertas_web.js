function mensajeErrores(mensaje) {
    Swal.fire({
    title: "Error",
    html: mensaje.slice(0,25) + '<br>' + mensaje.slice(26),
    icon: "error", 
    confirmButtonText: "Ok!",
    });
};

function mensajeErrore(mensaje) {
    Swal.fire({
    title: "Error",
    html: mensaje,
    icon: "error", 
    confirmButtonText: "Ok!",
    });
};