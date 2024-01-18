function addEvents() {
  document.getElementById('start').addEventListener('click', init);
  document.getElementById('steering').addEventListener('click', openSteering);
  document.getElementById('history').addEventListener('click', openHistory);
  document.getElementById('info-container').addEventListener('click', closeInfo);
}


function openHistory() {
openInfo();
  document.getElementById('info').innerHTML = /*html*/ `
    <div>
      <p>
      In the dusty desert of Mexico, Pepe Pelligroso, a brave adventurer with a fondness for spicy salsa, wandered. 
      One day, he encountered a flock of wild, yet small chickens. Skillfully, Pepe leaped at them to defeat them, 
      but then the real problem appeared: A gigantic chicken, as big as a multi-story house.
      </p>
        
      <p>
      Pepe knew that normal methods wouldn't work here. He turned to his collection of salsa sauces and began throwing them 
      one after another at the gigantic chicken. Each bottle that hit the chicken weakened it a bit more, 
      until it finally collapsed in a spectacular fireworks of feathers and salsa.
      </p>
        
      <p>
      Exhausted but triumphant, Pepe stood there, surrounded by the remnants of the epic battle, a hero who defeated a gigantic 
      chicken with salsa and courage. His story became a legend, an adventure that was told for
       a long time in the plains of Mexico.
      </p>
        
    </div>
    `;
}


function openInfo(){
document.getElementById('info-container').innerHTML = /*html*/ `
        <div class='info-bg d-flex justify-content-center align-items-center'>
            <div id='info' class='info'>
            </div>
        </div>
    `
}


function closeInfo() {
  document.getElementById('info-container').innerHTML = '';
}


function openSteering() {
  openInfo();
  document.getElementById('info').innerHTML = /*html*/ `
    <div>
      <div>
        <img class='steering-imgs steering-arrow' src='img/10_style/arrow_right.png' alt='right'>
        <span>Walk right</span>
      </div>
      <div>
        <img class='steering-imgs steering-arrow' src='img/10_style/arrow_left.png' alt='left'>
        <span>Walk left</span>
      </div>
      <div>
        <img class='steering-imgs steering-space' src='img/10_style/key_space.png' alt='jump'>
        <span>Jump</span>
      </div>
      <div>
        <img class='steering-imgs steering-arrow' src='img/10_style/arrow_up.png' alt='throw'>
        <span>Throw Bottle</span>
      </div>
    </div>
    `;
}


function endGame(path){
  setTimeout(() => {
    document.getElementById('start-screen').src = path;
    document.getElementById('start-screen').classList.remove('d-none');
    addReplayButton();
    setTimeout(() => {
      document.getElementById('start-screen').classList.add('fade-in');
      document.getElementById('replay-button').classList.add('fade-in');
    }, 20);
  }, 500);
  setTimeout(() => {
    clearAllIntervals();
  }, 1200);
  
}

  
function clearAllIntervals() {
  for (let i = 1; i < 999; i++) window.clearInterval(i);
}


function addReplayButton(){
  document.getElementById('info-container').removeEventListener('click', closeInfo);
  document.getElementById('info-container').innerHTML += /*html*/`
  <div class='replay-button-container'>
    <a href='index.html' class='replay-button' id='replay-button'>Replay</a>
  </div>
  `
}


addEvents();