import { GameOptions } from '@/game';
import { Asteroid, Player } from '@/objects';
import { LinearMovement, RotationMovement } from '@/movement';
import { MovementType } from '@/shared/models/movement';
import { Bounds } from '@/shared/models/bounds';

class GameInitializationHelpers {
  static createPlayer(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    const position = { x: canvas.width / 2, y: canvas.height / 2 };
    const velocity = { x: 0, y: 0 };
    return new Player({ position, velocity, context });
  }

  static createMovement(options: GameOptions, player: Player) {
    const movementOptions = options.movement;
    return movementOptions.type === MovementType.LINEAR
      ? new LinearMovement({ player: player, ...movementOptions })
      : new RotationMovement({ player: player, ...movementOptions });
  }

  static createAsteroids(
    context: CanvasRenderingContext2D,
    bounds: Bounds,
    options: GameOptions,
  ) {
    const createAsteroid = () => {
      return new Asteroid({ context, bounds });
    };

    const { numberPerWave } = options.asteroids;
    return Array.from({ length: numberPerWave }, createAsteroid);
  }
}

export default GameInitializationHelpers;
