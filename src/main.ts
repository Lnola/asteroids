import Game from '@/game';
import { DomHelpers } from '@/shared/helpers';
import { defaultGameOptions } from '@/shared/models/game';
import { RESTART_BUTTON_ID } from '@/shared/models/dom';

const startGame = () => {
  const options = defaultGameOptions;
  const game = new Game(options);
  game.start();
};

startGame();

DomHelpers.assignButtonClickMethod(RESTART_BUTTON_ID, startGame);
