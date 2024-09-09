//*ELEMENTOS DEL DOM

// pantallas
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// game box
const gameBoxNode = document.querySelector("#game-box")

//boton
const startBtnNode = document.querySelector(".myButton")

//* VARIABLES GLOBALES
let magoObj = null
// let snitchObj = null
let snicthArary = []
let snitchIntervalId = null

let gameIntervalId = null

let enemigoObj = null

//* FUNCIONES

function startGame() {

  // cambiar pantallas
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // añadir elementos al juego
  magoObj = new Mago()
  // snitchObj = new Snitch()
  enemigoObj = new Enemigo()

  // iniciar intervalos de juego
  gameIntervalId = setInterval(() => {
    gameLoop()
  }, Math.round(1000 / 60))

  snitchIntervalId = setInterval(() => {
    addSnitch()
  }, 1500)

}

function gameLoop() {
  snicthArary.forEach((eachSnitch) => {
    eachSnitch.automaticMove()
  })
}

function addSnitch() {

  let randomPositionX = Math.floor(Math.random() * 600)

  let newSnitch = new Snitch(randomPositionX)
  snicthArary.push(newSnitch)

}

function detectarSiSnitchSalio() {

}

function detectarColisionMagoSnitch () {

}

function addEnemigo () {

}

function detectarSiEnemigoSalio() {

}

function detectarColisionMagoEnemigo () {

}

//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame)

window.addEventListener("keydown", (event) => {
  //console.log("presionando")
  if (event.key === "ArrowRight") {
    //console.log("mov dcha")
    magoObj.playerMovement("right")
  } else if (event.key === "ArrowLeft") {
    //console.log("mov izq")
    magoObj.playerMovement("left")
  } else if (event.key === "ArrowUp") {
    //console.log("mov izq")
    magoObj.playerMovement("up")
  } else if (event.key === "ArrowDown")
    magoObj.playerMovement("down")
})