import { GameOptions } from '@/game';
import { Asteroid, Player } from '@/objects';
import { LinearMovement, RotationMovement } from '@/movement';
import { DomHelpers } from '.';
import { MovementType } from '@/shared/models/movement';
import { Bounds } from '@/shared/models/bounds';
import { MOVEMENT_TYPE_ID } from '@/shared/models/dom';

class GameInitializationHelpers {
  // Creates a Player instance positioned at the center of the canvas.
  static createPlayer(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    const position = { x: canvas.width / 2, y: canvas.height / 2 };
    const velocity = { x: 0, y: 0 };
    return new Player({ position, velocity, context });
  }

  // Creates a Movement instance based on the game options and in DOM selected movement type.
  static createMovement(options: GameOptions, player: Player) {
    const movementOptions = options.movement;
    const movementType = DomHelpers.getElementValue(MOVEMENT_TYPE_ID);
    return movementType === MovementType.LINEAR
      ? new LinearMovement({ player: player, ...movementOptions })
      : new RotationMovement({ player: player, ...movementOptions });
  }

  // Generates a specified number of Asteroid instances.
  static createAsteroids(
    context: CanvasRenderingContext2D,
    bounds: Bounds,
    options: GameOptions,
  ) {
    const createAsteroid = () => new Asteroid({ context, bounds });
    const { numberPerWave } = options.asteroids;
    return Array.from({ length: numberPerWave }, createAsteroid);
  }
}

export default GameInitializationHelpers;
