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
  bottleShatterAudio = new Audio('../audio/bottle_shatter.wav');
  hasHit = false;

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


  throw() {
    this.applyGravity();
    this.setSpeed();
    this.throwBottle();
  }


  setSpeed(){
    this.speedY = 30;
    this.speedX = 10;
  }


  stopBottle() {
    this.speedX = 0;
    this.speedY = -1;
  }


  throwBottle(){
    setInterval(() => {
      this.x += this.speedX;
      if (this.y >= 365) 
        this.stopBottle();
      if (this.hitEnemie == true) 
        this.stopBottle();
    }, 25);
  }


  animate() {
    this.intervalBottle = setInterval(() => {
      if (this.y >= 365 || this.hitEnemie == true) {
        this.playAnimationOnce(this.IMAGES_SPLASHING, this.intervalBottle);
        this.bottleShatterAudio.play();
      } else {
        this.playAnimation(this.IMAGES_THROWING);
      }
    }, 80);
  }
}
