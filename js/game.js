let canvas;
let world;
let keyboard = new Keyboard();
let loadStartImage = 'img/9_intro_outro_screens/start/startscreen_1.png'; 
let background_audio = new Audio('../audio/background_music.mp3');
let allAudios;
let sound = true;
let messageAppeard = false;


function init() {
  initLevel();
  document.getElementById('insert-container').innerHTML = insertGame();
  removeStartScreen();
  canvas = document.getElementById('canvas');
  initializeSteering();
  initializeButtonsResponsive();
  document.getElementById('info-container').removeEventListener('click', closeInfo);
  setBackgroundMusic();
  world = new World(canvas, keyboard);
  screenRotation();
}


function setBackgroundMusic(){
  background_audio.volume = 0.5;
  background_audio.loop = true;
  background_audio.play();
}


function openHelp(){
  document.getElementById('info-container').innerHTML = openHelpTemplate();
}


function openHelpTemplate(){
  return /*html*/`
  <div class='open-help-container' onclick='closeHelp()'>
    <div class='open-help'>
        <div class='w-100 d-flex  justify-content-center'>
          <div class='d-flex flex-direction-column'>
            <div class='control-instruction w-100 d-flex'>
              <span>Steering</span>
              <span>Arrow left/right:  walk</span>
              <span>Arrow up:  throw bottle</span>
              <span>Space:  jump</span>
            </div>
            <div class='control-instruction w-100 d-flex justify-content-start'>
              <span class='no-wrap'>How to:</span>
              <div class='d-flex flex-direction-column how-to-container'>
                <div>Kill normal Chicken by jumping on it</div>
                <div>Kill Boss Chicken by throwing your bottles</div>
                <div>Tipp: Be careful! Don't waste your bottles!</div>
            </div>
          </div>
      </div>
    </div>

    </div>
  </div>
`
}


function closeHelp(){
  document.getElementById('info-container').innerHTML = '';
}


function removeStartScreen() {
  let startScreen = document.getElementById('start-screen');
  // Startet die Ausblend-Animation
  setTimeout(() => {
    startScreen.classList.add('fade-out');
  }, 10);
  // Entfernt das Startbild aus dem DOM, wenn die Animation beendet ist
  setTimeout(() => {
    startScreen.classList.add('d-none');
  }, 3100); // 2000 ms entspricht der Dauer der CSS-Transition
}


function insertGame(){
  return /*html*/ `
    <div class='game-container' id='game-container'>
        <canvas width='720' height='480' id='canvas'></canvas>
        <img src=${loadStartImage} id='start-screen' class='start-screen'>
    </div >
    <div id="settings" class="settings">
      <div class="mute-img-container">
        <img src="img/10_style/sound_on.png" alt="sound on" onclick="toggleSound()" class="mute-img"  id="mute-img">
      </div>
      <button id='responsive-directions' class='responsive-directions' onclick='openHelp()'>?</button>
    </div>
    <div id='responsiv-buttons'>
        <button id='btn-left' class='btn-responsive btn-right'><img src='img/10_style/walk_left.png' alt='walk-left'></button>
        <button id='btn-right' class='btn-responsive btn-left'><img src='img/10_style/walk_right.png' alt='walk-right'></button>
        <button id='btn-throw' class='btn-responsive btn-jump'><img src='img/10_style/jump.png' alt='jump'></button>
        <button id='btn-jump' class='btn-responsive btn-throw'><img src='img/10_style/throw_bottle.png' alt='throw-bottle'></button>
    </div>
  `;
}


function toggleSound(){
  if(sound){
    muteSound();
    document.getElementById('mute-img').src = 'img/10_style/sound_mute.png'
    sound = false;
  }else if(!sound){
    unMuteSound();
    document.getElementById('mute-img').src = 'img/10_style/sound_on.png'
    sound = true;
  }
}


function muteSound(){
  allAudiosToArray();
  allAudios.forEach(audio => {
    audio.muted = true;
  });
}


function unMuteSound(){
  allAudiosToArray();
  allAudios.forEach(audio => {
    audio.muted = false;
  });
}


function allAudiosToArray(){
  allAudios = [
    world.character.walking_sound, 
    world.character.hit_audio, 
    world.bottleCollectedAudio, 
    world.coinCollectedAudio, 
    background_audio, 
    world.character.jump_audio
  ];
}



function initializeSteering() {
  window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp' && !keyboard.UP) {
      keyboard.UP = true;
    } else if (e.key == 'ArrowDown' && !keyboard.DOWN) {
      keyboard.DOWN = true;
    } else if (e.key == 'ArrowLeft' && !keyboard.LEFT) {
      keyboard.LEFT = true;
    } else if (e.key == 'ArrowRight' && !keyboard.RIGHT) {
      keyboard.RIGHT = true;
    } else if (e.key == ' ' && !keyboard.SPACE) {
      keyboard.SPACE = true;
    } else if (e.key == 'd') {
      keyboard.D = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowUp') {
      keyboard.UP = false;
    } else if (e.key == 'ArrowDown') {
      keyboard.DOWN = false;
    } else if (e.key == 'ArrowLeft') {
      keyboard.LEFT = false;
    } else if (e.key == 'ArrowRight') {
      keyboard.RIGHT = false;
    } else if (e.key == ' ') {
      keyboard.SPACE = false;
    } else if (e.key == 'd') {
      keyboard.D = false;
    }
  });
}


function initializeButtonsResponsive() {
  document.getElementById('btn-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });


  document.getElementById('btn-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });


  document.getElementById('btn-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });


  document.getElementById('btn-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });


  document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById('btn-jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });


  document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });


  document.getElementById('btn-throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}


function screenRotation(){
  setInterval(() => {
    if(window.innerHeight  > window.innerWidth && !messageAppeard){
      document.getElementById('info-container').innerHTML = /*html*/`
        <div class="rotate-bg">
          <img src="img/10_style/rotate_phone.png" alt="rotate your phone" class="rotate-phone">
        </div>
      `
      messageAppeard = true;
    }else if(window.innerHeight  < window.innerWidth){
      messageAppeard = false;
      document.getElementById('info-container').innerHTML = '';
    }
  }, 1000);
}
