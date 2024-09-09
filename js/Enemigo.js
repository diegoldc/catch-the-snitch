class Enemigo {
  constructor(positionX) {
    this.x = positionX;
    this.y = 0;
    this.w = 50;
    this.h = 40;
    this.speed = 2

    this.node = document.createElement("img")
    this.node.src = "./images/voldemort.png"
    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute"; 
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  automaticMove() {
    this.y += this.speed
    this.node.style.top = `${this.y}px`;
  }
}