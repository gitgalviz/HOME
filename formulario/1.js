let informacion = [];
let op = null;
let indice = null;

function validar() {
    let nombre = document.getElementById("nombres").value;
    let apellido = document.getElementById("apellidos").value;
    let tipoDoc = document.querySelector('input[name="tipo_documento"]:checked');
    let doc = document.getElementById("numero_documento").value;
    let genero = document.querySelector('input[name="genero"]:checked');
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let fecha = document.getElementById("fecha_nacimiento").value;
    let notificaciones = document.getElementById("notificaciones").checked;

    if (nombre === "") {
        mostrarAlerta("Ingrese un nombre");
        return;
    }
    if (apellido === "") {
        mostrarAlerta("Ingrese un apellido");
        return;
    }
    if (tipoDoc === null) {
        mostrarAlerta("Seleccione un tipo de documento");
        return;
    }
    if (doc === "") {
        mostrarAlerta("Ingrese un número de documento");
        return;
    }
    if (genero === null) {
        mostrarAlerta("Seleccione uno de los generos");
        return;
    }
    if (fecha === "") {
        mostrarAlerta("Ingrese la fecha de nacimiento");
        return;
    } else {
        let fechaNacimiento = new Date(fecha);
        let hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            mostrarAlerta("Debe ser mayor de 18 años para registrarse.");
            return;
        }
    }
    if (telefono === "") {
        mostrarAlerta("Ingrese un número de telefono");
        return;
    } else if (telefono.length !== 10 || isNaN(telefono)) {
        mostrarAlerta("El número de teléfono debe tener 10 dígitos.");
        return;
    }
    if (correo === "") {
        mostrarAlerta("Ingrese una dirección de correo");
        return;
    } else {
        let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            mostrarAlerta("Por favor, introduzca una dirección de correo válida.");
            return;
        }
    }
    if (op === true) {

        informacion[indice].nombre = document.getElementById("nombres").value;
        informacion[indice].apellido = document.getElementById("apellidos").value;
        informacion[indice].tipoDoc = document.querySelector('input[name="tipo_documento"]:checked').value;
        informacion[indice].doc = document.getElementById("numero_documento").value;
        informacion[indice].genero = document.querySelector('input[name="genero"]:checked').value;
        informacion[indice].telefono = document.getElementById("telefono").value;
        informacion[indice].correo = document.getElementById("correo").value;
        informacion[indice].fecha = document.getElementById("fecha_nacimiento").value;
    } else {

        let tipoDocValue = tipoDoc.value;
        let generoValue = genero.value;

        let persona = {
            nombre: nombre,
            apellido: apellido,
            tipoDocumento: tipoDocValue,
            numeroDocumento: doc,
            genero: generoValue,
            fechaNacimiento: fecha,
            telefono: telefono,
            correo: correo,
            Notificaciones: notificaciones,

        };

        informacion.push(persona);

        alert("Información guardada con exito");

    }
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.querySelector('input[name="tipo_documento"]:checked').checked = false;
    document.getElementById("numero_documento").value = "";
    document.querySelector('input[name="genero"]:checked').checked = false;
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("fecha_nacimiento").value = "";
    document.getElementById("notificaciones").checked = false;

    document.getElementById("tabla").innerHTML = "";
    insertar();
}

function mostrarAlerta(mensaje) {
    document.getElementById("alertaadso").textContent = mensaje;
    setTimeout(() => {
        document.getElementById("alertaadso").textContent = "";
    }, 6000);
}

function insertar() {
    let cardContainer = document.getElementById("cont_cards");
    cardContainer.innerHTML = "";

    informacion.forEach((item, index) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                <h1>${item.nombre}</h1>
                <h1>${item.apellido}</h1>
                <p><strong>Tipo de documento: </strong> ${item.tipoDocumento}</p>
                <p><strong>Número de documento: </strong> ${item.numeroDocumento}</p>
                <p><strong>Género: </strong> ${item.genero}</p>
                <p><strong>Fecha de nacimiento: </strong> ${item.fechaNacimiento}</p>
                <p><strong>Teléfono: </strong> ${item.telefono}</p>
                <p><strong>Correo: </strong> ${item.correo}</p>
            `;
        cardContainer.appendChild(card);
    })

    let frag = document.createDocumentFragment();

    informacion.forEach((item, index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        let td8 = document.createElement("td");
        let td9 = document.createElement("td");
        let editar = document.createElement("button");
        let eliminar = document.createElement("button");
        editar.textContent = "📝";
        editar.addEventListener("click", () => {
            Editar(item, index);
        })
        eliminar.textContent = "❌";
        eliminar.addEventListener("click", () => {
            Eliminar(index);
        });
        td1.textContent = item.nombre;
        td2.textContent = item.apellido;
        td4.textContent = item.tipoDocumento;
        td3.textContent = item.numeroDocumento;
        td5.textContent = item.genero;
        td6.textContent = item.fechaNacimiento;
        td7.textContent = item.telefono;
        td8.textContent = item.correo;
        td9.appendChild(editar);
        td9.appendChild(eliminar);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        frag.appendChild(tr);
    });
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    tabla.appendChild(frag);

    function Editar(r, i) {
        op = true;
        indice = i;
        document.getElementById("nombres").value = r.nombre;
        document.getElementById("apellidos").value = r.apellido;
        document.querySelector('input[name="tipo_documento"][value="' + r.tipoDocumento + '"]').checked = true;
        document.getElementById("numero_documento").value = r.numeroDocumento;
        document.querySelector('input[name="genero"][value="' + r.genero + '"]').checked = true;
        document.getElementById("telefono").value = r.telefono;
        document.getElementById("correo").value = r.correo;
        document.getElementById("fecha_nacimiento").value = r.fechaNacimiento;
    }

    function Eliminar(i) {
        informacion.splice(i, 1);
        insertar();
    }
}