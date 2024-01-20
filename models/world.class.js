class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  canvasLength = 720;
  healthStatus = new HealthStatus();
  coinStatus = new CoinStatus();
  bottleStatus = new BottleStatus();
  endbossStatus = new EndbossStatus();
  bottle;
  endboss = this.level.enemies[6];
  throwableObjects = [];
  coinCollectedAudio = new Audio('./audio/coin-collected.wav');
  bottleCollectedAudio = new Audio('./audio/bottle_collected.wav');
  lastThrow = new Date().getTime();
  animationStarted = false;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.check();
    this.character.animate();
    this.coinCollectedAudio.volume = 0.5;
    this.bottleCollectedAudio.volume = 0.25;
  }


  /**
   * Transfer of all variables from world
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * interval to check some actions in the world (which do not have to checked to often)
   * getting checked 10 times a second 
   */
  run() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
      this.checkXCharacter();
    }, 100);
  }


  /**
   * interval to check some actions in the world (which have to checked more often)
   * f.e. the colisions. For a better game experience.
   * f.e. Bottle have to crash exactly on a chicken 
   */
  check() {
    setStoppableInterval(() => {
      this.checkCollisions();
    }, 10);
  }


  /**
   * When the character has a certain x-cood., the final boss starts the animation
   */
  checkXCharacter() {
    if (this.character.x >= 2000 && !this.animationStarted) {
      this.endboss.startAnimation = true;
      this.animationStarted = true;
    }
  }

  /**
   * calling the function to throw bottles if its possible
   */
  checkThrowObjects() {
    if (this.canThrowBottle()) {
      this.throwBottle();
      this.character.resetIdleTime();
    }
  }

  /**
   * @returns if a bottle can be thrown
   */
  canThrowBottle(){
    return this.keyboard.UP && this.character.bottlesCollected > 0 && this.nextBottle()
  }


  /**
   * what happens if a bottle can be thrown. 
   */
  throwBottle(){
    this.lastThrow = new Date().getTime();
    this.character.bottlesCollected -= 1;
    this.bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.bottle.hasHit = false;
    this.throwableObjects.push(this.bottle);
    this.bottleStatus.setImage(this.character.bottlesCollected);
  }


  /**
   * limit the bottle-throwing
   * @returns if the next release of a bottle is possible (after 1s)
   */
  nextBottle() {
    let timeDiffBottle = new Date().getTime() - this.lastThrow;
    timeDiffBottle = timeDiffBottle / 1000;
    return timeDiffBottle > 1;
  }


  /**
  * checks all collisions on the map
  */
  checkCollisions() {
    this.enemiesColliding();
    this.collectableObjectsColliding();
  }


  /**
   * checks the collision from all enemies with the charcter and bottles
   */
  enemiesColliding() {
    this.level.enemies.forEach((e) => {
      this.enemiesCollWithCharacter(e);
      this.enemiesCollWithBottle(e);
      this.jumpOnChicken(e);
    });
  }


  /**
   * describes the collision on chicken from the top
   * @param {e} e is the chicken, the character is juping of 
   */
  jumpOnChicken(e) {
    if (this.character.isAboveChicken(e) && this.character.speedY < 0) {
        this.character.aboveChicken = true;
    }
    if (this.isCharacterAboveChicken(e) && !e.getHit) {
      this.character.jump(10)
      e.getHit = true;
    }
    if (this.isCharacterOnGroundAgain(e)) 
      this.character.aboveChicken = false;
  }


  /**
   * 
   * @param {object} e is the chicken, the character is juping of
   * @returns if the Character is jumping on a chicken
   */
  isCharacterAboveChicken(e){
    return !this.character.dead && this.character.aboveChicken == true && this.character.isColliding(e) && e instanceof Chicken
  }


  /**
   * 
   * @param {object} e is the chicken, the character was over 
   * @returns if the characte is not anymore above chicken
   */
  isCharacterOnGroundAgain(e){
    return this.character.aboveChicken == true &&
      !this.character.isAboveChicken(e) &&
      !(e instanceof Endboss)
  }


  /**
   * controls the hits from enemies to the character
   * @param {object} e is the enemie that is hitting the character
   * if the enemies are hitting the character, the character gets hurt and loosing 20% of his health.
   * the life is displayed on the health-statusbar
   */
  enemiesCollWithCharacter(e) {
    if (this.theCharacterGetsHit(e)) {
      this.character.hit(20);
      this.healthStatus.setPercentage(this.character.energy);
    }
  }


  theCharacterGetsHit(e){
    return this.character.isColliding(e) && !this.character.isHurt() && !e.getHit
  }


  /**
   * controls the collision from bottle to the enemies, f.e. chicken and endboss
   * @param {object} e 
   */
  enemiesCollWithBottle(e) {
    if (this.bottleCollideWithEndboss(e)) {
      this.endbossLooseEnergy();
    }
    if(this.bottleCollideWithChicken(e)){
      this.chickenDiesByBottle(e);
    }
  }

  
  endbossLooseEnergy(){
    this.bottle.hasHit = true;
    this.bottle.hitEnemie = true;
    this.endboss.hit(20);
    this.endbossStatus.setPercentage(this.endboss.energy);
  }


  chickenDiesByBottle(e){
    this.bottle.hitEnemie = true;
    e.getHit = true;
    this.bottle.hasHit = true;
  }


  /**
   * @param {object} e describes the object that is getting hit from the bottle 
   * @returns if the bottle hits the endboss
   */
  bottleCollideWithEndboss(e) {
    return (
      this.bottle &&
      !this.bottle.hasHit &&
      this.bottle.isColliding(e) &&
      e instanceof Endboss
    );
  }


  /**
   * @param {object} e describes the object that is getting hit from the bottle 
   * @returns if the bottle hits a chicken
   */
  bottleCollideWithChicken(e){
    return this.bottle && this.bottle.isColliding(e)&& !this.bottle.hasHit && e instanceof Chicken 
  }

  
  /**
   * stops the bottle, which is thrown
   */
  stopBottle() {
    this.bottle.speedY = 0;
    this.bottle.speedX = 0;
  }


  /**
   * checks the collision with character and all collectable objects. F.e. the bottles and the coins.
   */
  collectableObjectsColliding() {
    this.level.collectableObjects.forEach((e) => {
      if (this.character.isColliding(e)) {
        this.removeBottleFromMap(e);
        this.removeCoinFromMap(e);
      }
    });
  }


  /**
   * checks if the collectable object is a coin
   * remove the Coin that the character collect
   * @param {object} e describes the Bottle, that get removed
   */
  removeBottleFromMap(e){
    if (e instanceof Bottle) {
      this.bottleCollectedAudio.play();
      this.removeObjectFromMap(e, level1.collectableObjects);
      this.character.bottlesCollected++;
      this.bottleStatus.setImage(this.character.bottlesCollected);
    }
  }


  /**
   * checks if the collectable object is a bottle
   * remove the Coin that the character collect
   * @param {object} e describes the Coin, that get removed
   */
  removeCoinFromMap(e){
    if (e instanceof Coin) {
      this.coinCollectedAudio.play();
      this.removeObjectFromMap(e, level1.collectableObjects);
      this.character.coinsCollected++;
      this.coinStatus.setImage(this.character.coinsCollected);
    }
  }


  /**
   * with this function objects get removed from the canvas
   * @param {object} e is the object, that has to be removed from the map
   * @param {array} objects describes an array the object get spliced. If it get spliced from the array,
   * it get removed from map
   */
  removeObjectFromMap(e, objects) {
    let index = -1;
    let val = e;
    let data = objects;
    let filteredObj = data.find(function (item, i) {
      if (item === val) {
        index = i;
        return i;
      }
    });
    if (index == -1) {
      console.log('No Object found');
    } else {
      objects.splice(index, 1);
    }
  }


  /**
   * draw wird mit der letzten Funktion immer wieder aufgerufen (so schnell wie der PC Leistung hat)
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0); 
    this.addToMap(this.healthStatus);
    this.addToMap(this.coinStatus);
    this.addToMap(this.bottleStatus);
    this.addToMap(this.endbossStatus);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.callFunctionAgainAndAgain(this);
  }


  /**
   * loop this function as fast as possible
   * @param {this} self descripes 'this'
   */
  callFunctionAgainAndAgain(self){
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * adds an object to map. This object can be mirrored if the 'otherDirection' param is set
   * @param {object} mo is the movable object, that get added to the map
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }


  /**
   * All objects of an array get added to the canvas
   * @param {object} objects which have to be added to the canvas
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  


  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
