import Game from '@/game';
import { DomHelpers } from '@/shared/helpers';
import { defaultGameOptions } from '@/shared/models/game';
import { RESTART_BUTTON_ID } from '@/shared/models/dom';

// Function to start the game
const startGame = () => {
  const options = defaultGameOptions;
  const game = new Game(options);
  game.start();
};

// Initial call to start the game when the script loads
startGame();

// Assign the startGame function to the restart button's click event
DomHelpers.assignButtonClickMethod(RESTART_BUTTON_ID, startGame);
