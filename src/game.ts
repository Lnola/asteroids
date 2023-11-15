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
import { MOVEMENT_TYPE_ID, RESTART_BUTTON_ID } from '@/shared/models/dom';
import { Bounds } from '@/shared/models/bounds';

type GameMovementOptions = {
  speed: number;
  rotationSpeed: number;
  friction: number;
};

type GameAsteroidsOptions = {
  numberPerWave: number;
  secondsBetweenWaves: number;
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
  private wasWaveSpawned: boolean = true;

  constructor(options: GameOptions = defaultGameOptions) {
    DomHelpers.setElementIsDisabled(RESTART_BUTTON_ID, true);
    DomHelpers.setElementIsDisabled(MOVEMENT_TYPE_ID, true);

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

    const seconds = Math.round(this.stopwatch.elapsedTime.seconds);
    if (seconds % this.options.asteroids.secondsBetweenWaves === 0) {
      if (!this.wasWaveSpawned) {
        const newAsteroids = GameInitializationHelpers.createAsteroids(
          this.context,
          this.bounds,
          this.options,
        );
        this.asteroids = [...this.asteroids, ...newAsteroids];
        this.wasWaveSpawned = true;
      }
    } else this.wasWaveSpawned = false;

    this.movement.adjustVelocity();
    this.movement.adjustRotation();
  }

  stop(animationId: number) {
    window.cancelAnimationFrame(animationId);
    this.stopwatch.stop();
    new Audio('../audio/boom.mp3').play();
    BestTimeHelpers.updateBestTime(this.bestTimeStore, this.stopwatch);
    DomHelpers.setElementIsDisabled(RESTART_BUTTON_ID, false);
    DomHelpers.setElementIsDisabled(MOVEMENT_TYPE_ID, false);
  }
}

export default Game;
