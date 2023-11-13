import Player from '@/player';
import Movement, { LinearMovement, RotationMovement } from '@/movement';

export type Vector = { x: number; y: number };

type MovementType = 'linear' | 'rotation';

type Constructor = {
  movementType?: MovementType;
};

class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  movement: Movement;

  constructor({ movementType = 'rotation' }: Constructor) {
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
      movementType === 'linear'
        ? new LinearMovement(this.player)
        : new RotationMovement(this.player);
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

const game = new Game({});
game.start();
