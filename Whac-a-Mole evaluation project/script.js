class GameBoardView {
  constructor(width, height) {
    this.boardElement = document.querySelector(".game-board");
    console.log(this.boardElement);
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
