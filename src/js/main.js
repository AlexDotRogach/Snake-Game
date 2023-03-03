import { Player } from '../js/Player';
import { refs } from '../js/refs';

const { controllerRight, controllerLeft, controllerTop, controllerBottom } =
  refs.controllerBtns();
const { playground, stop } = refs;
const { width, height } = playground.getBoundingClientRect();
const dataForInstance = {
  idPlayer: 'player',
  widthOfBoard: width,
  heightOfBoard: height,
};

const game = new Player(dataForInstance);

const { moveRight, moveLeft, moveDown, moveTop } = game;

controllerRight.addEventListener('click', moveRight.bind(game));
controllerLeft.addEventListener('click', moveLeft.bind(game));
controllerBottom.addEventListener('click', moveDown.bind(game));
controllerTop.addEventListener('click', moveTop.bind(game));

stop.addEventListener('click', game.stopPlayer.bind(game));
