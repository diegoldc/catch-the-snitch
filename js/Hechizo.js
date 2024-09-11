
class Hechizo {

  constructor(positionX, positionY, direction) {
    this.x = positionX;
    this.y = positionY;
    this.w = 40;
    this.h = 35;


    this.speed = 10;
    this.direction = direction;

    this.node = document.createElement('img')
    this.node.src = "./images/hechizo.png"

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
  // Eliminar el hechizo del DOM
  // remove() {
  //   this.node.remove();
  // }

  //colisión con un enemigo
  checkCollisionWithEnemy(enemy) {
    return (
      this.x < enemy.x + enemy.w &&
      this.x + this.w > enemy.x &&
      this.y < enemy.y + enemy.h &&
      this.y + this.h > enemy.y
    );
  }
}