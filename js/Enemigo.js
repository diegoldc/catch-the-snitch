class Enemigo {
  constructor(positionX, type) {
    this.x = positionX;
    this.y = 0;
    this.w = 50;
    this.h = 50;
    this.baseSpeed = 2
    this.speed = currentSpeedEnemigo
    this.detectado = false // variable para poder manejarlos individualmente

    this.node = document.createElement("img")

    if (type === "snape") {
      this.speed = 1.5
      this.node.src = "./images/snape.png";
    } else if (type === "draco") {
      this.node.src = "./images/draco.png";
    }

    gameBoxNode.append(this.node)

    // le damos los estilos al nodo
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  //movimiento del objeto en el eje y
  automaticMove() {
    this.y += this.speed
    this.node.style.top = `${this.y}px`;
  }

  actualizarSpeed() {
    this.speed = currentSpeedEnemigo
  }
}