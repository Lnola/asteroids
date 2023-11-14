import Game, { defaultOptions } from '@/game';

const startGame = () => {
  const options = defaultOptions;
  const game = new Game(options);
  game.start();
};

startGame();

const button = document.getElementById('restart') as HTMLButtonElement;
button.onclick = startGame;
