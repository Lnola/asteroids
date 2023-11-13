import { Vector } from '@/main';
import {
  getRandomVectorOnRectangleSide,
  getVelocityToRandomVector,
} from '@/helpers/asteroid';

export type Bounds = {
  maxX: number;
  minX: number;
  maxY: number;
  minY: number;
};

const ASTEROID_SIZE = 50;

class Asteroid {
  context: CanvasRenderingContext2D;
  position: Vector;
  velocity: Vector;
  rotation: number;
  size = ASTEROID_SIZE;
  bounds: Bounds;
  wasInBounds = false;

  constructor({ context, bounds }: Pick<Asteroid, 'context' | 'bounds'>) {
    this.context = context;
    this.bounds = bounds;
    this.position = getRandomVectorOnRectangleSide(this.bounds);
    this.velocity = getVelocityToRandomVector(this.position, this.bounds, 60);
    this.rotation = 0;
  }

  move() {
    this.render();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  shouldRemove() {
    if (!this.isOutOfBounds && !this.wasInBounds) this.wasInBounds = true;
    return !this.isOutOfBounds || !this.wasInBounds;
  }

  private get isOutOfBounds() {
    return !(
      this.position.x > this.bounds.minX &&
      this.position.x < this.bounds.maxX &&
      this.position.y > this.bounds.minY &&
      this.position.y < this.bounds.maxY
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
