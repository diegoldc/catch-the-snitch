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

// timer
const timerNode = document.querySelector("#timer")

//result
const resultContainer = document.querySelector("#result");
const endTimeContainer = document.querySelector("#end-time")

//mute
const muteButton = document.querySelector("#mute-button")

//* VARIABLES GLOBALES
let magoObj = null
// let snitchObj = null
let snicthArray = []
let snitchIntervalId = null

let gameIntervalId = null

// let enemigoObj = null
let enemigoArray = []
let voldemortArray = []
let hechizoArray = []
let flameArray = []
let enemigoSnapeIntervalId = null
let enemigoDracoIntervalId = null
let enemigoVoldemortIntervalId = null

let bludgerObj = null
let bludgerIntervalId = null
let isBludgerColision = false

let score = 0
let health = 3
let remainingTime = 0
let timerInterval = null
let minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0")
let seconds = (remainingTime % 60).toString().padStart(2, "0")
let finalTime

let speedIncreaseInterval = null

let baseSpeed = 1 // Velocidad inicial
let currentSpeedEnemigo = baseSpeed // Esta será la velocidad que se multiplica

let keysPressed = {} // Objeto para almacenar las teclas presionadas


const audioStart = new Audio("./audio/audio-prueba.mp3")
audioStart.loop = true

document.addEventListener("click", () => {
  audioStart.play()
  audioStart.volume = 0.1
}, { once: true })

const audioGame = new Audio("./audio/audio-magic.mp3")
audioGame.loop = true

const audioGameOver = new Audio("./audio/audio-game-over.wav")
audioGame.loop = false

const audioHechizo = new Audio("./audio/audio-hechizo.mp3")
audioHechizo.loop = false

const audioDamage = new Audio("./audio/audio-damage.wav")
audioDamage.loop = false

const audioSnitch = new Audio("./audio/audio-snitch.mp3")
audioSnitch.loop = false
//const audio golpear boom


//variable para controlar el mute
let isMuted = false


//* FUNCIONES // 

function startGame() {

  //iniciamos el audio de la pantalla de juego

  audioStart.pause()
  audioGame.play()
  audioGame.volume = 0.5

  score = 0
  scoreNode.innerText = `Score: ${score}`

  health = 3
  healthNode.innerText = `Health: ${health}`

  remainingTime = 0

  let minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
  let seconds = (remainingTime % 60).toString().padStart(2, "0");

  timerNode.innerText = `${minutes}:${seconds}`;

  // cambiar pantallas
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // añadir elementos al juego
  magoObj = new Mago()
  // snitchObj = new Snitch()
  // enemigoObj = new Enemigo()
  bludgerObj = new Bludger()
  moveBludger()


  // iniciar intervalos de juego
  gameIntervalId = setInterval(() => {
    gameLoop()
  }, Math.round(1000 / 60))

  snitchIntervalId = setInterval(() => { //intervalo para añadir snitch
    addSnitch()
  }, 1500)

  enemigoSnapeIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addEnemigoSnape()
  }, 3000)

  enemigoDracoIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addEnemigoDraco()
  }, 4500)

  enemigoVoldemortIntervalId = setInterval(() => { // intervalo para añadir enemigo
    addVoldemort()
  }, 7000)


  timerInterval = setInterval(() => {
    // if (remainingTime === 0) {
    //   gameOver()
    // }
    remainingTime++
    minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
    seconds = (remainingTime % 60).toString().padStart(2, "0");
    timerNode.innerText = `${minutes}:${seconds}`
  }, 1000)

  if (speedIncreaseInterval) {
    clearInterval(speedIncreaseInterval);
  }
  speedIncreaseInterval = setInterval(() => {
    increaseSpeedOfEnemies(2); // Aumenta la velocidad por 2x
  }, 20000);

  disableScroll()
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

  moveMago()
  moveHechizos()
  moveFlame()
  detectarColisionHechizoEnemigo()

  detectarColisionMagoEnemigo()
  detectarColisionMagoSnitch()
  detectarColisionMagoVoldemort()
  detectarColisionFlameVoldemort()
  detectarColisionMagoBludger()

  detectarSiHechizoSalio()
  detectarSiFlameSalio()
  detectarSiEnemigoSalio()
  detectarSiSnitchSalio()
  detectarSiVoldemortSalio()


}

function addSnitch() {
  let newSnitch = new Snitch(0)
  let maxWidth = 700 - newSnitch.w

  let randomPositionX = Math.floor(Math.random() * maxWidth)

  newSnitch.x = randomPositionX
  newSnitch.node.style.left = `${newSnitch.x}px`

  snicthArray.push(newSnitch)

}

function detectarSiSnitchSalio() {

  if ((snicthArray[0].y + snicthArray[0].h) <= 0) { // eliminar si llegan al 0px de eje y

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

      audioSnitch.volume = 0.5
      audioSnitch.play()

      score++ // aumentamos score en 1
      scoreNode.innerText = `Score: ${score}`

      // alerta cuando atrapes la snitch
      let alertSnitch = document.createElement('img')
      alertSnitch.src = "./images/alerta-snitch.png"


      // posicionar la alerta
      alertSnitch.style.position = 'absolute';
      alertSnitch.style.top = `${eachSnitch.y + eachSnitch.h / 2}px`;
      alertSnitch.style.left = `${eachSnitch.x + eachSnitch.w / 2}px`;
      alertSnitch.style.transform = 'translate(-50%, -50%)';
      alertSnitch.style.zIndex = '1000'; // que esté por encima de otros elementos
      alertSnitch.style.width = '80px';
      alertSnitch.style.height = 'auto';
      alertSnitch.style.opacity = '1'; // visible al inicio

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

  const gameBoxWidth = gameBoxNode.offsetWidth - 40;
  let newSnape = new Enemigo(0, "snape")
  let maxWidth = gameBoxWidth - newSnape.w

  let randomPositionX = Math.floor(Math.random() * maxWidth) // añadir enemigo en posicion aleatoria eje x

  newSnape.x = randomPositionX
  newSnape.node.style.left = `${newSnape.x}px`

  enemigoArray.push(newSnape)

}

function addEnemigoDraco() {
  const gameBoxWidth = gameBoxNode.offsetWidth - 40;
  let newDraco = new Enemigo(0, "draco")
  let maxWidth = gameBoxWidth - newDraco.w

  let randomPositionX = Math.floor(Math.random() * maxWidth)

  newDraco.x = randomPositionX
  newDraco.node.style.left = `${newDraco.x}px`

  enemigoArray.push(newDraco)
}

function addVoldemort() {


  const gameBoxHeight = gameBoxNode.offsetHeight - 40
  let newVoldemort = new Voldemort(0, "voldemort")
  let maxHeight = gameBoxHeight - newVoldemort.h

  let randomPositionY = Math.floor(Math.random() * maxHeight)

  newVoldemort.y = randomPositionY
  newVoldemort.node.style.top = `${newVoldemort.y}px`

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

function detectarSiHechizoSalio() {
  if ((hechizoArray[0].x + hechizoArray[0].w) < 0) { // eliminar si se pasa de 450px height
    hechizoArray[0].node.remove()
    hechizoArray.shift()
  } else if ((hechizoArray[0].y + hechizoArray[0].h) > 450) { // eliminar si se pasa de 450px height
    hechizoArray[0].node.remove()
    hechizoArray.shift()
  } else if ((hechizoArray[0].y + hechizoArray[0].h) < 0) {
    hechizoArray[0].node.remove()
    hechizoArray.shift()
  } else if ((hechizoArray[0].x) > 700) {
    hechizoArray[0].node.remove()
    hechizoArray.shift()
  }
}

function detectarSiFlameSalio() {
  if ((flameArray[0].x + flameArray[0].w) < 0) {
    flameArray[0].node.remove()
    flameArray.shift()
  } else if ((flameArray[0].y + flameArray[0].h) > 450) {
    flameArray[0].node.remove()
    flameArray.shift()
  } else if ((flameArray[0].y + flameArray[0].h) < 0) {
    flameArray[0].node.remove()
    flameArray.shift()
  } else if ((flameArray[0].x) > 700) {
    flameArray[0].node.remove()
    flameArray.shift()
  }
}

function detectarColisionMagoEnemigo() {

  enemigoArray.forEach((eachEnemigo, index) => {

    if (eachEnemigo.detectado) { // cuando haya un primer contacto detectado lo pasamos a true, para que no cuente de más por posibles contactos al iterar el foreach
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

      audioDamage.volume = 0.3
      audioDamage.play()

      // si choca con snape o draco restamos una vida, luego comprobamos si health = 0 -> gameOver
      health--
      healthNode.innerText = `Health: ${health}`

      let alertEnemigo = document.createElement('img')
      alertEnemigo.src = "./images/alerta-vida.png"


      // posicionar la alerta
      alertEnemigo.style.position = 'absolute';
      alertEnemigo.style.top = `${magoObj.y + magoObj.h / 2}px`
      alertEnemigo.style.left = `${magoObj.x + magoObj.w / 2}px`
      alertEnemigo.style.transform = 'translate(-50%, -50%)';
      alertEnemigo.style.zIndex = '1000';
      alertEnemigo.style.width = '30px';
      alertEnemigo.style.height = 'auto';
      alertEnemigo.style.opacity = '1';

      gameBoxNode.append(alertEnemigo) // lo añadimos al nodo gamebox

      // desaparece la alerta en 1 segundo
      setTimeout(() => {
        alertEnemigo.remove()
      }, 1000)

      if (health <= 0) {
        finalTime = remainingTime
        gameOver()
        return
      }

      eachEnemigo.node.remove()

      enemigoArray.splice(index, 1)

    }
  })
}

function detectarColisionMagoVoldemort() {

  voldemortArray.forEach((eachVoldemort, index) => {

    if (eachVoldemort.detectado) { // cuando haya un primer contacto detectado lo pasamos a true, para que no cuente de más por posibles contactos al iterar el foreach
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

      finalTime = remainingTime
      gameOver()

      eachVoldemort.node.remove()

      voldemortArray.splice(index, 1) // eliminar solo la snicth que contacte del array

    }
  })
}

function detectarColisionMagoBludger() {
  if (
    (magoObj.y + magoObj.h) >= bludgerObj.y &&
    (magoObj.x + magoObj.w) >= bludgerObj.x &&
    magoObj.x <= (bludgerObj.x + bludgerObj.w) &&
    magoObj.y <= (bludgerObj.y + bludgerObj.h)
  ) {

    if (!isBludgerColision) {
      isBludgerColision = true // con esta variable controlamos si ha habido colision, cuando toca pasa a true y si no toca lo pasamos a false, de eso depende que se cumpla o no la condicion. Si no trabajamos con este booleano me detecta multiples colisiones a la vez

      audioDamage.volume = 0.3
      audioDamage.play()

      health--
      healthNode.innerText = `Health: ${health}`

      if (health <= 0) {
        finalTime = remainingTime
        gameOver()
        return
      }

      let alertBludger = document.createElement('img')
      alertBludger.src = "./images/alerta-vida.png"


      // posicionar la alerta
      alertBludger.style.position = 'absolute';
      alertBludger.style.top = `${magoObj.y + magoObj.h / 2}px`
      alertBludger.style.left = `${magoObj.x + magoObj.w / 2}px`
      alertBludger.style.transform = 'translate(-50%, -50%)';
      alertBludger.style.zIndex = '1000';
      alertBludger.style.width = '30px';
      alertBludger.style.height = 'auto';
      alertBludger.style.opacity = '1';

      gameBoxNode.append(alertBludger) // lo añadimos al nodo gamebox

      // desaparece la alerta en 1 segundo
      setTimeout(() => {
        alertBludger.remove()
      }, 1000)

    }

  } else {
    isBludgerColision = false
  }
}

function gameOver() {
  audioGame.pause();
  audioGame.currentTime = 0

  audioGameOver.play()
  audioGameOver.volume = 0.2

  enableScroll()

  clearInterval(gameIntervalId)
  clearInterval(snitchIntervalId)
  clearInterval(enemigoDracoIntervalId)
  clearInterval(enemigoSnapeIntervalId)
  clearInterval(enemigoVoldemortIntervalId)
  clearInterval(timerInterval)
  clearInterval(speedIncreaseInterval)

  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"

  resultContainer.innerText = `You have scored ${score} points!`
  endTimeContainer.innerText = `You have survived for ${finalTime} seconds`


}

function restartGame() {

  audioGame.play()

  gameScreenNode.style.display = "flex"
  gameOverScreenNode.style.display = "none"

  score = 0
  scoreNode.innerText = `Score: ${score}`

  health = 3
  healthNode.innerText = `Health: ${health}`

  remainingTime = 0

  let minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0")
  let seconds = (remainingTime % 60).toString().padStart(2, "0")

  timerNode.innerText = `${minutes}:${seconds}`

  currentSpeedEnemigo = baseSpeed

  // eliminar mago anterior
  magoObj.node.remove()

  //eliminar la bludger
  if (bludgerIntervalId) {
    clearInterval(bludgerIntervalId);
  }
  bludgerObj.node.remove()

  //eliminar todos los enemigos
  enemigoArray.forEach((eachEnemigo) => {
    if (eachEnemigo.node) {
      eachEnemigo.node.remove()
    }
  })
  enemigoArray = []

  voldemortArray.forEach((eachVoldemort) => {
    if (eachVoldemort.node) {
      eachVoldemort.node.remove()
    }
  })
  voldemortArray = []

  snicthArray.forEach((eachSnitch) => {
    if (eachSnitch.node) {
      eachSnitch.node.remove()
    }
  })
  snicthArray = []

  startGame()
}

function increaseSpeedOfEnemies(multiplier) {
  currentSpeedEnemigo *= multiplier

  enemigoArray.forEach((eachEnemigo) => {
    eachEnemigo.actualizarSpeed()
  })
}

function addHechizo() {

  audioHechizo.play()
  audioHechizo.volume = 0.2

  let direction = "up"; // Por defecto, hacia arriba
  if (keysPressed["d"]) {
    direction = "right"
  } else if (keysPressed["a"]) {
    direction = "left"
  } else if (keysPressed["s"]) {
    direction = "down"
  }

  let newHechizo = new Hechizo(magoObj.x + magoObj.w / 2, magoObj.y, direction)
  if (direction === "up") {
    newHechizo.node.style.transform = "rotate(-70deg)"
  } else if (direction === "right") {
    newHechizo.node.style.transform = "scaleX(1)"
  } else if (direction === "left") {
    newHechizo.node.style.transform = "scaleX(-1)"
  } else if (direction === "down") {
    newHechizo.node.style.transform = "rotate(70deg)"
  }


  hechizoArray.push(newHechizo)


}

function addFlame() {
  audioHechizo.play()
  audioHechizo.volume = 0.2

  let direction = "up"; // Por defecto, hacia arriba
  if (keysPressed["d"]) {
    direction = "right"
  } else if (keysPressed["a"]) {
    direction = "left"
  } else if (keysPressed["s"]) {
    direction = "down"
  }

  let newFlame = new Flame(magoObj.x + magoObj.w / 2, magoObj.y, direction)
  if (direction === "up") {
    newFlame.node.style.transform = "rotate(-75deg)"
  } else if (direction === "right") {
    newFlame.node.style.transform = "scaleX(1)"
  } else if (direction === "left") {
    newFlame.node.style.transform = "scaleX(-1)"
  } else if (direction === "down") {
    newFlame.node.style.transform = "rotate(75deg)"
  }


  flameArray.push(newFlame)
}

function detectarColisionHechizoEnemigo() {
  hechizoArray.forEach((eachHechizo, hechizoIndex) => {
    enemigoArray.forEach((eachenemigo, enemigoIndex) => {
      if (
        eachHechizo.x < eachenemigo.x + eachenemigo.w &&
        eachHechizo.x + eachHechizo.w > eachenemigo.x &&
        eachHechizo.y < eachenemigo.y + eachenemigo.h &&
        eachHechizo.y + eachHechizo.h > eachenemigo.y
      ) {
        // Eliminar el enemigo y el hechizo si colisionan
        eachHechizo.node.remove()
        eachenemigo.node.remove()

        hechizoArray.splice(hechizoIndex, 1)
        enemigoArray.splice(enemigoIndex, 1)

        score++; // Aumentar el score
        scoreNode.innerText = `Score: ${score}`

        let alertHechizo = document.createElement('img')
        alertHechizo.src = "./images/boom.png"


        // posicionar la alerta
        alertHechizo.style.position = 'absolute'
        alertHechizo.style.top = `${eachenemigo.y + eachenemigo.h / 2}px`
        alertHechizo.style.left = `${eachenemigo.x + eachenemigo.w / 2}px`
        alertHechizo.style.transform = 'translate(-50%, -50%)'
        alertHechizo.style.zIndex = '1000'
        alertHechizo.style.width = '100px'
        alertHechizo.style.height = 'auto'
        alertHechizo.style.opacity = '1'

        gameBoxNode.append(alertHechizo) // lo añadimos al nodo gamebox

        // desaparece la alerta en 1 segundo
        setTimeout(() => {
          alertHechizo.remove()
        }, 1000)

      }
    })
  })
}

function detectarColisionFlameVoldemort() {
  flameArray.forEach((eachFlame, flameIndex) => {
    voldemortArray.forEach((eachVoldemort, voldemortIndex) => {
      if (
        eachFlame.x < eachVoldemort.x + eachVoldemort.w &&
        eachFlame.x + eachFlame.w > eachVoldemort.x &&
        eachFlame.y < eachVoldemort.y + eachVoldemort.h &&
        eachFlame.y + eachFlame.h > eachVoldemort.y
      ) {
        // Eliminar el enemigo y el hechizo si colisionan
        eachFlame.node.remove()
        eachVoldemort.node.remove()

        flameArray.splice(flameIndex, 1)
        voldemortArray.splice(voldemortIndex, 1)

        score += 5; // Aumentar el score
        scoreNode.innerText = `Score: ${score}`

        let alertFlame = document.createElement('img')
        alertFlame.src = "./images/boom.png"


        // posicionar la alerta
        alertFlame.style.position = 'absolute';
        alertFlame.style.top = `${eachVoldemort.y + eachVoldemort.h / 2}px`;
        alertFlame.style.left = `${eachVoldemort.x + eachVoldemort.w / 2}px`;
        alertFlame.style.transform = 'translate(-50%, -50%)';
        alertFlame.style.zIndex = '1000';
        alertFlame.style.width = '100px';
        alertFlame.style.height = 'auto';
        alertFlame.style.opacity = '1';

        gameBoxNode.append(alertFlame) // lo añadimos al nodo gamebox

        // desaparece la alerta en 1 segundo
        setTimeout(() => {
          alertFlame.remove()
        }, 1000)

      }
    })
  })
}

function moveHechizos() {
  hechizoArray.forEach((eachHechizo) => {
    eachHechizo.move(); // Mover hechizo

  })
}

function moveFlame() {
  flameArray.forEach((eachFlame) => {
    eachFlame.move(); // Mover hechizo
  })
}


// deshabilitar el scroll
function disableScroll() {
  document.body.style.overflow = 'hidden'
}


function enableScroll() {
  document.body.style.overflow = 'auto'
}

function moveMago() {
  // está presionada una tecla
  window.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true
  });

  // Detectar cuándo se suelta una tecla
  window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false
  });

  if (keysPressed["d"]) {
    magoObj.playerMovement("right")
    magoObj.node.style.transform = "scaleX(1)" // Girar el mago hacia la derecha
  }

  if (keysPressed["a"]) {
    magoObj.playerMovement("left")
    magoObj.node.style.transform = "scaleX(-1)"
  }

  if (keysPressed["w"]) {
    magoObj.playerMovement("up")
    magoObj.node.style.transform = "rotate(-45deg)"
  }

  if (keysPressed["s"]) {
    magoObj.playerMovement("down")
    magoObj.node.style.transform = "rotate(45deg)"
  }
}

function moveBludger() {
  bludgerIntervalId = setInterval(() => {
    bludgerObj.chase(magoObj)
  }, 50)

}

//* EVENT LISTENERS

muteButton.addEventListener('click', () => {
  if (isMuted) {
    audioStart.muted = false
    audioGame.muted = false
    audioHechizo.muted = false
    audioSnitch.muted = false
    audioDamage.muted = false
    audioGameOver.muted = false
    // audioStart.play()
    muteButton.src = './images/unmute.png'
  } else {
    // Si no está muteado, lo muteamos
    audioStart.muted = true
    audioGame.muted = true
    audioHechizo.muted = true
    audioSnitch.muted = true
    audioDamage.muted = true
    audioGameOver.muted = true
    muteButton.src = './images/mute.png'
  }

  // cambiamos el estado al clickar
  isMuted = !isMuted
});

startBtnNode.addEventListener("click", startGame)

window.addEventListener("keydown", (event) => {
  if (gameScreenNode.style.display === "flex") {
    if (event.key === "4") {
      addHechizo();
    } else if (event.key === "6") {
      addFlame();
    }
  }
});

botonRestartNode.addEventListener("click", restartGame) 