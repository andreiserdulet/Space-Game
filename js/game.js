const BASE_UNIT = 25;
const MENIU = document.getElementById("meniu");
const START_GAME = document.getElementById("start-game");
const THE_GAME = document.getElementById("game");
const PLAYER_1 = document.getElementById("vehicle-1");
const PLAYER_2 = document.getElementById("vehicle-1");
const DISPLAY_GAME = document.getElementById("game");
const DISPLAY_STATS = document.getElementById("stats");
const vehicleDOMObject = document.getElementById("vehicle");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");
const error4 = document.getElementById("error4");
const movesConsumed = document.getElementById("movesConsumed");
const errorGameOver = document.getElementById("errorGameOver");
const distance = document.getElementById("distance");
const historyMovesElement = "historyMoves";
const elementPlanets = document.getElementById("visitedPlanets");
const winMessage = document.getElementById("winMessage");
const UP = document.getElementById("UP");
const DOWN = document.getElementById("DOWN");
const LEFT = document.getElementById("LEFT");
const RIGHT = document.getElementById("RIGHT");

let gameEnded = false;
let historyMoves = [];

const KEY_CODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  spacebar: 32,
};

let ARROW_KEYS = {
  38: UP,
  40: DOWN,
  37: LEFT,
  39: RIGHT,
};

let sun = {
  name: "star-sun",
  top: 175,
  top2: 275,
  left: 200,
  left2: 300,
};
// let obstacles = [
//     {
//         obstacle = '1',
//         top: 0,
//         left: 275,
//         top2: 100,
//         left2: 325,
//     },
//     {
//         obstacle = '2',
//     }
// ];
let planets = [
  {
    planetName: "earth",
    left: 200,
    top: 325,
    element: document.getElementById("earth"),
    visited: false,
  },
  {
    planetName: "mars",
    left: 375,
    top: 200,
    element: document.getElementById("mars"),
    visited: false,
  },
  {
    planetName: "venus",
    left: 275,
    top: 300,
    element: document.getElementById("venus"),
    visited: false,
  },
  {
    planetName: "mercury",
    left: 175,
    top: 275,
    element: document.getElementById("mercury"),
    visited: false,
  },
  {
    planetName: "jupiter",
    left: 75,
    top: 200,
    element: document.getElementById("jupiter"),
    visited: false,
  },
  {
    planetName: "saturn",
    left: 150,
    top: 50,
    element: document.getElementById("saturn"),
    visited: false,
  },
  {
    planetName: "pluto",
    left: 350,
    top: 400,
    element: document.getElementById("pluto"),
    visited: false,
  },
  {
    planetName: "neptune",
    left: 400,
    top: 125,
    element: document.getElementById("neptune"),
    visited: false,
  },
  {
    planetName: "uranus",
    left: 250,
    top: 25,
    element: document.getElementById("uranus"),
    visited: false,
  },
];

let vehicle = {
  left: 0,
  top: 0,
  moves: 0,
  limit: 100,
  score: 0,
  win: 9,
  incrementScore: function () {
    for (let i = 0; i < planets.length; i++) {
      if (
        this.top === planets[i].top &&
        this.left === planets[i].left &&
        planets[i].visited === false
      ) {
        planets[i].visited = true;
        planets[i].element.style.display = "none";
        return this.score++;
      }
    }
    return this.score;
  },
  incrementMoves: function () {
    if (this.moves === this.limit) {
      errorGameOver.style.display = "block";
      vehicleDOMObject.style.display = "none";
    } else {
      this.moves += 1;
    }
  },
};
function choicePlayer() {
  PLAYER_1.classList.toggle("Player1");
}
function choicePlayer() {
  PLAYER_1.classList.toggle("Player2");
}

function darkMode() {
  DISPLAY_GAME.classList.toggle("dark");
  DISPLAY_STATS.classList.toggle("dark");
}
function winMsg() {
  if (vehicle.score === vehicle.win) {
    winMessage.style.display = "block";
    vehicleDOMObject.style.display = "none";
    movesConsumed.style.display = "block";
    gameEnded = true;
  }
}

function throwError(errorSelector) {
  errorSelector.style.display = "block";
  errorSelector.classList = "animate__animated animate__flash";
  setTimeout(function () {
    errorSelector.style.display = "none";
    errorSelector.classList = "";
  }, 2000);
}

function displayHistory(key) {
  historyMoves.push(key);
  if (historyMoves.length >= 5) {
    historyMoves.shift();
  }
  document.getElementById(historyMovesElement).innerHTML = historyMoves.map(
    (hm) => ARROW_KEYS[hm].outerHTML
  );
}
function checkSun(vehicle, sun, dtop, dleft) {
  if (
    vehicle.top + dtop >= sun.top &&
    vehicle.top + dtop <= sun.top2 &&
    vehicle.left + dleft >= sun.left &&
    vehicle.left + dleft <= sun.left2
  ) {
    return true;
  } else {
    return false;
  }
}
document.addEventListener("click", function (ev) {
  MENIU.style.display = "none";
  THE_GAME.style.display = "block";
});
document.addEventListener("keyup", function (ev) {
  if (gameEnded) {
    return;
  }

  if (ev.keyCode === KEY_CODES.up) {
    if (vehicle.top === 0 || checkSun(vehicle, sun, -1, 0)) {
      //|| vehicle.top === sun.top
      throwError(error1);
    } else {
      vehicle.top -= BASE_UNIT;
      vehicleDOMObject.style.top = vehicle.top + "px";
      vehicle.incrementMoves();
      elementPlanets.innerHTML = vehicle.incrementScore();
      movesConsumed.innerHTML = vehicle.moves;
      distance.innerHTML = BASE_UNIT * vehicle.moves;
      displayHistory(ev.keyCode);
      vehicleDOMObject.classList = "vehicle rotate-to-top";
      winMsg();
    }
  } else if (ev.keyCode === KEY_CODES.down) {
    if (vehicle.top === 475 || checkSun(vehicle, sun, 1, 0)) {
      //|| vehicle.top === sun.top2
      throwError(error2);
    } else {
      vehicle.top += BASE_UNIT;
      vehicleDOMObject.style.top = vehicle.top + "px";
      vehicle.incrementMoves();
      elementPlanets.innerHTML = vehicle.incrementScore();
      movesConsumed.innerHTML = vehicle.moves;
      distance.innerHTML = BASE_UNIT * vehicle.moves;
      displayHistory(ev.keyCode);
      vehicleDOMObject.classList = "vehicle rotate-to-bottom";
      winMsg();
    }
  } else if (ev.keyCode === KEY_CODES.left) {
    if (vehicle.left === 0 || checkSun(vehicle, sun, 0, -1)) {
      // || vehicle.left === sun.left
      throwError(error3);
    } else {
      vehicle.left -= BASE_UNIT;
      vehicleDOMObject.style.left = vehicle.left + "px";
      vehicle.incrementMoves();
      elementPlanets.innerHTML = vehicle.incrementScore();
      movesConsumed.innerHTML = vehicle.moves;
      distance.innerHTML = BASE_UNIT * vehicle.moves;
      displayHistory(ev.keyCode);
      vehicleDOMObject.classList = "vehicle rotate-to-left";
      winMsg();
    }
  } else if (ev.keyCode === KEY_CODES.right) {
    if (vehicle.left === 475 || checkSun(vehicle, sun, 0, 1)) {
      // || vehicle.left === sun.left2
      throwError(error4);
    } else {
      vehicle.left += BASE_UNIT;
      vehicleDOMObject.style.left = vehicle.left + "px";
      vehicle.incrementMoves();
      elementPlanets.innerHTML = vehicle.incrementScore();
      movesConsumed.innerHTML = vehicle.moves;
      distance.innerHTML = BASE_UNIT * vehicle.moves;
      displayHistory(ev.keyCode);
      vehicleDOMObject.classList = "vehicle";
      winMsg();
    }
  }
});
