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

// Main Game class
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
    // Disable certain DOM elements initially
    DomHelpers.setElementIsDisabled(RESTART_BUTTON_ID, true);
    DomHelpers.setElementIsDisabled(MOVEMENT_TYPE_ID, true);

    // Canvas setup
    this.canvas = document.querySelector('canvas')!;
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth - 4;
    this.canvas.height = window.innerHeight - 4;

    // Game bounds based on canvas size
    this.bounds = {
      maxX: this.canvas.width,
      minX: 0,
      maxY: this.canvas.height,
      minY: 0,
    };

    // Setting game options and initializing game entities
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

    // Initializing stopwatch and best time store
    this.stopwatch = new Stopwatch();
    this.bestTimeStore = new Store('BEST_TIME');

    // Display the initial best time
    BestTimeHelpers.setBestTimeLabel(this.bestTimeStore);
  }

  // Starts the game by initiating the animation loop and starting the stopwatch
  start() {
    this.animate();
    this.stopwatch.start();
  }

  // Clears the canvas for the next frame
  private wipe = () => {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  // Main animation loop
  private animate() {
    const frameId = window.requestAnimationFrame(this.animate.bind(this));
    this.wipe();

    // Apply player move
    this.player.move(this.canvas);
    // Filter asteroids that return true to hasExitedBounds (don't render and move them after they are not visible)
    this.asteroids = this.asteroids.filter((asteroid) => {
      // Apply move to each asteroid
      asteroid.move();
      // Check if asteroid has collided with the player, if it has initiate stop
      if (asteroid.detectCollision(this.player)) this.stop(frameId);
      return asteroid.hasExitedBounds();
    });

    // Create more asteroids in waves. Waves appear every secondsBetweenWaves seconds
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

    // Adjust the player velocity and rotation
    this.movement.adjustVelocity();
    this.movement.adjustRotation();
  }

  // Stops the game loop and stopwatch, plays the sound and sets the DOM elements to not be disabled
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
