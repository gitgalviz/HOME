let informacion = [];

function guardar() {

    const valido = validar();

    if (valido) {
        const nombre = document.getElementById("nombres").value;
        const apellido = document.getElementById("apellidos").value;
        const tipoDocumento = document.querySelector('input[name="tipo_documento"]:checked').value;
        const numeroDocumento = document.getElementById("numero_documento").value;
        const genero = document.querySelector('input[name="genero"]:checked').value;
        const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const recibirNotificaciones = document.getElementById("notificaciones").checked;
        const hoy = new Date();
        const fechaNacimientoDate = new Date(fechaNacimiento);

        const persona = {
            nombre: nombre,
            apellido: apellido,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            genero: genero,
            fechaNacimiento: fechaNacimiento,
            telefono: telefono,
            correo: correo,
            recibirNotificaciones: recibirNotificaciones
        };

        informacion.push(persona);

        console.log(persona);
        document.getElementById("alertaadso").textContent = "Su información fue registrada correctamente";
    }
}

function validar() {
    let valido = true;
    const nombre = document.getElementById("nombres").value;
    const apellido = document.getElementById("apellidos").value;
    const tipoDocumento = document.querySelector('input[name="tipo_documento"]:checked');
    const numeroDocumento = document.getElementById("numero_documento").value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const hoy = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);

    let alerta = "Por favor complete los siguientes campos correctamente: ";

    if (nombre === "") {
        alerta += "Nombre, ";
        valido = false;
    }

    if (apellido === "") {
        alerta += "Apellido, ";
        valido = false;
    }

    if (!tipoDocumento) {
        alerta += "Tipo de documento, ";
        valido = false;
    }

    if (numeroDocumento === "") {
        alerta += "Número de documento, ";
        valido = false;
    }

    if (!genero) {
        alerta += "Género, ";
        valido = false;
    }

    if (fechaNacimiento === "") {
        alerta += "Fecha de nacimiento, ";
        valido = false;
    } else {
        const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        if (edad < 18) {
            alerta += "Debe ser mayor de 18 años, ";
            valido = false;
        }
    }

    if (telefono === "") {
        alerta += "Teléfono, ";
        valido = false;
    }

    if (correo === "") {
        alerta += "Correo electrónico, ";
        valido = false;
    } else if (!correo.includes("@")) {
        alerta += "Correo electrónico debe contener el símbolo '@', ";
        valido = false;
    }

    if (!valido) {
        document.getElementById("alertaadso").textContent = alerta;
        setTimeout(() => {
            document.getElementById("alertaadso").textContent = "";
        }, 6000);
    }

    return valido;
}




