//*ELEMENTOS DEL DOM

//pantalla
const gameBoxNode = document.querySelector("#game-box")

//boton
const startBtnNode = document.querySelector(".myButton")

//* VARIABLES GLOBALES
let magoObj = null

//* FUNCIONES

function startGame() {

  magoObj = new Mago()
}

function gameLoop() {

}


//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame)