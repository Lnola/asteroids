import Game from '@/game';
import { defaultGameOptions } from '@/shared/models/game';

const startGame = () => {
  const options = defaultGameOptions;
  const game = new Game(options);
  game.start();
};

startGame();

const button = document.getElementById('restart') as HTMLButtonElement;
button.onclick = startGame;
