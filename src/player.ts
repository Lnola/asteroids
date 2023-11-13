import { Vector } from '@/main';

const PLAYER_SIZE = 30;

class Player {
  context: CanvasRenderingContext2D;
  position: Vector;
  velocity: Vector;
  rotation: number;
  size = PLAYER_SIZE;

  constructor({
    context,
    position,
    velocity,
  }: Pick<Player, 'context' | 'position' | 'velocity'>) {
    this.context = context;
    this.position = position;
    this.velocity = velocity;
    this.rotation = 0;
  }

  move() {
    this.render();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private render() {
    this.context.save();

    this.context.translate(this.position.x, this.position.y);
    this.context.rotate(this.rotation);
    this.context.translate(-this.position.x, -this.position.y);

    this.drawRectangle();
    this.drawTriangle();

    this.context.restore();
  }

  private drawRectangle() {
    this.context.fillStyle = 'red';
    const positionX = this.position.x - this.size / 2;
    const positionY = this.position.y - this.size / 2;
    this.context.fillRect(positionX, positionY, this.size, this.size);
  }

  private drawTriangle() {
    this.context.fillStyle = 'black';
    this.context.beginPath();
    const rectLeft = this.position.x - this.size / 2;
    const rectRight = this.position.x + this.size / 2;
    const rectTop = this.position.y - this.size / 2;
    const rectBottom = this.position.y + this.size / 2;
    this.context.moveTo(rectRight - 2, this.position.y);
    this.context.lineTo(rectLeft + 5, rectTop + 2);
    this.context.lineTo(rectLeft + 5, rectBottom - 2);
    this.context.closePath();
    this.context.fill();
  }
}

export default Player;
