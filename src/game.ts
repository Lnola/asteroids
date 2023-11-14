import Movement, { LinearMovement, RotationMovement } from '@/movement';
import { Player, Asteroid } from '@/objects';
import {
  BestTimeHelper,
  DomHelpers,
  Stopwatch,
  Store,
  Time,
} from '@/shared/helpers';
import { defaultGameOptions } from '@/shared/models/game';
import { MovementType } from '@/shared/models/movement';
import { BEST_TIME_ID, RESTART_BUTTON_ID } from '@/shared/models/dom';

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

    this.options = options;

    this.createPlayer();
    this.createMovement();
    this.createAsteroids();

    this.stopwatch = new Stopwatch();
    this.bestTimeStore = new Store('BEST_TIME');

    this.setBestTimeLabel();
  }

  start() {
    this.animate(this);
    this.stopwatch.start();
  }

  stop(animationId: number) {
    window.cancelAnimationFrame(animationId);
    this.stopwatch.stop();
    BestTimeHelper.updateBestTime(this.bestTimeStore, this.stopwatch);
    DomHelpers.setButtonIsDisabled(RESTART_BUTTON_ID, false);
  }

  private render = () => {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  private animate(self: typeof this) {
    const animationId = window.requestAnimationFrame(() => self.animate(this));
    this.render();

    this.player.move(this.canvas);
    this.asteroids = this.asteroids.filter((asteroid) => {
      asteroid.move();
      if (asteroid.detectCollision(this.player)) this.stop(animationId);
      return asteroid.shouldRemove();
    });

    if (!this.asteroids.length) this.createAsteroids();

    this.movement.adjustVelocity();
    this.movement.adjustRotation();
  }

  private createPlayer() {
    const position = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    const velocity = { x: 0, y: 0 };
    this.player = new Player({ position, velocity, context: this.context });
  }

  private createMovement() {
    const movementOptions = this.options.movement;
    this.movement =
      movementOptions.type === MovementType.LINEAR
        ? new LinearMovement({ player: this.player, ...movementOptions })
        : new RotationMovement({ player: this.player, ...movementOptions });
  }

  private createAsteroids() {
    const createAsteroid = () => {
      const { context, bounds } = this;
      return new Asteroid({ context, bounds });
    };

    const { numberPerWave } = this.options.asteroids;
    this.asteroids = Array.from({ length: numberPerWave }, createAsteroid);
  }

  private setBestTimeLabel() {
    const bestTime = new Time(
      this.bestTimeStore.value?.minutes ?? 0,
      this.bestTimeStore.value?.seconds ?? 0,
    );
    const displayBestTime = `Best time: ${bestTime.toString()}`;
    DomHelpers.setElementInnerHtml(BEST_TIME_ID, displayBestTime);
  }

  private get bounds() {
    return {
      maxX: this.canvas.width,
      minX: 0,
      maxY: this.canvas.height,
      minY: 0,
    };
  }
}

export default Game;
