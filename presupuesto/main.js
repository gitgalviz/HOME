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
        // mensajePresupuesto.textContent = "Añade tus gastos";
        document.querySelector(".saldo").style.backgroundColor = "#01ad04";
    } else {
        alert("Registre un presupuesto mayor a cero");
        // mensajePresupuesto.textContent = "Registre un presupuesto mayor a cero";
        // mensajePresupuesto.style.color = "red";
        // mensajePresupuesto.style.fontWeight = "bold";

        // setTimeout(function () {
        //     mensajePresupuesto.textContent = "Registra el presupuesto";
        //     mensajePresupuesto.style.color = "#595c5c";
        //     mensajePresupuesto.style.fontWeight = "normal";
        // }, 2000);
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
                document.querySelector(".boton_s").disabled = true;
                alert("Sin presupuesto");
                // mensajeSecundario.textContent = "Sin presupuesto";
                // mensajeSecundario.style.color = "red";
                // setTimeout(function () {
                //     mensajeSecundario.textContent = "Gasto Semanal";
                //     mensajeSecundario.style.color = "#000000";
                // }, 2000);
            } else {
                document.querySelector(".boton_s").disabled = false;
            }
        } else {
            alert("No cuenta con el presupuesto suficiente para este gasto");
            // mensajePresupuesto.textContent = "No cuenta con el presupuesto suficiente para este gasto";
            // mensajePresupuesto.style.color = "red";
            // mensajePresupuesto.style.fontWeight = "bold";

            // setTimeout(function () {
            //     mensajePresupuesto.textContent = "Añade tus gastos";
            //     mensajePresupuesto.style.color = "#595c5c";
            //     mensajePresupuesto.style.fontWeight = "normal";
            // }, 2000);
        }
    } else {
        alert("Por favor, ingrese un nombre y una cantidad válidos");
        // mensajePresupuesto.textContent = "Por favor, ingrese un nombre y una cantidad válidos";
        // mensajePresupuesto.style.color = "red";
        // mensajePresupuesto.style.fontWeight = "bold";

        // setTimeout(function () {
        //     mensajePresupuesto.textContent = "Añade tus gastos";
        //     mensajePresupuesto.style.color = "#595c5c";
        //     mensajePresupuesto.style.fontWeight = "normal";
        // }, 2000);
    };
};

function borrarGasto(button, cantidad) {
    button.parentElement.parentElement.remove();
    saldo_Restante += cantidad;
    document.getElementById("texto_restante").textContent = formatearMoneda(saldo_Restante);
    if (saldo_Restante <= 0) {
        document.querySelector(".boton_s").disabled = true;
    } else {
        document.querySelector(".boton_s").disabled = false;
    }

    if (saldo_Restante < presupuesto_Inicial * 0.2) {
        document.querySelector(".saldo").style.backgroundColor = "#FF0000";
    } else {
        document.querySelector(".saldo").style.backgroundColor = "#01ad04";
    };
};