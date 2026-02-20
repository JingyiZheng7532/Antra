class HeaderView {
  constructor() {
    this.scoreLine = document.querySelector(".score-line");
    this.beginBtn = document.querySelector(".begin-btn");
  }
  bindBtnHandler(handler) {
    console.log("bind");
    this.beginBtn.addEventListener("click", handler);
  }
}

class HeaderMode {
  #currScore;
  constructor() {}
}

class GameBoardView {
  constructor(width, height) {
    this.boardElement = document.querySelector(".game-board");
    this.width = width;
    this.height = height;
  }

  initRender() {
    let template = "";
    this.boardElement.style["display"] = "grid";
    this.boardElement.style["grid-template-columns"] =
      `repeat(${this.width}, 1fr)`;
    this.boardElement.style["grid-template-rows"] =
      `repeat(${this.height}, 1fr)`;
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        template += "<div>hi</div>";
      }
    }
    this.boardElement.innerHTML = template;
  }
}

const gameBoardView = new GameBoardView(4, 3);
gameBoardView.initRender();

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
  constructor() {
    this.#currentRemaining = 30;
  }
  set currentRemaining(value) {
    this.#currentRemaining = value;
  }

  get currentRemaining() {
    return this.#currentRemaining;
  }

  // begin() {
  //   const time = setInterval(() => {
  //     this.#currentRemaining--;

  //     if (this.remainingTime <= 0) {
  //       clearInterval(time);
  //     }
  //   }, 1000);
  // }
}

class TimerController {
  constructor(timerModel, timerView, headerView) {
    this.timerModel = timerModel;
    this.timerView = timerView;
    this.headerView = headerView;

    this.timerView.timerRender();

    this.initEvents();
  }

  initEvents() {
    this.headerView.bindBtnHandler(() => this.startGame());
  }

  startGame() {
    console.log("start");
    this.timerModel.currentRemaining = 30;
    this.timerView.timerRender();
    const time = setInterval(() => {
      let currentRemaining = this.timerModel.currentRemaining;
      currentRemaining--;
      this.timerModel.currentRemaining = currentRemaining;
      this.timerView.timerRender();

      if (currentRemaining <= 0) {
        clearInterval(time);
      }
    }, 1000);
  }
}

const headerView = new HeaderView();
const timerModel = new TimerModel();
const timerView = new TimerView(timerModel);
const timerController = new TimerController(timerModel, timerView, headerView);
