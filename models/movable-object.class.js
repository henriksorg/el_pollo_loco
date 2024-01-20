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
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * checks if a movable object is above the ground or not
   * @returns true if it is higher than the grounc
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this.dead == true) {
      return true;
    } else {
      return this.y < 140;
    }
  }


  /**
   * describes the collision parameters from two objects(left, right, top, bottom)
   * @param {object} mo means the colliding movable object
   * @returns if the character is colliding with chicken
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  /**
   * @param {integer} energyLoss describes the amount of health that needs to be deducted from the total health.
   */
  hit(energyLoss) {
    if (this.aboveChicken == false) {
      this.energy -= energyLoss;
      this.setLastHit();
    }
  }


  /**
   * checks the temporal distance of the hits 
   */
  setLastHit(){
    if(this.energy > 0) {
      this.lastHit = new Date().getTime();
    }
    if (this.energy < 0) {
      this.energy = 0;
    } 
  }


  /**
   * new Date ist in ms und muss in Sekunden umgewandelt werden
   * @returns die Zeit des letzten Hits nzw ob diese länger her ist als 0.3s
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000; 
    return timePassed < 0.3;
  }


  /**
   * @returns if health is gone
   */
  isDead() {
    return this.energy <= 0;
  }


  /**
   * Funktion um etwas nach rechts zu bewegen
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * Funktion um etwas nach rechts zu bewegen
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * plays a series of images againa and again. this is getting to an animation
   * @param {string} images are the sources of the images, that get played repeatadly
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * @param {string} images are sources of images, that get played once 
   * @param {*} interval that have to be stopped after playing
   */
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


  /**
   * @param {integer} interval is the number of the interval that get stopped
   */
  stopInterval(interval) {
    clearInterval(interval);
  }


  /**
   * For playAnimation or playAnimationOnce, an animation is executed. 
   * If you want to reset the currently displayed image, this function can be used
   */
  resetCurrentImage() {
    if (this.firstPass == true) {
      this.currentImage == 0;
    }
  }

  /**
   * 
   * @param {integer} j is the velocity that is set for the vertical movement 
   */
  jump(j) {
    this.speedY = j;
  }
}
