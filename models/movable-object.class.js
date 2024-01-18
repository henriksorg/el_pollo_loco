class MovableObject extends DrawableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  speed = Math.random() * 5;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  dead = false;
  aboveChicken = false;
  hitEnemie = false;
  imageIndex = 0;
  firstPass = true;


  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }


  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this.dead == true) {
      return true;
    } else {
      return this.y < 140;
    }
  }


  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  jumpOn(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y;
  }


  hit(energyLoss) {
    if (this.aboveChicken == false) {
      this.energy -= energyLoss;
      this.setLastHit();
    }
  }


  setLastHit(){
    if(this.energy > 0) {
      this.lastHit = new Date().getTime();
    }
    if (this.energy < 0) {
      this.energy = 0;
    } 
  }


  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; //Difference in s
    return timePassed < 0.3;
  }


  isDead() {
    return this.energy <= 0;
  }


  moveLeft() {
    this.x -= this.speed;
  }


  moveRight() {
    this.x += this.speed;
  }


  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    // this.firstPass == false
  }


  playAnimationOnce(images, interval) {
    let i = this.currentImage % images.length;
    let path = images[i];
    if (this.firstPass == true) {
      this.currentImage = 0;
    }
    this.img = this.imageCache[path];
    this.firstPass = false;
    
    if (i == images.length - 1) {
      this.stopInterval(interval);
    } else {
      this.currentImage++;
    }
  }


  stopInterval(interval) {
    clearInterval(interval);
  }


  resetCurrentImage() {
    if (this.firstPass == true) {
      this.currentImage == 0;
    }
  }


  jump(j) {
    this.speedY = j;
  }
}
