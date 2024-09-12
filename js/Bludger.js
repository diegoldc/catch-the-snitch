class Bludger {

  constructor() {
    this.x = gameBoxNode.offsetWidth
    this.y = 0
    this.h = 25
    this.w = 25
    this.speed = 4
    this.magoTopPosition = 0
    this.magoLeftPosition = 0

    this.node = document.createElement("img")
    this.node.src = "./images/bludger.png"
    this.node.id = "bludger-img"
    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }

  chase(magoObj) {
    this.magoTopPosition = magoObj.y
    this.magoLeftPosition = magoObj.x

    // if (this.magoTopPosition != this.y || this.magoLeftPosition != this.x) {
    if (this.magoTopPosition > this.y) {
      this.y += this.speed
    } else if (this.magoTopPosition < this.y) {
      this.y -= this.speed
    }
    this.node.style.top = `${this.y}px`


    if (this.magoLeftPosition > this.x) {
      this.x += this.speed
    } else {
      this.x -= this.speed
    }
    this.node.style.left = `${this.x}px`
  }

  // move() {
  //   this.node.style.top = `${this.y}px`
  //   this.node.style.left = `${this.x}px`
  // }

}
