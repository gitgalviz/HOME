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
        <p class="nombreMascotaCard"> Nombre Mascota = ${nombreMascota}</p>
        <p class="propietarioCard"> Propietario = ${propietario}</p>
        <p class="telefonoCard"> Telefono = ${telefono}</p>
        <p class="tipoCard"> Tipo Mascota = ${tipoMascota}</p>
        <p class="fechaCard"> Fecha = ${fecha}</p>
        <p class="horaCard"> Hora = ${hora}</p>
        <p class="sintomasCard"> Sintomas = ${sintomas}</p>
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

function editarCita(id){
    let index = mascotas.findIndex((mascota) => mascota.id === id);

    if(index !== -1){
        let registro = mascotas[index];

        mostrarFormularioEditar(registro, index);
    }
}

function mostrarFormularioEditar(registro, index){
    let formulario = document.getElementById("formulario");

    formulario.querySelector("#nombreMascota").value = registro.nombre;
    formulario.querySelector("#propietario").value = registro.propietario;
    formulario.querySelector("#telefono").value = registro.telefono;

    let tipo = 0;
    if(registro.tipo === "PECES"){
        tipo = 1;
    } else if(registro.tipo === "ANFIBIOS"){
        tipo = 2;
    } else if(registro.tipo === "REPTILES"){
        tipo = 3;
    } else if(registro.tipo === "AVES"){
        tipo = 4;
    } else if(registro.tipo === "MAMIFEROS"){
        tipo = 5;
    }

    formulario.querySelector("#tipoMascota").value = tipo;
    formulario.querySelector("#fecha").value = registro.fecha;
    formulario.querySelector("#hora").value = registro.hora;
    formulario.querySelector("#sintomas").value = registro.sintomas;

    let btnEnviar = formulario.querySelector("#btnEnviar");
    btnEnviar.onclick = function() {
        guardarDatosEditados(registro, index);
    };

    formulario.style.display = "block";
}

function guardarDatosEditados(registro, index){
    registro.nombre = document.querySelector("#nombreMascota").value;
    registro.propietario = document.querySelector("#propietario").value;
    registro.telefono = document.querySelector("#telefono").value;
    registro.tipo = document.querySelector("#tipoMascota").value;
    registro.fecha = document.querySelector("#fecha").value;
    registro.hora = document.querySelector("#hora").value;
    registro.sintomas = document.querySelector("#sintomas").value;

    registro.card.querySelector(".nombreMascotaCard").textContent = `Nombre Mascota = ${registro.nombre}`;
    registro.card.querySelector(".propietarioCard").textContent = `Propietario = ${registro.propietario}`;
    registro.card.querySelector(".telefonoCard").textContent = `Telefono = ${registro.telefono}`;
    registro.card.querySelector(".tipoCard").textContent = `Tipo Mascota = ${registro.tipo}`;
    registro.card.querySelector(".fechaCard").textContent = `Fecha = ${registro.fecha}`;
    registro.card.querySelector(".horaCard").textContent = `Hora = ${registro.hora}`;
    registro.card.querySelector(".sintomasCard").textContent = `Sintomas = ${registro.sintomas}`;

    let formulario = document.getElementById("formulario");
    let btnEnviar = formulario.querySelector("#btnEnviar");
    btnEnviar.onclick = function(){
        guardarDatos();
    }

    formulario.style.display = "none";
    renderizarCitas();
}