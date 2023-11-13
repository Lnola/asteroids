import Player from '@/player';
import Movement, { LinearMovement, RotationMovement } from '@/movement';

const SPEED = 3;
const ROTATION_SPEED = 0.05;
const FRICTION = 0.97;

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
  player: Player;
  movement: Movement;

  constructor(options: Options = defaultOptions) {
    this.canvas = document.querySelector('canvas')!;
    this.context = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player({
      position: { x: this.canvas.width / 2, y: this.canvas.height / 2 },
      velocity: { x: 0, y: 0 },
      context: this.context,
    });

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
  }

  animate(self: typeof this) {
    window.requestAnimationFrame(() => self.animate(this));
    this.render();

    this.player.move();

    this.movement.adjustVelocity();
    this.movement.adjustRotation();
  }
}

const game = new Game();
game.start();
