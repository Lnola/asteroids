import Movement, { LinearMovement, RotationMovement } from '@/movement';
import { Player, Asteroid } from '@/objects';
import { DomHelpers, Stopwatch, Store, Time } from '@/shared/helpers';
import { MovementType } from '@/shared/models/movement';
import { BEST_TIME_ID, RESTART_BUTTON_ID } from '@/shared/models/dom';

export type GameOptions = {
  movement: {
    type: MovementType;
    speed: number;
    rotationSpeed: number;
    friction: number;
  };
  asteroids: {
    numberPerWave: number;
  };
};

class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player!: Player;
  movement: Movement;
  asteroids!: Asteroid[];
  stopwatch!: Stopwatch;
  bestTimeStore!: Store;
  asteroidsPerWave: number;

  constructor(options: GameOptions) {
    DomHelpers.setButtonIsDisabled(RESTART_BUTTON_ID, false);

    this.canvas = document.querySelector('canvas')!;
    this.context = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.createStopwatch();
    this.createPlayer();
    this.createAsteroids();
    this.createBestTimeStore();

    this.setBestTimeLabel();

    this.movement =
      options.movement.type === 'linear'
        ? new LinearMovement({ player: this.player, ...options.movement })
        : new RotationMovement({ player: this.player, ...options.movement });
    this.movement.listenForInputs();

    this.asteroidsPerWave = options.asteroids.numberPerWave;
  }

  render = () => {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  start() {
    this.animate(this);
    this.stopwatch.start();
  }

  animate(self: typeof this) {
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
    this.player = new Player({
      position: { x: this.canvas.width / 2, y: this.canvas.height / 2 },
      velocity: { x: 0, y: 0 },
      context: this.context,
    });
  }

  private createAsteroids() {
    const createAsteroid = () =>
      new Asteroid({
        context: this.context,
        bounds: this.bounds,
      });

    this.asteroids = Array.from(
      { length: this.asteroidsPerWave },
      createAsteroid,
    );
  }

  private createStopwatch() {
    this.stopwatch = new Stopwatch();
  }

  private createBestTimeStore() {
    this.bestTimeStore = new Store('BEST_TIME');
  }

  private get bounds() {
    return {
      maxX: this.canvas.width,
      minX: 0,
      maxY: this.canvas.height,
      minY: 0,
    };
  }

  private updateBestTime() {
    if (this.stopwatch.elapsedTime < this.bestTimeStore.value) return;
    this.bestTimeStore.setValue(this.stopwatch.elapsedTime);
  }

  private setBestTimeLabel() {
    const bestTime = new Time(
      this.bestTimeStore.value?.minutes ?? 0,
      this.bestTimeStore.value?.seconds ?? 0,
    );
    const displayBestTime = `Best time: ${bestTime.toString()}`;
    DomHelpers.setElementInnerHtml(BEST_TIME_ID, displayBestTime);
  }

  stop(animationId: number) {
    window.cancelAnimationFrame(animationId);
    this.stopwatch.stop();
    this.updateBestTime();
    DomHelpers.setButtonIsDisabled(RESTART_BUTTON_ID, false);
  }
}

export default Game;
