class Voldemort {
  constructor(positionY, type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = positionY;
    this.w = 50;
    this.h = 50;
    this.speed = 2
    this.detectado = false 
    
    this.node = document.createElement("img")
    
    if (type === "voldemort") {
      this.node.src = "./images/voldemort.png"
    }
    

    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

  }

  automaticMove() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`;

  }

}