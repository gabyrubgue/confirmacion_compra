document.addEventListener("DOMContentLoaded", function() {
    const cambiarBtn = document.getElementById('cambiar-btn');
    const guardarBtn = document.getElementById('guardar-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');
    const datosEntregaDiv = document.getElementById('datos-entrega');
    const formularioEntregaDiv = document.getElementById('formulario-entrega');
    const nombreEntrega = document.getElementById('confirmName');
    const tipoPago = document.getElementById('confirmMetodoPago');
    const telefonoEntrega = document.getElementById('confirmTelefono');
    const direccionEntrega = document.getElementById('confirmDireccion');
    const ciudadEntrega = document.getElementById('confirmCiudad');
    const predeterminadoBtn = document.getElementById('predeterminado-btn');

    // Función para actualizar los datos en la confirmación de compra
    function actualizarDatosEntrega() {
        nombreEntrega.textContent = localStorage.getItem('shippingName') || 'N/A';
        tipoPago.textContent = localStorage.getItem('shippingMetodoPago') ||  'N/A';
        telefonoEntrega.textContent = localStorage.getItem('shippingTelefono') || 'N/A';
        direccionEntrega.textContent = localStorage.getItem('shippingDireccion') || 'N/A';
        ciudadEntrega.textContent = localStorage.getItem('shippingCiudad') || 'N/A';
    }

    // Cargar datos al inicio
    actualizarDatosEntrega();

    let nombreOriginal = nombreEntrega.textContent;
    let telefonoOriginal = telefonoEntrega.textContent;
    let direccionOriginal = direccionEntrega.textContent;
    let ciudadOriginal = ciudadEntrega.textContent;

    cambiarBtn.addEventListener('click', function() {
        nombreOriginal = nombreEntrega.textContent;
        telefonoOriginal = telefonoEntrega.textContent;
        direccionOriginal = direccionEntrega.textContent;
        ciudadOriginal = ciudadEntrega.textContent;

        datosEntregaDiv.style.display = "none";
        formularioEntregaDiv.style.display = "block";
        cambiarBtn.style.display = "none"; 
        predeterminadoBtn.style.display = "none"; 
        guardarBtn.style.display = "inline-block"; 
        cancelarBtn.style.display = "inline-block"; 
    });

    guardarBtn.addEventListener('click', function() {
        const nombreInput = document.getElementById('nombre-input').value;
        const telefonoInput = document.getElementById('telefono-input').value;
        const direccionInput = document.getElementById('direccion-input').value;
        const ciudadInput = document.getElementById('ciudad-input').value;

        if (nombreInput && telefonoInput && direccionInput && ciudadInput) {
            localStorage.setItem("shippingName", nombreInput);
            localStorage.setItem("shippingTelefono", telefonoInput);
            localStorage.setItem("shippingDireccion", direccionInput);
            localStorage.setItem("shippingCiudad", ciudadInput);

            actualizarDatosEntrega();

            datosEntregaDiv.style.display = "block";
            formularioEntregaDiv.style.display = "none";
            cambiarBtn.style.display = "inline-block"; 
            predeterminadoBtn.style.display = "inline-block"; 
            guardarBtn.style.display = "none"; 
            cancelarBtn.style.display = "none"; 
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    cancelarBtn.addEventListener('click', function() {
        nombreEntrega.textContent = nombreOriginal;
        telefonoEntrega.textContent = telefonoOriginal;
        direccionEntrega.textContent = direccionOriginal;
        ciudadEntrega.textContent = ciudadOriginal;

        datosEntregaDiv.style.display = "block";
        formularioEntregaDiv.style.display = "none";
        cambiarBtn.style.display = "inline-block"; 
        predeterminadoBtn.style.display = "inline-block"; 
        guardarBtn.style.display = "none"; 
        cancelarBtn.style.display = "none"; 
    });

    const departamentoSelect = document.getElementById('departamento-input');
    const ciudadSelect = document.getElementById('ciudad-input');

    const ciudadesPorDepartamento = {
        "Bogotá D.C.": ["Bogotá"],
        "Antioquia": ["Medellín", "Envigado", "Bello"],
        "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"],
        "Atlántico": ["Barranquilla", "Soledad", "Malambo"],
        "Santander": ["Bucaramanga", "Floridablanca", "Giron"]
    };

    departamentoSelect.addEventListener('change', function() {
        const departamentoSeleccionado = departamentoSelect.value;
        ciudadSelect.innerHTML = '<option value="" disabled selected>-- Selecciona un Municipio --</option>';

        if (ciudadesPorDepartamento[departamentoSeleccionado]) {
            ciudadSelect.disabled = false; 
            ciudadesPorDepartamento[departamentoSeleccionado].forEach(function(ciudad) {
                const option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad;
                ciudadSelect.appendChild(option);
            });
        } else {
            ciudadSelect.disabled = true; 
        }
    });

    document.getElementById('factura-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const totalCompra = document.getElementById('precio-producto').innerText;
        const totalEnvio = document.getElementById('envio').innerText;
        const totalPedido = document.getElementById('total-pedido').innerText;

        // Guardar el método de pago en localStorage
        const metodoPago = document.getElementById('confirmMetodoPago').innerText;
        localStorage.setItem('metodoPago', metodoPago);

        // Redirigir a la página de factura con los parámetros
        window.location.href = `../factura/factura.html?totalCompra=${totalCompra}&totalEnvio=${totalEnvio}&totalPedido=${totalPedido}`;
    });
});
    