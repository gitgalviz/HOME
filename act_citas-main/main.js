var mascotas = [];
function mostrarAlerta(mensaje) {
    let alert = document.querySelector(".cont_alerta");
    alert.textContent = mensaje;
    alert.classList.remove("alerta2");
    alert.classList.add("alerta2");
    setTimeout(() => {
        alert.textContent="";
        alert.classList.remove("alerta2");
    }, 3000);
}
function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
}
function guardarDatos() {

    var nombreMascota = document.getElementById('nombreMascota').value;
    var propietario = document.getElementById('propietario').value;
    var telefono = document.getElementById('telefono').value;
    var tipoMascota = document.getElementById('tipoMascota').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var sintomas = document.getElementById('sintomas').value;


    if (!nombreMascota || !propietario || !telefono || !tipoMascota || !fecha || !hora) {
        mostrarAlerta('Por favor, completa todos los campos obligatorios.');
        return;
    }

    if (telefono.length < 9) {
        mostrarAlerta('El teléfono debe tener al menos 9 dígitos.');
        return;
    }

    var fechaSeleccionada = new Date(fecha);
    var hoy = new Date();

    if (fechaSeleccionada <= hoy) {
        mostrarAlerta('Selecciona una fecha posterior a hoy.');
        return;
    }

    var horaCita = parseInt(hora.split(':')[0]);
    if (horaCita < 8 || horaCita >= 18) {
        mostrarAlerta('La hora de la cita debe estar entre las 8am y las 6pm.');
        return;
    }

    var nuevaMascota = {
        id: mascotas.length + 1,
        nombre: nombreMascota,
        propietario: propietario,
        telefono: telefono,
        tipo: tipoMascota,
        fecha: fecha,
        hora: hora,
        sintomas: sintomas,
        estado: 'ASIGNADA'
    };

    mascotas.push(nuevaMascota);
    limpiarFormulario();
    console.log(mascotas);
    var rutaImagen = determinarRutaImagen(tipoMascota);

    var nuevaCitaAsignada = document.createElement('div');
    nuevaCitaAsignada.className = 'citaAsignadaCard';
    nuevaCitaAsignada.innerHTML = `
        <img src="${rutaImagen}" alt="Imagen de la mascota" style="max-width: 100%; height: auto;">
        <p> Nombre Mascota = ${nombreMascota}</p>
        <p> Propietario = ${propietario}</p>
        <p> Telefono = ${telefono}</p>
        <p> Tipo Mascota = ${tipoMascota}</p>
        <p> Fecha = ${fecha}</p>
        <p> Hora = ${hora}</p>
        <p> Sintomas = ${sintomas}</p>
        <button onclick="editarCita(${nuevaMascota.id})">Editar</button>
        <button onclick="anularCard(${nuevaMascota.id})">Anulada</button>
        <button onclick="cerrarCard(${nuevaMascota.id})">Terminada</button>
        <button onclick="asignarCard(this)">Asignada</button>
    `;

    nuevaMascota.card = nuevaCitaAsignada;

    citasAsignadasContent.appendChild(nuevaCitaAsignada);
    document.getElementById('formulario').style.display = 'none';
}

function asignarCard(id){
    let index = mascotas.findIndex((mascota) => mascota.id === id);

    if (index !== -1) {
        mascotas[index].estado = 'ASIGNADA';
        renderizarCitas();
    }
}

function cerrarCard(id){
    let index = mascotas.findIndex((mascota) => mascota.id === id);

    if (index !== -1) {
        mascotas[index].estado = 'CERRADA';
        renderizarCitas();
    }
}

function anularCard(id){
    let index = mascotas.findIndex((mascota) => mascota.id === id);

    if (index !== -1) {
        mascotas[index].estado = 'ANULADA';
        renderizarCitas();
    }
}

function renderizarCitas(){
    let contActivas = document.getElementById("citasAsignadasContent");
    let contTerminadas = document.getElementById("citasTerminadasContent");
    let contAnuladas = document.getElementById("citasAnuladasContent");

    contActivas.innerHTML = "";
    contTerminadas.innerHTML = "";
    contAnuladas.innerHTML = "";

    mascotas.forEach((registro) => {
        let card = registro.card.cloneNode(true);
        card.querySelectorAll('button').forEach(btn => btn.remove());

        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarCita(registro.id);
        card.appendChild(btnEditar);

        let btnAnular = document.createElement("button");
        btnAnular.textContent = "Anular";
        btnAnular.onclick = () => anularCard(registro.id);
        card.appendChild(btnAnular);

        let btnCerrar = document.createElement("button");
        btnCerrar.textContent = "Cerrar";
        btnCerrar.onclick = () => cerrarCard(registro.id);
        card.appendChild(btnCerrar);

        let btnAbrir = document.createElement("button");
        btnAbrir.textContent = "Abrir";
        btnAbrir.onclick = () => asignarCard(registro.id);
        card.appendChild(btnAbrir);

        if (registro.estado === "ASIGNADA") {
            contActivas.appendChild(card);
        } else if (registro.estado === "CERRADA") {
            contTerminadas.appendChild(card);
        } else if (registro.estado === "ANULADA") {
            contAnuladas.appendChild(card);
        }
    });
}

function limpiarFormulario() {
    document.getElementById('nombreMascota').value = '';
    document.getElementById('propietario').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipoMascota').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('sintomas').value = '';
}

function determinarRutaImagen(tipoMascota) {

    if (tipoMascota === 'PECES') {
        return './imagenes/peces.png';
    } else if (tipoMascota === 'ANFIBIOS') {
        return './imagenes/anfibios.png';
    } else if (tipoMascota === 'REPTILES') {
        return './imagenes/reptil.png';
    } else if (tipoMascota === 'AVES') {
        return './imagenes/ave.png';
    } else if (tipoMascota === 'MAMIFEROS') {
        return './imagenes/tigre.png';
    } else {
 
        return './imagenes/interrogacion.png';
    }
}


