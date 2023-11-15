import { Vector } from '@/shared/models/vector';

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

// Abstract class representing a generic object in the game.
abstract class GameObject implements IGameObject {
  context: CanvasRenderingContext2D; // The canvas rendering context
  position: Vector; // The object's position in the game world
  velocity: Vector; // The object's velocity
  rotation: number; // The object's rotation angle
  size: number; // The object's size
  color: string; // The object's color

  constructor({ context, position, velocity, size, color }: GameObjectOptions) {
    this.context = context;
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.color = color;
    this.rotation = 0;
  }

  // Updates the game object's position based on its velocity and renders it.
  move(_?: unknown) {
    this.render();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Renders the game object to the canvas.
  private render() {
    this.context.save();

    // Apply transformations for rotation
    this.context.translate(this.position.x, this.position.y);
    this.context.rotate(this.rotation);
    this.context.translate(-this.position.x, -this.position.y);

    // Draw the object
    this.drawRectangle();
    this.drawTriangle();

    this.context.restore();
  }

  // Draws a rectangle representing the game object.
  drawRectangle() {
    this.context.fillStyle = this.color;
    this.context.shadowColor = '#ffffff80';
    this.context.shadowBlur = this.size / 2;

    const positionX = this.position.x - this.size / 2;
    const positionY = this.position.y - this.size / 2;
    this.context.fillRect(positionX, positionY, this.size, this.size);
  }

  // Draws a triangle representing the decoration of the game object.
  drawTriangle() {}
}

export default GameObject;
