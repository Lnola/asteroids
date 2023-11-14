import Game from '@/game';
import { DomHelpers } from '@/shared/helpers';
import { defaultGameOptions } from '@/shared/models/game';

const startGame = () => {
  const options = defaultGameOptions;
  const game = new Game(options);
  game.start();
};

startGame();

DomHelpers.assignButtonClickMethod('restart', startGame);
