class Character extends MovableObject {
  //mit world kann auf alle Variablen von World zugegriffen werden(insbesondere Keyboard)
  world;
  height = 280;
  y = 150;
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  IMAGES_IDLE_SLEEP = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ]

  offset = {
    top: 120,
    left: 30,
    right: 30,
    bottom: 10,
  };
  intervalJump;
  walking_sound = new Audio('../audio/walking.mp3');
  hit_audio = new Audio('../audio/ouch.mp3');
  jump_audio = new Audio('../audio/jump.mp3');

  bottlesCollected = 0;
  coinsCollected = 0;
  speed = 10;
  walking = false;
  aboveChicken = false;
  idleTime = new Date().getTime();
  idlePlayed = false;

  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_SLEEP);
    this.applyGravity();
    this.animate();
    this.setAudioVolume();
  }

  setAudioVolume(){
    this.walking_sound.volume = 0.5;
    this.jump_audio.volume = 0.5;
  }

  animate() {
    setInterval(() => {
      this.moveCharacter()
    }, 40);

    setInterval(() => {
      this.animateCharacter()
    }, 130);
  }


  animateCharacter(){
    if (this.moveLeftOrRight()) {
      this.playWalkingSound();
      this.resetIdleTime();
      this.playAnimation(this.IMAGES_WALKING);
    }
    if(this.goToIdleOnce()){
      this.currentImage = 0;
      this.idleAnimation();
    }
    if(this.goToIdleSleep()){
      this.playAnimation(this.IMAGES_IDLE_SLEEP);
    }
    if (this.getHurt()) {
      this.resetIdleTime();
      this.playAnimation(this.IMAGES_HURT);
      this.playHitAudio();
    }
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.characterIsDead();
    }
  }


  goToIdleSleep(){

  }


  playHitAudio(){
    this.hit_audio.play()
  }


  moveLeftOrRight(){
    return this.world.keyboard.RIGHT && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()
  }


  goToIdleOnce(){
    return this.goToIdle() && !this.idlePlayed
  }


  getHurt(){
    return this.isHurt() && this.aboveChicken == false
  }


  idleAnimation() {
    const idleInterval = setInterval(() => {
      this.playAnimationOnce(this.IMAGES_IDLE, idleInterval);
      this.idlePlayed = true;
    }, 100);
  }


  resetIdleTime(){
    this.idleTime = new Date().getTime();
    this.idlePlayed = false;
  }


  goToIdle(){
    let idleDifference = (new Date().getTime() - this.idleTime) / 1000
    return idleDifference > 2
  }


  goToIdleSleep(){
    let idleDifference = (new Date().getTime() - this.idleTime) / 1000
    return idleDifference > 2.7
  }


  moveCharacter(){
      //WALK RIGHT
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.characterMoveRight()
      }
      //WALK LEFT
      if (this.world.keyboard.LEFT && this.x > 100) {
        this.characterMoveLeft();
      }
      //JUMP
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.resetIdleTime();
        this.characterJump()
        this.jumpAnimation();
        this.jump_audio.play();
      }
      this.world.camera_x = -this.x + 100;
  }


  playWalkingSound(){ 
    this.walking = true;
    this.walking_sound.play();
  }


  characterMoveRight(){
    this.moveRight();
    this.otherDirection = false;
    this.walking = true;
    
  }


  characterMoveLeft(){
    this.moveLeft();
    this.otherDirection = true;
    this.walking = true;
  }


  characterIsDead(){
    if (this.dead == false) {          
      this.dead = true;
      this.fallDown();
      endGame('img/9_intro_outro_screens/game_over/you lost.png');
    }
  }


  fallDown() {
    this.speedY = 5;
    this.acceleration = 5;
  }


  characterJump(){
    this.jump(21);
    this.firstPass = true
    this.currentImage = 0;
  }


  jumpAnimation() {
    const jumpInterval = setInterval(() => {
      this.playAnimationOnce(this.IMAGES_JUMPING, jumpInterval);
    }, 100);
  }


  isAboveChicken(mo) {
    return this.y + this.height - this.offset.bottom - 30 < mo.y + mo.offset.top;
  }

  
  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}