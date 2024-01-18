class Endboss extends MovableObject {
 
  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ]

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];
  height = 400;
  width = 300;
  y = 45;
  offset = {
    top: 160,
    left: 60,
    right: 40,
    bottom: 30,
  };
  timeStamp = 0;
  startAnimation = false;
  startedAnimation = false;
  dieOnce = true;


  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.x = 2500;
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.animate();
  }


  animate() {
    setInterval(() => {
      if (this.canStartAnimation()) {
        if (this.startAnimation == true){
          // wichtige Parameter, dass die Funktion richtig ausgeführt wird 
          this.setParametersForStartingAnimation();
        }
        if(this.canStartAlertAnimation()) {    
          this.playAnimation(this.IMAGES_ALERT);
        }
        if(this.canStartAttackAnimation()){
          this.playAnimation(this.IMAGES_ATTACK)
          this.jumpOnRightPicture();
        }
        if(this.canStartWalkingAnimation()){
          this.playAnimation(this.IMAGES_WALKING)
          this.x -= 20;
        }
        
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
      }
        if (this.isDead() && this.dieOnce) {
          this.dieOnce = false
          this.endbossDead();
          this.isDeadAnimation();
          endGame('img/9_intro_outro_screens/game_over/game over.png');
        }
        } 
    }, 150);
  }


  endbossDead(){
    this.firstPass = true
    this.currentImage = 0;
  }


  isDeadAnimation() {
    const deadInterval = setInterval(() => {
      this.playAnimationOnce(this.IMAGES_DEAD, deadInterval);
    }, 100);
  }


  jumpOnRightPicture(){
    if(this.img == this.imageCache['img/4_enemie_boss_chicken/3_attack/G18.png']){
        this.x -= 110;
    }
  }


  canStartAttackAnimation(){
    return this.calcTime() >= 6 && this.isnotHurtandDead();
  }


  canStartAlertAnimation(){
    return this.calcTime() < 3 && this.isnotHurtandDead();
  }


  canStartWalkingAnimation(){
    return this.calcTime() >= 3 && this.calcTime() < 6 && this.isnotHurtandDead();
  }


  setParametersForStartingAnimation(){
    this.timeStamp = Math.round(new Date().getTime()/ 1000)
    this.startAnimation = false;
    this.startedAnimation = true;
  }


  canStartAnimation(){
    // Wenn der Character eine bestimmte x-Koordinate überschritten hat wird startAnimation auf true gesetzt (der Endboss soll sich erst ab einem bestimmten Zeitpunkt bewegen)
    return this.startAnimation == true || this.startedAnimation == true;
  }


  isnotHurtandDead(){
    return !this.isHurt() && !this.isDead()
  }

  calcTime(){
    let setTime = Math.round(new Date().getTime()/ 1000);
    return -((this.timeStamp - setTime) % 10)
  }
}
