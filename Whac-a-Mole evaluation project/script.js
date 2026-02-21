class HeaderView {
  constructor(headerModel) {
    this.headerMode = headerModel;

    this.score = document.querySelector(".current-score");
    this.beginBtn = document.querySelector(".begin-btn");

    this.renderScore();
  }
  renderScore() {
    this.score.textContent = this.headerMode.currentScore;
  }

  bindBtnHandler(handler) {
    this.beginBtn.addEventListener("click", handler);
  }
}

class HeaderModel {
  #currScore;
  constructor() {
    this.#currScore = 0;
  }

  set currentScore(value) {
    this.#currScore = value;
  }

  get currentScore() {
    return this.#currScore;
  }
}

class HeaderController {
  constructor(headerView, timerController, gameBoardController) {
    this.headerView = headerView;
    this.timerController = timerController;
    this.gameBoardController = gameBoardController;
    this.initEvents();
  }

  initEvents() {
    this.headerView.bindBtnHandler(() => this.startGame());
  }

  startGame() {
    this.timerController.startTimer();
    this.gameBoardController.moleStart();
  }
}

class GameBoardView {
  constructor(gameBoardModel) {
    this.boardElement = document.querySelector(".game-board");
    this.width = gameBoardModel.width;
    this.height = gameBoardModel.height;
    this.holeArr = gameBoardModel.holeArr;
    this.moleTimer = null;
    this.snakeTimer = null;

    this.initRender();
  }

  initRender() {
    this.boardElement.style["display"] = "grid";
    this.boardElement.style["grid-template-columns"] =
      `repeat(${this.width}, 1fr)`;
    this.boardElement.style["grid-template-rows"] =
      `repeat(${this.height}, 1fr)`;
    for (let i = 0; i < this.width * this.height; i++) {
      let holeElement = document.createElement("div");
      holeElement.classList.add("hole");
      holeElement.setAttribute("id", i);
      holeElement.innerHTML = `<img src="images/mole.jpeg" class="mole-img">`;
      this.boardElement.appendChild(holeElement);
    }
  }

  bindClickMole(handler) {
    this.boardElement.addEventListener("click", (e) => {
      const hole = e.target.closest(".hole");
      if (hole && hole.classList.contains("active")) {
        const id = parseInt(hole.id);
        handler(id);
      }
    });
  }

  boardRender() {
    this.holeArr.forEach((hole) => {
      let targetElement = document.getElementById(hole.id);
      if (hole.snakeShowUp) {
        this.showSnake(targetElement);
      } else if (hole.moleShowUp) {
        this.showMole(targetElement);
        targetElement.querySelector("img").src = "images/mole.jpeg";
      } else {
        this.hideAll(targetElement);
      }
    });
  }

  showMole(element) {
    element.classList.add("active");
  }

  showSnake(element) {
    const img = element.querySelector("img");
    if (img.src.indexOf("snake.jpeg") === -1) {
      img.src = "images/snake.jpeg";
      img.classList.add("mole-img");
    }
    element.classList.add("active");
  }

  hideAll(element) {
    element.classList.remove("active");
    element.querySelector("img").src = "images/mole.jpeg";
  }
}

class GameBoardModel {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.holeArr = Array.from(
      { length: this.width * this.height },
      (_, index) => ({
        id: index,
        moleShowUp: false,
        snakeShowUp: false,
        timer: null,
        eachSnakeTimer: null,
      }),
    );
  }
  gameBegin(onUpdate) {
    this.moleTimer = setInterval(() => {
      if (this.holeArr.filter((item) => item.moleShowUp).length < 3) {
        this.generateOneMole(onUpdate);
      }
    }, 1000);

    this.snakeTimer = setInterval(() => {
      if (this.holeArr.filter((item) => item.snakeShowUp).length < 1) {
        this.generateOneSnake(onUpdate);
      }
    }, 2000);
  }

  hideMole(id) {
    if (this.holeArr[id]) {
      this.holeArr[id].moleShowUp = false;
      this.holeArr[id].timer = null;
    }
  }

  hideSnake(id) {
    if (this.holeArr[id]) {
      this.holeArr[id].snakeShowUp = false;
      this.holeArr[id].eachSnakeTimer = null;
    }
  }

  generateOneMole(onUpdate) {
    let randomId;
    do {
      randomId = Math.floor(Math.random() * (this.width * this.height));
    } while (this.holeArr[randomId].moleShowUp);
    this.holeArr[randomId].moleShowUp = true;

    if (onUpdate) onUpdate();

    this.holeArr[randomId].timer = setTimeout(() => {
      this.hideMole(randomId);
    }, 2000);
  }

  generateOneSnake(onUpdate) {
    let randomSnakeId;
    do {
      randomSnakeId = Math.floor(Math.random() * (this.width * this.height));
    } while (this.holeArr[randomSnakeId].snakeShowUp);
    this.holeArr[randomSnakeId].snakeShowUp = true;

    if (onUpdate) onUpdate();

    this.holeArr[randomSnakeId].eachSnakeTimer = setTimeout(() => {
      this.hideSnake(randomSnakeId);
    }, 2000);
  }

  generateAllSnake(onUpdate) {
    this.holeArr.forEach((item) => {
      item.snakeShowUp = true;
      item.timer = null;
      item.eachSnakeTimer = null;
    });
    if (onUpdate) {
      onUpdate();
    }
  }

  clearAllMolesAndSnakes() {
    this.holeArr.forEach((hole) => {
      hole.moleShowUp = false;
      hole.snakeShowUp = false;
      hole.timer = null;
      hole.snakeTimer = null;
    });
  }

  clearGameBoard() {
    clearInterval(this.moleTimer);
    this.moleTimer = null;
    clearInterval(this.snakeTimer);
    this.snakeTimer = null;
    this.clearAllMolesAndSnakes();
  }
}

class GameBoardController {
  constructor(
    gameBoardModel,
    gameBoardView,
    timerModel,
    timerController,
    headerModel,
    headerView,
  ) {
    this.gameBoardModel = gameBoardModel;
    this.gameBoardView = gameBoardView;
    this.timerModel = timerModel;
    this.timerController = timerController;
    this.headerModel = headerModel;
    this.headerView = headerView;

    this.initEvents();
  }

  initEvents() {
    this.gameBoardView.bindClickMole((id) => {
      if (this.timerModel.isGameBegin) {
        if (this.gameBoardModel.holeArr[id].snakeShowUp) {
          this.gameBoardModel.generateAllSnake();
          setTimeout(() => {
            this.timerController.closeTimer();
          }, 1000);
        } else if (this.gameBoardModel.holeArr[id].moleShowUp) {
          this.gameBoardModel.hideMole(id);
          this.gameBoardView.boardRender();
          const newScore = this.headerModel.currentScore + 1;
          this.headerModel.currentScore = newScore;
          this.headerView.renderScore();
        }
      }
    });
  }

  moleStart() {
    this.gameBoardModel.gameBegin(() => {
      this.gameBoardView.boardRender();
    });
  }
}

class TimerView {
  constructor(timerModel) {
    this.timerModel = timerModel;
    this.timer = document.querySelector(".current-time");
  }

  timerRender() {
    const currentTime = this.timerModel.currentRemaining;
    this.timer.textContent = currentTime;
  }
}

class TimerModel {
  #currentRemaining;
  isGameBegin;
  constructor() {
    this.#currentRemaining = 30;
    this.isGameBegin = false;
  }
  set currentRemaining(value) {
    this.#currentRemaining = value;
  }

  get currentRemaining() {
    return this.#currentRemaining;
  }
}

class TimerController {
  constructor(
    timerModel,
    timerView,
    headerModel,
    headerView,
    gameBoardModel,
    gameBoardView,
  ) {
    this.timerModel = timerModel;
    this.timerView = timerView;

    this.headerModel = headerModel;
    this.headerView = headerView;

    this.gameBoardModel = gameBoardModel;
    this.gameBoardView = gameBoardView;

    this.gameTimer = null;

    this.timerView.timerRender();
  }

  startTimer() {
    this.timerModel.isGameBegin = true;
    this.timerModel.currentRemaining = 30;
    this.timerView.timerRender();
    this.headerModel.currentScore = 0;
    this.headerView.renderScore();
    this.gameTimer = setInterval(() => {
      let currentRemaining = this.timerModel.currentRemaining;
      currentRemaining--;
      this.timerModel.currentRemaining = currentRemaining;
      this.timerView.timerRender();

      if (currentRemaining <= 0) {
        this.closeTimer();
      }
    }, 1000);
  }

  closeTimer() {
    this.timerModel.isGameBegin = false;
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }

    setTimeout(() => {
      alert("Time is Over !");
      this.gameBoardModel.clearGameBoard();
      this.gameBoardView.boardRender();
      this.timerModel.currentRemaining = 30;
      this.timerView.timerRender();
      this.headerModel.currentScore = 0;
      this.headerView.renderScore();
    }, 500);
  }
}

const headerModel = new HeaderModel();
const headerView = new HeaderView(headerModel);

const timerModel = new TimerModel();
const timerView = new TimerView(timerModel);

const gameBoardModel = new GameBoardModel(4, 3);
const gameBoardView = new GameBoardView(gameBoardModel);

const timerController = new TimerController(
  timerModel,
  timerView,
  headerModel,
  headerView,
  gameBoardModel,
  gameBoardView,
);

const gameBoardController = new GameBoardController(
  gameBoardModel,
  gameBoardView,
  timerModel,
  timerController,
  headerModel,
  headerView,
);
const headerController = new HeaderController(
  headerView,
  timerController,
  gameBoardController,
);
