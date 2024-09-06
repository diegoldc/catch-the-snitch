class Mago {

  constructor () {
    this.x = 70;
    this.y = 60;
    this.h = 70;
    this.w = 75;

    this.node = document.createElement("img")
    this.node.src = "./images/harry.png"
    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute" // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
}