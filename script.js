const dog = document.querySelector('.dog');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let score = document.querySelector('#score');
let playerScore = 0;
let scoreCounter = ()=>{
  playerScore++;
  score.innerHTML = `Score <b>${playerScore}</b>`;
}
interval = setInterval(scoreCounter,200);


function handleKeyDown(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 250) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dog.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dog.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  let cactus = document.createElement('div');
  let cactusPosition = 2000;
  let randomTime = Math.floor(Math.random() * 4000);

  if (isGameOver) return;
  
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      isGameOver = true;
      window.alert("Fim de Jogo!");
      document.location.reload();
     
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

window.createCactus();

document.addEventListener('keydown', handleKeyDown);