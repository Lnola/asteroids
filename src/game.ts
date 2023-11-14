import Movement from '@/movement';
import { Player, Asteroid } from '@/objects';
import {
  BestTimeHelpers,
  DomHelpers,
  GameInitializationHelpers,
  Stopwatch,
  Store,
} from '@/shared/helpers';
import { defaultGameOptions } from '@/shared/models/game';
import { MovementType } from '@/shared/models/movement';
import { RESTART_BUTTON_ID } from '@/shared/models/dom';
import { Bounds } from '@/shared/models/bounds';

type GameMovementOptions = {
  type: MovementType;
  speed: number;
  rotationSpeed: number;
  friction: number;
};

type GameAsteroidsOptions = {
  numberPerWave: number;
};

export type GameOptions = {
  movement: GameMovementOptions;
  asteroids: GameAsteroidsOptions;
};

class Game {
  private canvas: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private bounds!: Bounds;
  private options!: GameOptions;
  private player!: Player;
  private movement!: Movement;
  private asteroids!: Asteroid[];
  private stopwatch!: Stopwatch;
  private bestTimeStore!: Store;

  constructor(options: GameOptions = defaultGameOptions) {
    DomHelpers.setButtonIsDisabled(RESTART_BUTTON_ID, true);

    this.canvas = document.querySelector('canvas')!;
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.bounds = {
      maxX: this.canvas.width,
      minX: 0,
      maxY: this.canvas.height,
      minY: 0,
    };

    this.options = options;

    this.player = GameInitializationHelpers.createPlayer(
      this.canvas,
      this.context,
    );
    this.movement = GameInitializationHelpers.createMovement(
      this.options,
      this.player,
    );
    this.asteroids = GameInitializationHelpers.createAsteroids(
      this.context,
      this.bounds,
      this.options,
    );

    this.stopwatch = new Stopwatch();
    this.bestTimeStore = new Store('BEST_TIME');

    BestTimeHelpers.setBestTimeLabel(this.bestTimeStore);
  }

  start() {
    this.animate();
    this.stopwatch.start();
  }

  private wipe = () => {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  private animate() {
    const frameId = window.requestAnimationFrame(this.animate.bind(this));
    this.wipe();

    this.player.move(this.canvas);
    this.asteroids = this.asteroids.filter((asteroid) => {
      asteroid.move();
      if (asteroid.detectCollision(this.player)) this.stop(frameId);
      return asteroid.hasExitedBounds();
    });

    if (!this.asteroids.length)
      this.asteroids = GameInitializationHelpers.createAsteroids(
        this.context,
        this.bounds,
        this.options,
      );

    this.movement.adjustVelocity();
    this.movement.adjustRotation();
  }

  stop(animationId: number) {
    window.cancelAnimationFrame(animationId);
    this.stopwatch.stop();
    BestTimeHelpers.updateBestTime(this.bestTimeStore, this.stopwatch);
    DomHelpers.setButtonIsDisabled(RESTART_BUTTON_ID, false);
  }
}

export default Game;
