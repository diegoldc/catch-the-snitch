//*ELEMENTOS DEL DOM

// pantallas
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// game box
const gameBoxNode = document.querySelector("#game-box")

// boton
const startBtnNode = document.querySelector(".myButton")
const botonRestartNode = document.querySelector("#restartButton")

// score
const scoreNode = document.querySelector("#score")
const healthNode = document.querySelector("#health")

//* VARIABLES GLOBALES
let magoObj = null
// let snitchObj = null
let snicthArray = []
let snitchIntervalId = null

let gameIntervalId = null

// let enemigoObj = null
let enemigoArray = []
let voldemortArray = []
let enemigoSnapeIntervalId = null
let enemigoDracoIntervalId = null
let enemigoVoldemortIntervalId = null

let score = 0
let health = 3

//* FUNCIONES

function startGame() {
  score = 0
  scoreNode.innerText = `Score: ${score}`

  health  = 3
  healthNode.innerText = `Health: ${health}`

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

  enemigoVoldemortIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addVoldemort()
  }, 4000)

}

function gameLoop() {
  snicthArray.forEach((eachSnitch) => {
    eachSnitch.automaticMove()
  })

  enemigoArray.forEach((eachEnemigo) => {
    eachEnemigo.automaticMove()
  })

  voldemortArray.forEach((eachVoldemort) => {
    eachVoldemort.automaticMove()
  })

  detectarSiSnitchSalio()
  detectarSiEnemigoSalio()
  detectarSiVoldemortSalio()
  detectarColisionMagoEnemigo()
  detectarColisionMagoSnitch()
  detectarColisionMagoVoldemort()
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

function detectarColisionMagoSnitch() {

  snicthArray.forEach((eachSnitch, index) => {


    if (
      // medidas para indicar que esta dentro de las medidas de cada enemigo
      (magoObj.y + magoObj.h) >= eachSnitch.y &&
      (magoObj.x + magoObj.w) >= eachSnitch.x &&
      magoObj.x <= (eachSnitch.x + eachSnitch.w) &&
      magoObj.y <= (eachSnitch.y + eachSnitch.h)
    ) {

      score++ // aumentamos score en 1
      scoreNode.innerText = `Score: ${score}`

      // alerta cuando atrapes la snitch
      let alertSnitch = document.createElement('p')
      alertSnitch.innerText = "Ole!"

      // posicionar la alerta
      // alertSnitch.style.position etc.

      gameBoxNode.append(alertSnitch) // lo añadimos al nodo gamebox

      // desaparece la alerta en 1 segundo
      setTimeout(() => {
        alertSnitch.remove()
      }, 1000)


      eachSnitch.node.remove()

      snicthArray.splice(index, 1) // eliminar solo la snicth que contacte del array
    }
  })
}

function addEnemigoSnape() {
  let randomPositionX = Math.floor(Math.random() * 700) // añadir enemigo en posicion aleatoria eje x

  let newSnape = new Enemigo(randomPositionX, "snape")
  enemigoArray.push(newSnape)

}

function addEnemigoDraco() {
  let randomPositionX = Math.floor(Math.random() * 700) // añadir enemigo en posicion aleatoria eje x

  let newDraco = new Enemigo(randomPositionX, "draco")
  enemigoArray.push(newDraco)
}

function addVoldemort() {
  let randomPositionY = Math.floor(Math.random() * 450) // añadir enemigo en posicion aleatoria eje x

  let newVoldemort = new Voldemort(randomPositionY, "voldemort")
  voldemortArray.push(newVoldemort)
}

function detectarSiEnemigoSalio() {
  if ((enemigoArray[0].y + enemigoArray[0].h) > 450) { // eliminar si se pasa de 450px height
    enemigoArray[0].node.remove()
    enemigoArray.shift()
  }
}

function detectarSiVoldemortSalio() {
  if ((voldemortArray[0].x + voldemortArray[0].w) < 0) { // eliminar si se pasa de 450px height
    voldemortArray[0].node.remove()
    voldemortArray.shift()
  }
}

function detectarColisionMagoEnemigo() {

  enemigoArray.forEach((eachEnemigo) => {

    if(eachEnemigo.detectado){ // cuando haya un primer contacto detectado lo pasamos a true, para que no cuente de más por posibles contactos al iterar el foreach
      return
    }

    if (
      // medidas para indicar que esta dentro de las medidas de cada enemigo
      (magoObj.y + magoObj.h) >= eachEnemigo.y &&
      (magoObj.x + magoObj.w) >= eachEnemigo.x &&
      magoObj.x <= (eachEnemigo.x + eachEnemigo.w) &&
      magoObj.y <= (eachEnemigo.y + eachEnemigo.h)
    ) {
      eachEnemigo.detectado = true

       // si choca con snape o draco restamos una vida, luego comprobamos si health = 0 -> gameOver
        health--
        healthNode.innerText = `Health: ${health}`

        if (health <= 0) {
          gameOver()
        }

        // alerta cuando atrapes la snitch
        let alertEnemigo = document.createElement('p')
        alertEnemigo.innerText = "Pillado!"

        // posicionar la alerta
        // alertSnitch.style.position etc.

        gameBoxNode.append(alertEnemigo) // lo añadimos al nodo gamebox

        // desaparece la alerta en 1 segundo
        setTimeout(() => {
          alertEnemigo.remove()
        }, 1000)


        eachEnemigo.node.remove()

        enemigoArray.splice(index, 1) // eliminar solo la snicth que contacte del array
              
    }
    })
}

function detectarColisionMagoVoldemort() {

  voldemortArray.forEach((eachVoldemort) => {

    if(eachVoldemort.detectado){ // cuando haya un primer contacto detectado lo pasamos a true, para que no cuente de más por posibles contactos al iterar el foreach
      return
    }

    if (
      // medidas para indicar que esta dentro de las medidas de cada enemigo
      (magoObj.y + magoObj.h) >= eachVoldemort.y &&
      (magoObj.x + magoObj.w) >= eachVoldemort.x &&
      magoObj.x <= (eachVoldemort.x + eachVoldemort.w) &&
      magoObj.y <= (eachVoldemort.y + eachVoldemort.h)
    ) {
      eachVoldemort.detectado = true

       // si choca con snape o draco restamos una vida, luego comprobamos si health = 0 -> gameOver
        gameOver()
        
        eachVoldemort.node.remove()

        voldemortArray.splice(index, 1) // eliminar solo la snicth que contacte del array
              
    }
    })
}

function gameOver() {
  clearInterval(gameIntervalId)
  clearInterval(snitchIntervalId)
  clearInterval(enemigoDracoIntervalId)
  clearInterval(enemigoSnapeIntervalId)

  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
}

function restartGame() {
  gameScreenNode.style.display = "flex"
  gameOverScreenNode.style.display = "none"
 
  // eliminar mago anterior
  magoObj.node.remove()

  //eliminar todos los enemigos
  enemigoArray.forEach((eachEnemigo) => {
    eachEnemigo.node.remove(); 
  });
  enemigoArray = [];

  voldemortArray.forEach((eachVoldemort) => {
    eachVoldemort.node.remove(); 
  });
  voldemortArray = [];

  startGame()
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

botonRestartNode.addEventListener("click", restartGame) 