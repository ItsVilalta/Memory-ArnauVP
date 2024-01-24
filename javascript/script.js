'use strict';


const tauler = document.getElementById("tauler");
const tempo = document.getElementById("tempo");
const cartasClicades = [];
const btn = document.getElementById("parar")

let t;
let count;
let partidaComencada = false;

const genAleatori = (icones) => {
    return icones.sort(() => Math.random() - 0.5);
};

function creaCartes(icones) {
    icones.forEach(icona => {
        let div = document.createElement("div");
        div.innerHTML = icona;
        tauler.classList.remove("d-none")
        btn.classList.remove("desabilitat")
        div.classList.add("carta");
        div.classList.add("tapada");
        div.addEventListener('click', giraCarta);
        tauler.appendChild(div);
    });
}

function giraCarta(event) {
    let cartaClicada = event.target;
    if (!cartasClicades.includes(cartaClicada) && cartasClicades.length < 2) {
        if (cartasClicades.length === 0 && cartaClicada.tagName === "DIV" || cartasClicades.length === 1 && cartaClicada.src != cartasClicades[0].firstElementChild.src) {
            cartaClicada.classList.remove("tapada");
            cartaClicada.classList.add("destapada");
            cartasClicades.push(cartaClicada);
        }
    }
    if (cartasClicades.length === 2) {
        let cartasTapadas = document.querySelectorAll(".tapada");
        cartasTapadas.forEach(carta => carta.classList.add("desabilitat"));
        setTimeout(() => {
            if (!comprovaCartes()) {
                cartasClicades.forEach(carta => {
                    carta.classList.remove("destapada");
                    carta.classList.add("tapada");
                });
            }
            cartasClicades.length = 0;
            if (comprovaTotesDestapades()) {
                mostrarMissatgeFelicitats();
            }
            cartasTapadas.forEach(carta => carta.classList.remove("desabilitat"));
        }, 1000);
    }
}


function comprovaTotesDestapades() {
    const cartesDestapades = document.querySelectorAll('.destapada');
    const totalCartes = document.querySelectorAll('.carta').length;
    return cartesDestapades.length === totalCartes;
}

function mostrarMissatgeFelicitats() {
    tempo.innerText = "Felicitats!!\nHAS COMPLETAT EL MEMORY";
    clearTimeout(t);
    // tauler.classList.add("d-none")
    btn.classList.add("desabilitat")
}

function comprovaCartes() { 
    if (cartasClicades.length === 2) {
        let carta1 = cartasClicades[0];
        let carta2 = cartasClicades[1];
        if (carta1.innerHTML === carta2.innerHTML) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function temporitzador() {
    if (count > 0) {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;
        if (count <= 10) {
            tauler.style.backgroundColor = "#CA2E55";
            tauler.classList.add("tremolor");
        }
        tempo.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        count--;
        t = setTimeout(temporitzador, 1000);
    } else {
        tempo.innerText = "Temps esgotat!\nHas Perdut :(";
        let cartes = document.querySelectorAll('.carta');
        cartes.forEach(carta => {
            carta.classList.remove('tapada');
            carta.classList.add('destapada');
            carta.classList.add("carta-desabilitat");
        });
    }
}


function startPartida() {

    tauler.style.backgroundColor = "#fae1c0";
    tauler.classList.remove("tremolor");

    if (partidaComencada) {
        const confirmacio = confirm('Vols iniciar una altra partida?');
        if (!confirmacio) {
            return;
        }
    }
    partidaComencada = true;

    // count = prompt("Quants segons vols a la teva partida??");
    // count = parseInt(count); 

    // while (isNaN(count) || count < 20 || count > 500) {
    //     count = prompt("Si us plau, introdueix un nombre vàlid entre 20 i 500 per als segons de la partida.");
    //     count = parseInt(count);
    // }

    count = 300;
    tauler.innerHTML = "";
    creaCartes(genAleatori(icones));
    if (t != undefined) {
        clearTimeout(t);
    }
    temporitzador();
}

function stopPartida() {
    const final = prompt("Vols acabar el joc? (S/N)").toUpperCase();
    if (final === 'S') {
        partidaComencada = false;
        clearTimeout(t);
        tauler.innerHTML = "";
        tempo.innerText = "Has parat el joc\nVols tornar a jugar??";
        tauler.classList.add("d-none")
        btn.classList.add("desabilitat")
    }
}
