import GameObject, { IGameObject } from './game-object';

const PLAYER_SIZE = 30;

type IPlayer = IGameObject;

type PlayerOptions = Pick<IGameObject, 'context' | 'position' | 'velocity'>;

class Player extends GameObject implements IPlayer {
  constructor({ context, position, velocity }: PlayerOptions) {
    super({
      context,
      position,
      velocity,
      color: 'red',
      size: PLAYER_SIZE,
    });
  }

  move(canvas: HTMLCanvasElement) {
    super.move();
    this.wraparound(canvas);
  }

  drawTriangle() {
    this.context.fillStyle = 'grey';
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

  private wraparound(canvas: HTMLCanvasElement) {
    if (this.position.x >= canvas.width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = canvas.width;
    if (this.position.y >= canvas.height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = canvas.height;
  }
}

export default Player;
