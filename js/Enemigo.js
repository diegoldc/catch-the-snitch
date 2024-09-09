class Enemigo {
  constructor(positionX, type) {
    this.x = positionX;
    this.y = 0;
    this.w = 50;
    this.h = 50;
    this.speed = 2

    this.node = document.createElement("img")
    // this.node.src = "./images/voldemort.png"

    if (type === "voldemort") {
      this.speed = 4
      this.node.src = "./images/voldemort.png";
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
}