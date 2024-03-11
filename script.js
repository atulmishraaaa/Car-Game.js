let score = document.querySelector(".score");
let startScreen = document.querySelector(".startScreen");
let gameArea = document.querySelector(".gameArea");

let player = {
  speed: 5,
  score: 0,
};

startScreen.addEventListener("click", start);

function start() {
  startScreen.classList.add("hide");
  player.start = true;

  // lets make a divider

  for (let x = 0; x <= 9; x++) {
    let divider = document.createElement("div");
    divider.className = "divider";
    divider.y = x * 120;
    divider.style.marginTop = divider.y + "px";
    gameArea.append(divider);
  }

  requestAnimationFrame(gamePlay);

  // lets make a car
  let car = document.createElement("div");
  car.innerHTML = "";
  car.className = "car";
  gameArea.append(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  
 
  // make enemy car

  for (let i = 0; i <= 2; i++) {
    let enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.y = (i + 1) * 150;
    enemy.style.top = enemy.y + " px";
    enemy.style.left = parseInt(Math.random() * 250) + "px";
    gameArea.append(enemy);
  }
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  moveLines();
  moveEnemy(car);
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y = player.y - player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y = player.y + player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 35) {
      player.x = player.x + player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";

    player.score++;
    score.innerText = "score: " + player.score;

    requestAnimationFrame(gamePlay);
  }
}

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(eventDetails) {
  eventDetails.preventDefault();

  let pressedKey = eventDetails.key;
  if (
    pressedKey === "ArrowUp" ||
    pressedKey === "ArrowDown" ||
    pressedKey === "ArrowLeft" ||
    pressedKey === "ArrowRight"
  ) {
    keys[pressedKey] = true;
  }
}
function keyRelease(eventDetails) {
  eventDetails.preventDefault();
  let releasedKey = eventDetails.key;
  if (
    releasedKey === "ArrowUp" ||
    releasedKey === "ArrowDown" ||
    releasedKey === "ArrowLeft" ||
    releasedKey === "ArrowRight"
  ) {
    keys[releasedKey] = false;
  }
}

// move the dividers

function moveLines() {
  const dividers = document.querySelectorAll(".divider");
  dividers.forEach((divider) => {
    if (divider.y >= 200) {
      divider.y = divider.y - 200;
    }
    divider.y = divider.y + player.speed;
    divider.style.top = divider.y + "px";
  });
}

// move the enemies
function moveEnemy(car) {
  const enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    if (iscollide(car, enemy)) {
      endGame();
    }
    if (enemy.y >= 800) {
      enemy.y = enemy.y - 800;
      enemy.style.left = parseInt(Math.random() * 250) + "px";
    }
    enemy.y = enemy.y + player.speed;
    enemy.style.top = enemy.y + "px";
  });
}

// when collide

function iscollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  let collideCodition =
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right;
  return !collideCodition;
}
function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  
  startScreen.innerHTML ="<b>Oops! Game Over</b>" 

  startScreen.addEventListener('click', restart);
  function restart(){
   window.location.reload();
  }

}
