import GameObject, { IGameObject } from './game-object';
import Player from './player';
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

type IAsteroid = IGameObject & {
  bounds: Bounds;
  wasInBounds: boolean;
};

type AsteroidOptions = Pick<IGameObject, 'context'> & { bounds: Bounds };

class Asteroid extends GameObject implements IAsteroid {
  bounds: Bounds;
  wasInBounds: boolean;

  constructor({ context, bounds }: AsteroidOptions) {
    super({
      context,
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      size: ASTEROID_SIZE,
      color: 'grey',
    });
    this.position = getRandomVectorOnRectangleSide(bounds);
    this.velocity = getVelocityToRandomVector(this.position, bounds, 60);
    this.bounds = bounds;
    this.wasInBounds = false;
  }

  detectPlayerCollision(player: Player): boolean {
    const halfSizeSum = this.size / 2 + player.size / 2;
    const xOverlap =
      Math.abs(this.position.x - player.position.x) <= halfSizeSum;
    const yOverlap =
      Math.abs(this.position.y - player.position.y) <= halfSizeSum;
    return xOverlap && yOverlap;
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
}

export default Asteroid;
