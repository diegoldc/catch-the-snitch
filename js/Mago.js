class Mago {

  constructor() {
    this.x = 70;
    this.y = 60;
    this.h = 50;
    this.w = 55;
    this.speed = 25;

    this.node = document.createElement("img")
    this.node.src = "./images/mago.png"
    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute" // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }

  playerMovement(direction) {
    if (direction === "right") {
      if (this.x + this.w + this.speed <= 700) {
        this.x += this.speed
        this.node.style.left = `${this.x}px`
      }

    } else if (direction === "left") {
      if (this.x - this.speed >= 0) {
        this.x -= this.speed
        this.node.style.left = `${this.x}px`
      }

    } else if (direction === "down") {
      if (this.y + this.h + this.speed <= 450) {
        this.y += this.speed
        this.node.style.top = `${this.y}px`
      }

    } else if (direction === "up") {
      if (this.y - this.speed >= 0) {
        this.y -= this.speed
        this.node.style.top = `${this.y}px`
      }

    }
  }
}