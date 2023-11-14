import Movement, { LinearMovement, RotationMovement } from '@/movement';
import Player from '@/objects/player';
import Asteroid from '@/objects/asteroid';
import Stopwatch from '@/helpers/stopwatch';
import Store from '@/helpers/store';
import Time from '@/helpers/time';

const SPEED = 3;
const ROTATION_SPEED = 0.05;
const FRICTION = 0.97;
const ASTEROIDS_PER_WAVE = 5;

const BEST_TIME_KEY = 'BEST_TIME';

export type Vector = { x: number; y: number };

type MovementType = 'linear' | 'rotation';

type Options = {
  movement: {
    type: MovementType;
    speed: number;
    rotationSpeed: number;
    friction: number;
  };
};

const defaultOptions: Options = {
  movement: {
    type: 'rotation',
    speed: SPEED,
    rotationSpeed: ROTATION_SPEED,
    friction: FRICTION,
  },
};

class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player!: Player;
  movement: Movement;
  asteroids!: Asteroid[];
  stopwatch!: Stopwatch;
  bestTimeStore!: Store;

  constructor(options: Options) {
    this.setRestartButtonIsDisabled(true);

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
      if (asteroid.detectPlayerCollision(this.player)) this.stop(animationId);
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

    this.asteroids = Array.from({ length: ASTEROIDS_PER_WAVE }, createAsteroid);
  }

  private createStopwatch() {
    this.stopwatch = new Stopwatch();
  }

  private createBestTimeStore() {
    this.bestTimeStore = new Store(BEST_TIME_KEY);
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
    document.getElementById('best')!.innerHTML = displayBestTime;
  }

  stop(animationId: number) {
    window.cancelAnimationFrame(animationId);
    this.stopwatch.stop();
    this.updateBestTime();
    this.setRestartButtonIsDisabled(false);
  }

  private setRestartButtonIsDisabled(isDisabled: boolean) {
    const button = document.getElementById('restart') as HTMLButtonElement;
    button.disabled = isDisabled;
  }
}

const startGame = () => {
  const options = defaultOptions;
  const game = new Game(options);
  game.start();
};

startGame();

const button = document.getElementById('restart') as HTMLButtonElement;
button.onclick = startGame;
