let presupuesto_Inicial = 0;
let saldo_Restante = 0;

function formatearMoneda(valor) {
    return valor.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function mostrarAlerta(mensaje) {
    let alerta = document.getElementById("alert");
    alerta.textContent = mensaje;
    alerta.classList.remove("alert2");
    alerta.classList.add("alert2");
    setTimeout(() => {
        alerta.textContent = "";
        alerta.classList.remove("alert2");
    }, 2000);
}

function iniciar() {
    presupuesto_Inicial = parseFloat(document.getElementById("box0").value);

    if (presupuesto_Inicial > 0) {
        document.querySelector(".cont_main1").classList.add("cont_main1_disabled");
        document.querySelector(".cont_00").style.display = "none";
        document.querySelector(".cont_01").style.display = "block";
        document.querySelector(".cont_02").style.display = "block";
        document.querySelector(".boton1").style.display = "none";
        document.querySelector(".boton5").style.display = "block";
        document.getElementById("texto_presupuesto").textContent = formatearMoneda(presupuesto_Inicial);
        saldo_Restante = presupuesto_Inicial;
        document.getElementById("texto_restante").textContent = formatearMoneda(saldo_Restante);
        document.querySelector(".saldo").style.backgroundColor = "#01ad04";
    } else {
        mostrarAlerta("Registre un presupuesto mayor a cero")
    };
};

function registrar() {
    const nombreGasto = document.getElementById("box1").value;
    const cantidadGasto = parseFloat(document.getElementById("box2").value);

    if (nombreGasto !== "" && cantidadGasto > 0) {
        if (cantidadGasto <= saldo_Restante) {
            const contCards = document.getElementById("cont_cards");
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="articulo">${nombreGasto}</div>
                <div class="precio">${formatearMoneda(cantidadGasto)}</div>
                <div class="boton_card">
                <button class="boton2" onclick="borrarGasto(this, ${cantidadGasto})">Borrar</button>
                </div>
            `;
            contCards.appendChild(card);
            saldo_Restante -= cantidadGasto;
            document.getElementById("texto_restante").textContent = formatearMoneda(saldo_Restante);
            document.getElementById("box1").value = "";
            document.getElementById("box2").value = "";

            if (saldo_Restante < presupuesto_Inicial * 0.2) {
                document.querySelector(".saldo").style.backgroundColor = "#FF0000";
            } else {
                document.querySelector(".saldo").style.backgroundColor = "#f26d5f";
            }

            if (saldo_Restante <= 0) {
                document.querySelector(".boton5").disabled = true;
                mostrarAlerta("Sin presupuesto");
            } else {
                document.querySelector(".boton5").disabled = false;
            }
        } else {
            mostrarAlerta("No cuenta con el presupuesto suficiente para este gasto");
        }
    } else {
        mostrarAlerta("Por favor, ingrese un nombre y una cantidad válidos");
    };
};

function borrarGasto(button, cantidad) {
    button.parentElement.parentElement.remove();
    saldo_Restante += cantidad;
    document.getElementById("texto_restante").textContent = formatearMoneda(saldo_Restante);
    if (saldo_Restante <= 0) {
        document.querySelector(".boton5").disabled = true;
    } else {
        document.querySelector(".boton5").disabled = false;
    }

    if (saldo_Restante < presupuesto_Inicial * 0.2) {
        document.querySelector(".saldo").style.backgroundColor = "#FF0000";
    } else {
        document.querySelector(".saldo").style.backgroundColor = "#01ad04";
    };
};