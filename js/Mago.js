class Mago {

  constructor() {
    this.x = 70;
    this.y = 60;
    this.h = 50;
    this.w = 55;
    this.speed = 4;

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
    const gameBoxWidth = gameBoxNode.offsetWidth - 40 // Ancho del game-box en el CSS
    const gameBoxHeight = gameBoxNode.offsetHeight - 40 // Altura del game-box en el CSS

    if (direction === "right") {

      if (this.x + this.w + this.speed > gameBoxWidth) {
        this.x = gameBoxWidth - this.w; // Ajustar para que el borde del mago coincida con el borde del game-box
      } else {
        this.x += this.speed;
      }
      this.node.style.left = `${this.x}px`
    } else if (direction === "left") {
      // ajustar a 0 si la siguiente posición es menor a 0
      if (this.x - this.speed < 0) {
        this.x = 0;
      } else {
        this.x -= this.speed;
      }
      this.node.style.left = `${this.x}px`
    } else if (direction === "down") {

      if (this.y + this.h + this.speed > gameBoxHeight) {
        this.y = gameBoxHeight - this.h; // Ajustamos al borde inferior del game-box
      } else {
        this.y += this.speed;
      }
      this.node.style.top = `${this.y}px`
    } else if (direction === "up") {

      if (this.y - this.speed < 0) {
        this.y = 0;
      } else {
        this.y -= this.speed;
      }
      this.node.style.top = `${this.y}px`
    }
  }
}