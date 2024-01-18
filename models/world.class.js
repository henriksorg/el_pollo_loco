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
  coinCollectedAudio = new Audio('../audio/coin-collected.wav');
  bottleCollectedAudio = new Audio('../audio/bottle_collected.wav');
  lastThrow = new Date().getTime();
  animationStarted = false;


  constructor(canvas, keyboard) {
    // this.gameLength = 3;
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


  setWorld() {
    //Übergabe aller variablen von world zu Character um diese dort zu nutzen
    this.character.world = this;
  }


  run() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 100);
  }


  check() {
    setInterval(() => {
      this.checkCollisions();
      this.checkXCharacter();
    }, 10);
  }

  
  checkXCharacter() {
    if (this.character.x >= 2000 && !this.animationStarted) {
      this.endboss.startAnimation = true;
      this.animationStarted = true;
    }
  }


  checkThrowObjects() {
    if (this.canThrowBottle()) {
      this.throwBottle();
      this.character.resetIdleTime();
    }
  }


  canThrowBottle(){
    return this.keyboard.UP && this.character.bottlesCollected > 0 && this.nextBottle()
  }


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


  nextBottle() {
    let timeDiffBottle = new Date().getTime() - this.lastThrow;
    timeDiffBottle = timeDiffBottle / 1000;
    return timeDiffBottle > 1;
  }


  checkCollisions() {
    this.enemiesColliding();
    this.collectableObjectsColliding();
  }


  enemiesColliding() {
    this.level.enemies.forEach((e) => {
      this.enemiesCollWithCharacter(e);
      this.enemiesCollWithBottle(e);
      this.jumpOnChicken(e);
    });
  }


  jumpOnChicken(e) {
    if (this.character.isAboveChicken(e)) {
      setTimeout(() => {
        this.character.aboveChicken = true;
      }, 70);
    }
    if (this.isCharacterAboveChicken(e)) {
      this.removeObjectFromMap(e, level1.enemies);
      this.character.jump(10)
    }
    if (this.isCharacterOnGroundAgain(e)) 
      this.character.aboveChicken = false;
  }


  isCharacterOnGroundAgain(e){
    return this.character.aboveChicken == true &&
      !this.character.isAboveChicken(e) &&
      !(e instanceof Endboss)
  }


  isCharacterAboveChicken(e){
    return this.character.aboveChicken == true && this.character.isColliding(e) && e instanceof Chicken
  }


  enemiesCollWithCharacter(e) {
    if (this.character.isColliding(e) && !this.character.isHurt()) {
      this.character.hit(20);
      this.healthStatus.setPercentage(this.character.energy);
    }
  }


  enemiesCollWithBottle(e) {
    if (this.bottleCollideWithEndboss(e)) {
      this.endbossLooseEnergy();
    }
  }

  
  endbossLooseEnergy(){
    this.bottle.hasHit = true;
      this.bottle.hitEnemie = true;
      this.endboss.hit(20);
      this.endbossStatus.setPercentage(this.endboss.energy);
  }


  bottleCollideWithEndboss(e) {
    return (
      this.bottle &&
      !this.bottle.hasHit &&
      this.bottle.isColliding(e) &&
      e instanceof Endboss
    );
  }


  stopBottle() {
    this.bottle.speedY = 0;
    this.bottle.speedX = 0;
  }


  collectableObjectsColliding() {
    this.level.collectableObjects.forEach((e) => {
      if (this.character.isColliding(e)) {
        if (e.constructor.name == 'Coin') {
          this.coinCollectedAudio.play();
          this.removeObjectFromMap(e, level1.collectableObjects);
          this.character.coinsCollected++;
          this.coinStatus.setImage(this.character.coinsCollected);
        }

        if (e.constructor.name == 'Bottle') {
          //   level1.collectableObjects.splice(e, 1);
          this.bottleCollectedAudio.play();
          this.removeObjectFromMap(e, level1.collectableObjects);
          this.character.bottlesCollected++;
          this.bottleStatus.setImage(this.character.bottlesCollected);
        }
      }
    });
  }


  removeObjectFromMap(e, object) {
    let index = -1;
    let val = e;
    let data = object;
    let filteredObj = data.find(function (item, i) {
      if (item === val) {
        index = i;
        return i;
      }
    });
    if (index == -1) {
      console.log('No Object found');
    } else {
      object.splice(index, 1);
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0); //Back
    // ------------ Space for fix Objects
    this.addToMap(this.healthStatus);
    this.addToMap(this.coinStatus);
    this.addToMap(this.bottleStatus);
    this.addToMap(this.endbossStatus);
    // Space end for fixed Objects -------------------
    this.ctx.translate(this.camera_x, 0); //Forward
    this.ctx.translate(-this.camera_x, 0);

    //Draw wird immer wieder aufgerufen
    this.callFunctionAgainAndAgain(this);
  }


  callFunctionAgainAndAgain(self){
    // let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
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
