class HeaderView {
  constructor(headerModel) {
    this.headerMode = headerModel;

    this.score = document.querySelector(".current-score");
    this.beginBtn = document.querySelector(".begin-btn");

    this.renderScore();
  }
  renderScore() {
    console.log(this.headerMode.currentScore);
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

  showUpMole() {
    console.log("showUpMole");
    this.holeArr.forEach((element) => {
      let targetElement = document.getElementById(element.id);
      if (element.showUp) {
        targetElement.classList.add("active");
      } else {
        targetElement.classList.remove("active");
      }
    });
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
        showUp: false,
      }),
    );
  }
  gameBegin(onUpdate) {
    console.log("gameBegin");
    const createMoles = setInterval(() => {
      let randomId = Math.floor(Math.random() * (this.width * this.height));
      if (this.holeArr.every((h) => h.showUp))
        return clearInterval(createMoles);
      while (this.holeArr[randomId].showUp) {
        randomId = Math.floor(Math.random() * (this.width * this.height));
      }

      this.holeArr[randomId].showUp = true;

      if (onUpdate) onUpdate();

      if (this.holeArr.filter((item) => item.showUp).length >= 3) {
        clearInterval(createMoles);
      }
    }, 1000);
  }

  hitMole(id) {
    if (this.holeArr[id]) {
      this.holeArr[id].showUp = false;
    }
  }

  generateOneMole() {
    let randomId;
    do {
      randomId = Math.floor(Math.random() * (this.width * this.height));
    } while (this.holeArr[randomId].showUp);

    this.holeArr[randomId].showUp = true;
    return randomId;
  }
}

class GameBoardController {
  constructor(
    gameBoardModel,
    gameBoardView,
    timerModel,
    headerModel,
    headerView,
  ) {
    this.gameBoardModel = gameBoardModel;
    this.gameBoardView = gameBoardView;
    this.timerModel = timerModel;
    this.headerModel = headerModel;
    this.headerView = headerView;

    this.initEvents();
  }

  initEvents() {
    this.gameBoardView.bindClickMole((id) => {
      if (this.timerModel.isGameBegin) {
        this.gameBoardModel.hitMole(id);
        this.gameBoardModel.generateOneMole();
        this.gameBoardView.showUpMole();
        const newScore = this.headerModel.currentScore + 1;
        this.headerModel.currentScore = newScore;
        this.headerView.renderScore();
      }
    });
  }

  moleStart() {
    console.log("moleStart");
    this.gameBoardModel.gameBegin(() => {
      this.gameBoardView.showUpMole();
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
  constructor(timerModel, timerView, headerModel, headerView) {
    this.timerModel = timerModel;
    this.timerView = timerView;

    this.headerModel = headerModel;
    this.headerView = headerView;

    this.timerView.timerRender();
  }

  startTimer() {
    this.timerModel.isGameBegin = true;
    this.timerModel.currentRemaining = 30;
    this.timerView.timerRender();
    this.headerModel.currentScore = 0;
    this.headerView.renderScore();
    const time = setInterval(() => {
      let currentRemaining = this.timerModel.currentRemaining;
      currentRemaining--;
      this.timerModel.currentRemaining = currentRemaining;
      this.timerView.timerRender();

      if (currentRemaining <= 0) {
        this.timerModel.isGameBegin = false;
        clearInterval(time);
      }
    }, 1000);
  }
}

const headerModel = new HeaderModel();
const headerView = new HeaderView(headerModel);

const timerModel = new TimerModel();
const timerView = new TimerView(timerModel);

const gameBoardModel = new GameBoardModel(4, 3);
const gameBoardView = new GameBoardView(gameBoardModel);
const gameBoardController = new GameBoardController(
  gameBoardModel,
  gameBoardView,
  timerModel,
  headerModel,
  headerView,
);

const timerController = new TimerController(
  timerModel,
  timerView,
  headerModel,
  headerView,
);
const headerController = new HeaderController(
  headerView,
  timerController,
  gameBoardController,
);
