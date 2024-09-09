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

// let enemigoObj = null
let enemigoArray = []
let enemigoIntervalId = null

//* FUNCIONES

function startGame() {

  // cambiar pantallas
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // añadir elementos al juego
  magoObj = new Mago()
  // snitchObj = new Snitch()
  // enemigoObj = new Enemigo()

  // iniciar intervalos de juego
  gameIntervalId = setInterval(() => {
    gameLoop()
  }, Math.round(1000 / 60))

  snitchIntervalId = setInterval(() => { //intervalo para añadir snitch
    addSnitch()
  }, 1500)

  enemigoIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addEnemigo()
  }, 1500)

}

function gameLoop() {
  snicthArary.forEach((eachSnitch) => {
    eachSnitch.automaticMove()
  })

  enemigoArray.forEach((eachEnemigo) => {
    eachEnemigo.automaticMove()
  })

  detectarSiSnitchSalio()
  detectarSiEnemigoSalio()
}

function addSnitch() {

  let randomPositionX = Math.floor(Math.random() * 700)

  let newSnitch = new Snitch(randomPositionX)
  snicthArary.push(newSnitch)

}

function detectarSiSnitchSalio() {

  if ((snicthArary[0].y + snicthArary[0].h) <= 0) { // eliminar si llegan al 0px de height
    
    snicthArary[0].node.remove()// Sacar del DOM
    snicthArary.shift() // Sacarlo de JS

  }
}

function detectarColisionMagoSnitch () {

}

function addEnemigo () {
  let randomPositionX = Math.floor(Math.random() * 700) // añadir enemigo en posicion aleatoria eje x

  let newEnemigo = new Enemigo(randomPositionX)
  enemigoArray.push(newEnemigo)
}

function detectarSiEnemigoSalio() {
  if ((enemigoArray[0].y + enemigoArray[0].h) > 450) { // eliminar si se pasa de 450px height
    enemigoArray[0].node.remove()
    enemigoArray.shift() 

  }
}

function detectarColisionMagoEnemigo () {

}

function gameOver () {
  clearInterval(gameIntervalId)
  clearInterval(snitchIntervalId)

  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
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