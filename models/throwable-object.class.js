class ThrowableObject extends MovableObject {
  IMAGES_THROWING = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_SPLASHING = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    '',
  ];

  intervalBottle;
  bottleShatterAudio = new Audio('./audio/bottle_shatter.wav');
  hasHit = false;
  isShattered = false;
  offset = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  };


  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_THROWING);
    this.loadImages(this.IMAGES_SPLASHING);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.animate();
  }


  /**
   * all important functions to throw the bottle
   */
  throw() {
    this.applyGravity();
    this.setSpeed();
    this.throwBottle();
  }


  /**
   * set the parameters of the trajectory of the bottle
   */
  setSpeed(){
    this.speedY = 20;
    this.speedX = 6;
  }


  /**
   * stops the bottle at hitting sth.
   * The negativ speedY is for the 'splash-effect'
   */
  stopBottle() {
    this.speedX = 0;
    this.speedY = -1;
  }


  /**
   *  the bottle has to get a speed x for moving forward
   *  if tho bottle hits an enemie or the ground it has to stop
   */
  throwBottle(){
    setStoppableInterval(() => {
      this.x += this.speedX;
      if (this.y >= 365 || this.hitEnemie == true) 
        this.stopBottle();
    }, 25);
  }


  /**
   * animation of throwing the bottle or the crash of the bottle
   */
  animate() {
    this.intervalBottle = setInterval(() => {
      if (this.y >= 365 || this.hitEnemie == true) {
        this.playAnimationOnce(this.IMAGES_SPLASHING, this.intervalBottle);
        this.playBottleShatteredAudio()
      } else {
        this.playAnimation(this.IMAGES_THROWING);
      }
    }, 80);
  }

  
  playBottleShatteredAudio(){
    if (!audioMuted){
      this.bottleShatterAudio.play();
    }
  }
}
