import { Vector } from '@/game';

export type IGameObject = {
  context: CanvasRenderingContext2D;
  position: Vector;
  velocity: Vector;
  rotation: number;
  size: number;
  color: string;
};

type GameObjectOptions = Pick<
  IGameObject,
  'context' | 'position' | 'velocity' | 'size' | 'color'
>;

abstract class GameObject implements IGameObject {
  context: CanvasRenderingContext2D;
  position: Vector;
  velocity: Vector;
  rotation: number;
  size: number;
  color: string;

  constructor({ context, position, velocity, size, color }: GameObjectOptions) {
    this.context = context;
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.color = color;
    this.rotation = 0;
  }

  move(_?: unknown) {
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

  drawRectangle() {
    this.context.fillStyle = this.color;
    const positionX = this.position.x - this.size / 2;
    const positionY = this.position.y - this.size / 2;
    this.context.fillRect(positionX, positionY, this.size, this.size);
  }

  drawTriangle() {}
}

export default GameObject;
