export class Player {
  static calcDifPosition(axis, { first, second }) {
    const firstPosition = Math.round(first.getBoundingClientRect()[axis]);
    const secondPosition = Math.round(second.getBoundingClientRect()[axis]);

    return firstPosition === secondPosition;
  }

  #player;
  #idInterval;
  #limitOfBoard;
  #sizeOfPlayer;
  #stepByPlayer = 10;

  #positionOfPlayer = {
    x: 0,
    y: 0,
  };

  constructor({ idPlayer, widthOfBoard, heightOfBoard }) {
    this.#player = document.querySelector(`#${idPlayer}`);
    this.#limitOfBoard = () => {
      const { width: widthPlayer, height: heightPlayer } =
        this.#player.getBoundingClientRect();

      const width = widthOfBoard - widthPlayer;
      const height = heightOfBoard - heightPlayer;

      return {
        limitOfX: width,
        limitOfY: height,
      };
    };
    this.tree = document.querySelector('.tree');
  }

  stopPlayer() {
    clearInterval(this.#idInterval);
  }

  moveRight() {
    clearInterval(this.#idInterval);

    this.#idInterval = setInterval(() => {
      const { limitOfX } = this.#limitOfBoard();
      const { x } = this.#positionOfPlayer;

      if (limitOfX <= x) {
        clearInterval(this.#idInterval);
        return;
      }

      this.movePlayer();
    }, 100);
  }
  moveLeft() {
    clearInterval(this.#idInterval);

    this.#idInterval = setInterval(() => {
      const { x } = this.#positionOfPlayer;

      if (0 >= x) {
        clearInterval(this.#idInterval);
        return;
      }

      this.movePlayer('minus');
    }, 100);
  }

  moveDown() {
    clearInterval(this.#idInterval);

    this.#idInterval = setInterval(() => {
      const { limitOfY } = this.#limitOfBoard();
      const { y } = this.#positionOfPlayer;

      if (limitOfY <= y) {
        clearInterval(this.#idInterval);
        return;
      }

      this.movePlayer('plus', 'y');
    }, 100);
  }

  moveTop() {
    clearInterval(this.#idInterval);

    this.#idInterval = setInterval(() => {
      const { y } = this.#positionOfPlayer;

      if (0 >= y) {
        clearInterval(this.#idInterval);
        return;
      }

      this.movePlayer('minus', 'y');
    }, 100);
  }

  movePlayer(direction = 'plus', axis = 'x') {
    this.checkTree();
    this.#positionOfPlayer[axis] =
      direction === 'plus'
        ? (this.#positionOfPlayer[axis] += this.#stepByPlayer)
        : (this.#positionOfPlayer[axis] -= this.#stepByPlayer);

    this.#player.style.transform = `translate(${this.#positionOfPlayer.x}px,${
      this.#positionOfPlayer.y
    }px)`;
  }

  checkTree() {
    const dataForCalc = { first: this.tree, second: this.#player };

    if (
      Player.calcDifPosition('x', dataForCalc) &&
      Player.calcDifPosition('y', dataForCalc)
    ) {
      this.stopPlayer();
      alert('TREE!!!!');
    }
  }
}
