let intervalIds = [];

/**
 * events für die Bilder auf dem Startbildschirm
 */
function addEvents() {
  document.getElementById('start').addEventListener('click', init);
  document.getElementById('steering').addEventListener('click', openSteering);
  document.getElementById('history').addEventListener('click', openHistory);
  document.getElementById('info-container').addEventListener('click', closeInfo);
}


/**
 * with this function you can start an interval, that you want to stop
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


/**
 * function to stop all stoppable Interval 
 */
function stopAllIntervals() {
  intervalIds.forEach(i => {
    clearInterval(i)
  });
}


/**
 * opens the history behind the game
 */
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


/**
 * shows game instructions of the game
 */
function openInfo() {
  document.getElementById('info-container').innerHTML = /*html*/ `
        <div class='info-bg d-flex justify-content-center align-items-center'>
            <div id='info' class='info'>
            </div>
        </div>
    `
}



/**
 * open the game instructions
 */
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


/**
 * end the game:
 * display end screen
 * stop all running intervals 
 * @param {string} path for the end-screen image
 */
function endGame(path) {
  endScreenFadeIn(path);
  document.getElementById('start-screen').addEventListener('transitionend', addReplayButton)
  stopAllIntervals();
}


/**
 * let the end screen fade in
 */
function endScreenFadeIn(path) {
  document.getElementById('start-screen').src = path;
  document.getElementById('start-screen').classList.remove('d-none');
  setTimeout(() => {
    document.getElementById('start-screen').classList.add('fade-in');
  }, 20);  
}


function addReplayButton() {
  document.getElementById('replay-container').innerHTML += /*html*/`
  <div class='replay-button-container'>
    <a href='index.html' class='replay-button fade-out' id='replay-button'>Replay</a>
  </div>
  `
}


/**
 * close the extra info by clicking on it
 */
function closeInfo() {
  document.getElementById('info-container').innerHTML = '';
}


addEvents();