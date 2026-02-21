class HeaderView {
  constructor() {
    this.score = document.querySelector(".current-score");
    this.beginBtn = document.querySelector(".begin-btn");
  }
  renderScore(currentScore) {
    this.score.textContent = currentScore;
  }
  bindBtnHandler(handler) {
    this.beginBtn.addEventListener("click", handler);
  }
}

class GameBoardView {
  constructor() {
    this.boardElement = document.querySelector(".game-board");
  }
  initRender(width, height) {
    this.boardElement.style["display"] = "grid";
    this.boardElement.style["grid-template-columns"] = `repeat(${width}, 1fr)`;
    this.boardElement.style["grid-template-rows"] = `repeat(${height}, 1fr)`;
    this.boardElement.innerHTML = "";
    for (let i = 0; i < width * height; i++) {
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
        handler(parseInt(hole.id));
      }
    });
  }
  boardRender(holeArr) {
    holeArr.forEach((hole) => {
      let targetElement = document.getElementById(hole.id);
      if (!targetElement) return;
      const img = targetElement.querySelector("img");
      if (hole.snakeShowUp) {
        img.src = "images/snake.jpeg";
        targetElement.classList.add("active");
      } else if (hole.moleShowUp) {
        img.src = "images/mole.jpeg";
        targetElement.classList.add("active");
      } else {
        targetElement.classList.remove("active");
        img.src = "images/mole.jpeg";
      }
    });
  }
}

class TimerView {
  constructor() {
    this.timer = document.querySelector(".current-time");
  }
  timerRender(currentRemaining) {
    this.timer.textContent = currentRemaining;
  }
}

class HeaderModel {
  constructor() {
    this.currentScore = 0;
  }
}

class TimerModel {
  constructor() {
    this.currentRemaining = 30;
    this.isGameBegin = false;
  }
}

class GameBoardModel {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.holeArr = Array.from({ length: width * height }, (_, i) => ({
      id: i,
      moleShowUp: false,
      snakeShowUp: false,
      timer: null,
    }));
    this.moleTimer = null;
    this.snakeTimer = null;
  }

  gameBegin(onUpdate) {
    this.clearGameBoard();
    this.moleTimer = setInterval(() => {
      if (this.holeArr.filter((h) => h.moleShowUp).length < 3) {
        this.generateOneMole(onUpdate);
      }
    }, 1000);
    this.snakeTimer = setInterval(() => {
      if (this.holeArr.filter((h) => h.snakeShowUp).length < 1) {
        this.generateOneSnake(onUpdate);
      }
    }, 2000);
  }

  hideMole(id) {
    if (this.holeArr[id]) {
      this.holeArr[id].moleShowUp = false;
      if (this.holeArr[id].timer) clearTimeout(this.holeArr[id].timer);
      this.holeArr[id].timer = null;
    }
  }

  generateOneMole(onUpdate) {
    const id = Math.floor(Math.random() * this.holeArr.length);
    const hole = this.holeArr[id];

    if (hole.timer) clearTimeout(hole.timer);

    hole.moleShowUp = true;
    hole.snakeShowUp = false;

    onUpdate();

    hole.timer = setTimeout(() => {
      this.hideMole(id);
      onUpdate();
    }, 2000);
  }

  generateOneSnake(onUpdate) {
    const id = Math.floor(Math.random() * this.holeArr.length);
    const hole = this.holeArr[id];

    if (hole.timer) clearTimeout(hole.timer);

    hole.snakeShowUp = true;
    hole.moleShowUp = false;

    onUpdate();

    hole.timer = setTimeout(() => {
      if (this.moleTimer) {
        hole.snakeShowUp = false;
        hole.timer = null;
        onUpdate();
      }
    }, 2000);
  }

  generateAllSnake(onUpdate) {
    this.holeArr.forEach((h) => {
      if (h.timer) clearTimeout(h.timer);
      h.moleShowUp = false;
      h.snakeShowUp = true;
    });
    if (onUpdate) onUpdate();
  }

  clearGameBoard() {
    clearInterval(this.moleTimer);
    this.moleTimer = null;
    clearInterval(this.snakeTimer);
    this.snakeTimer = null;
    this.holeArr.forEach((h) => {
      h.moleShowUp = false;
      h.snakeShowUp = false;
      if (h.timer) clearTimeout(h.timer);
      h.timer = null;
    });
  }
}

class HeaderController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.onStartBtnClick = null;
    this.view.bindBtnHandler(() => {
      if (this.onStartBtnClick) this.onStartBtnClick();
    });
  }
  updateScore(newScore) {
    this.model.currentScore = newScore;
    this.view.renderScore(newScore);
  }
}

class GameBoardController {
  constructor(model, view, timerModel) {
    this.model = model;
    this.view = view;
    this.timerModel = timerModel;
    this.onScoreGain = null;
    this.onHitSnake = null;
    this.view.initRender(this.model.width, this.model.height);
    this.initEvents();
  }
  initEvents() {
    this.view.bindClickMole((id) => {
      if (this.timerModel.isGameBegin) {
        const hole = this.model.holeArr[id];
        if (hole.snakeShowUp) {
          if (this.onHitSnake) this.onHitSnake();
        } else if (hole.moleShowUp) {
          this.model.hideMole(id);
          this.view.boardRender(this.model.holeArr);
          if (this.onScoreGain) this.onScoreGain();
        }
      }
    });
  }
  moleStart() {
    this.model.gameBegin(() => {
      this.view.boardRender(this.model.holeArr);
    });
  }
}

class TimerController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onTimeUp = null;
    this.gameTimer = null;
  }
  startTimer() {
    this.stopTimer();
    this.model.isGameBegin = true;
    this.model.currentRemaining = 30;
    this.view.timerRender(this.model.currentRemaining);
    this.gameTimer = setInterval(() => {
      this.model.currentRemaining--;
      this.view.timerRender(this.model.currentRemaining);
      if (this.model.currentRemaining <= 0) {
        this.stopTimer();
        if (this.onTimeUp) this.onTimeUp();
      }
    }, 1000);
  }
  stopTimer() {
    this.model.isGameBegin = false;
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }
}

class MainController {
  constructor() {
    this.headerModel = new HeaderModel();
    this.timerModel = new TimerModel();
    this.gameBoardModel = new GameBoardModel(4, 3);

    this.headerView = new HeaderView();
    this.timerView = new TimerView();
    this.gameBoardView = new GameBoardView();

    this.headerController = new HeaderController(
      this.headerView,
      this.headerModel,
    );
    this.timerController = new TimerController(this.timerModel, this.timerView);
    this.gameBoardController = new GameBoardController(
      this.gameBoardModel,
      this.gameBoardView,
      this.timerModel,
    );

    this.setupInteractions();
  }

  setupInteractions() {
    this.headerController.onStartBtnClick = () => {
      this.gameBoardModel.clearGameBoard();
      this.gameBoardView.boardRender(this.gameBoardModel.holeArr);

      this.headerController.updateScore(0);
      this.timerController.startTimer();
      this.gameBoardController.moleStart();
    };

    this.gameBoardController.onScoreGain = () => {
      this.headerController.updateScore(this.headerModel.currentScore + 1);
    };

    this.gameBoardController.onHitSnake = () => {
      this.timerController.stopTimer();
      this.gameBoardModel.clearGameBoard();

      this.gameBoardModel.generateAllSnake(() => {
        this.gameBoardView.boardRender(this.gameBoardModel.holeArr);
      });
    };

    this.timerController.onTimeUp = () => {
      this.gameBoardModel.clearGameBoard();
      this.gameBoardView.boardRender(this.gameBoardModel.holeArr);

      setTimeout(() => {
        alert("Time is Over !");
      }, 100);
    };
  }
}

const app = new MainController();
