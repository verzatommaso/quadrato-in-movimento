// Selezioniamo gli elementi HTML che vogliamo controllare.
const square = document.querySelector("#square");
const stage = document.querySelector(".stage");
const statusText = document.querySelector("#status");

const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton");

let x = 0;
let y = 0;
let speedX = 3;
let speedY = 2;
let animationId = null;

function drawSquare() {
  square.style.transform = `translate(${x}px, ${y}px)`;
}

function moveSquare() {
  // Dimensioni dell'area e del quadrato: servono per non uscire dai bordi.
  const maxX = stage.clientWidth - square.offsetWidth;
  const maxY = stage.clientHeight - square.offsetHeight;

  x += speedX;
  y += speedY;

  // Quando tocchiamo un bordo, invertiamo la direzione.
  if (x <= 0 || x >= maxX) {
    speedX *= -1;
    x = Math.max(0, Math.min(x, maxX));
  }

  if (y <= 0 || y >= maxY) {
    speedY *= -1;
    y = Math.max(0, Math.min(y, maxY));
  }

  drawSquare();
  animationId = requestAnimationFrame(moveSquare);
}

function start() {
  if (animationId !== null) return;
  statusText.textContent = "Il quadrato è in movimento!";
  animationId = requestAnimationFrame(moveSquare);
}

function stop() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  statusText.textContent = "Movimento fermato.";
}

function reset() {
  stop();
  x = 0;
  y = 0;
  speedX = 3;
  speedY = 2;
  drawSquare();
  statusText.textContent = "Quadrato riportato alla posizione iniziale.";
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);

// Posizionamento iniziale.
drawSquare();
