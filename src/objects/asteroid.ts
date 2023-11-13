import { Vector } from '@/main';
import { getRandomExcluding } from '@/helpers/get-random-excluding';
import { getVectorToRectangle } from '@/helpers/get-vector-to-rectangle';

const ASTEROID_SIZE = 50;

class Asteroid {
  // TODO: resolve this canvas
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  position: Vector;
  velocity: Vector;
  rotation: number;
  size = ASTEROID_SIZE;
  wasInBounds = false;

  constructor({ context, canvas }: Pick<Asteroid, 'context' | 'canvas'>) {
    this.context = context;
    this.canvas = canvas;
    this.position = {
      x: getRandomExcluding(
        -ASTEROID_SIZE,
        0,
        this.canvas.width,
        this.canvas.width + ASTEROID_SIZE,
      ),
      y: getRandomExcluding(
        -ASTEROID_SIZE,
        0,
        this.canvas.height,
        this.canvas.height + ASTEROID_SIZE,
      ),
    };

    this.velocity = getVectorToRectangle(
      this.position,
      this.canvas.width,
      this.canvas.height,
    );
    this.rotation = 0;
  }

  move() {
    this.render();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  shouldRemove() {
    const isOutOfBounds = this.isOutOfBounds(this.canvas);
    if (!isOutOfBounds && !this.wasInBounds) this.wasInBounds = true;
    return !isOutOfBounds || !this.wasInBounds;
  }

  private isOutOfBounds(canvas: HTMLCanvasElement) {
    return (
      this.position.x >= canvas.width ||
      this.position.x < 0 ||
      this.position.y >= canvas.height ||
      this.position.y < 0
    );
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
    this.context.fillStyle = 'grey';
    const positionX = this.position.x - this.size / 2;
    const positionY = this.position.y - this.size / 2;
    this.context.fillRect(positionX, positionY, this.size, this.size);
  }

  private drawTriangle() {}
}

export default Asteroid;
