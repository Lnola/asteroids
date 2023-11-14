import GameObject, { IGameObject } from './game-object';
import { VectorHelpers } from '@/shared/helpers';
import { Bounds } from '@/shared/models/bounds';

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
    this.position = VectorHelpers.getRandomVectorOnRectangleSide(bounds);
    this.velocity = VectorHelpers.getVelocityToRandomVector(
      this.position,
      bounds,
      60,
    );
    this.bounds = bounds;
    this.wasInBounds = false;
  }

  detectCollision(gameObject: GameObject): boolean {
    const halfSizeSum = this.size / 2 + gameObject.size / 2;
    const xOverlap =
      Math.abs(this.position.x - gameObject.position.x) <= halfSizeSum;
    const yOverlap =
      Math.abs(this.position.y - gameObject.position.y) <= halfSizeSum;
    return xOverlap && yOverlap;
  }

  hasExitedBounds() {
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
