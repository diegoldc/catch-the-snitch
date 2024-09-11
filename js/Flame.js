class Flame {

  constructor(positionX, positionY, direction) {
    this.x = positionX;
    this.y = positionY;
    this.w = 60;
    this.h = 55;

    this.speed = 10;
    this.direction = direction;

    this.node = document.createElement('img')
    this.node.src = "./images/blue-flame.png"

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    // Posicionamiento absoluto del hechizo
    this.node.style.position = 'absolute';
    this.node.style.left = `${this.x}px`; // Posición en X del hechizo
    this.node.style.top = `${this.y}px`;

    gameBoxNode.append(this.node)
  }

  move() {
    if (this.direction === 'up') {
      this.y -= this.speed;
    } else if (this.direction === 'down') {
      this.y += this.speed;
    } else if (this.direction === 'left') {
      this.x -= this.speed;
    } else if (this.direction === 'right') {
      this.x += this.speed;
    }

    // Actualizar la posición en el DOM
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

}