//*ELEMENTOS DEL DOM

// pantallas
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// game box
const gameBoxNode = document.querySelector("#game-box")

// boton
const startBtnNode = document.querySelector(".myButton")

// score
const scoreNode = document.querySelector("#score")

//* VARIABLES GLOBALES
let magoObj = null
// let snitchObj = null
let snicthArray = []
let snitchIntervalId = null

let gameIntervalId = null

// let enemigoObj = null
let enemigoArray = []
let enemigoSnapeIntervalId = null
let enemigoDracoIntervalId = null

let score = 0

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

  enemigoSnapeIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addEnemigoSnape()
  }, 2300)

  enemigoDracoIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addEnemigoDraco()
  }, 1500)

}

function gameLoop() {
  snicthArray.forEach((eachSnitch) => {
    eachSnitch.automaticMove()
  })

  enemigoArray.forEach((eachEnemigo) => {
    eachEnemigo.automaticMove()
  })

  detectarSiSnitchSalio()
  detectarSiEnemigoSalio()
  detectarColisionMagoEnemigo()
  detectarColisionMagoSnitch()
}

function addSnitch() {

  let randomPositionX = Math.floor(Math.random() * 700)

  let newSnitch = new Snitch(randomPositionX)
  snicthArray.push(newSnitch)

}

function detectarSiSnitchSalio() {

  if ((snicthArray[0].y + snicthArray[0].h) <= 0) { // eliminar si llegan al 0px de height
    
    snicthArray[0].node.remove()// Sacar del DOM
    snicthArray.shift() // Sacarlo de JS

  }
}

function detectarColisionMagoSnitch () {

  snicthArray.forEach((eachSnitch, index) => {


    if(
      // medidas para indicar que esta dentro de las medidas de cada enemigo
      (magoObj.y + magoObj.h) >= eachSnitch.y &&
      (magoObj.x + magoObj.w) >= eachSnitch.x &&
      magoObj.x <= (eachSnitch.x + eachSnitch.w) &&
      magoObj.y <= (eachSnitch.y + eachSnitch.h) 
    ) {

      score++ // aumentamos score en 1
      scoreNode.innerText = score

      eachSnitch.node.remove()
      
      snicthArray.splice(index, 1) // eliminar solo la snicth que contacte del array
    }
  })
}

function addEnemigoSnape () {
  let randomPositionX = Math.floor(Math.random() * 700) // añadir enemigo en posicion aleatoria eje x

  let newSnape = new Enemigo(randomPositionX, "snape")
  enemigoArray.push(newSnape)

}

function addEnemigoDraco () {
  let randomPositionX = Math.floor(Math.random() * 700) // añadir enemigo en posicion aleatoria eje x

  let newDraco = new Enemigo(randomPositionX, "draco")
  enemigoArray.push(newDraco)
}

function detectarSiEnemigoSalio() {
  if ((enemigoArray[0].y + enemigoArray[0].h) > 450) { // eliminar si se pasa de 450px height
    enemigoArray[0].node.remove()
    enemigoArray.shift() 

  }
}

function detectarColisionMagoEnemigo () {

    enemigoArray.forEach((eachEnemigo) => {


      if(
        // medidas para indicar que esta dentro de las medidas de cada enemigo
        (magoObj.y + magoObj.h) >= eachEnemigo.y &&
        (magoObj.x + magoObj.w) >= eachEnemigo.x &&
        magoObj.x <= (eachEnemigo.x + eachEnemigo.w) &&
        magoObj.y <= (eachEnemigo.y + eachEnemigo.h) 
      ) {
        gameOver()

      }
    })
}

function gameOver () {
  clearInterval(gameIntervalId)
  clearInterval(snitchIntervalId)
  clearInterval(enemigoDracoIntervalId)
  clearInterval(enemigoSnapeIntervalId)

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