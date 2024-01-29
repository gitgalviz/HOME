function resetPage() {
    location.reload(true);
}

const cards = [];

let nuevo_turno = 0;
let turno = 0;

function new_shift(){
    nuevo_turno++;
    let card = document.createElement("div");
    card.className = 'cards';
    card.innerHTML = `
    <div class="cont_num_card">
        <p class="text_num_card">${nuevo_turno}</p>
    </div>
    <div class="cont_info_card">
        <div class="cont_btn_aceptar">
            <button onclick="accept_shift(${nuevo_turno - 1})" class="btn_aceptar">Aceptar</button>
        </div>
        <div class="cont_btn_rechazar">
            <button onclick="reject_shift(${nuevo_turno - 1})" class="btn_rechazar">Rechazar</button>
        </div>
    </div>
    `;

    let cont_cards = document.getElementById("cont_cards");
    cont_cards.appendChild(card);
    cards.push(card);
}

function next_shift(){
    let num = document.getElementById("num");
    if(turno < nuevo_turno){
        turno++;
        num.innerHTML = turno;
    }
}

function previous_shift(){
    let num = document.getElementById("num");
    if(turno > 0){
        turno--;
        num.innerHTML = turno;
    }
}

function accept_shift(index){
    cards[index].classList.remove('rejected');
    cards[index].classList.add('accepted');
}

function reject_shift(index){
    cards[index].classList.remove('accepted');
    cards[index].classList.add('rejected');
}