import { Bounds } from '@/objects/asteroid';

export type Vector = { x: number; y: number };

class VectorHelpers {
  static getRandomVectorOnRectangleSide({
    maxX,
    minX,
    maxY,
    minY,
  }: Bounds): Vector {
    const sides = [
      () => ({ x: Math.random() * (maxX - minX) + minX, y: minY }), // top
      () => ({ x: Math.random() * (maxX - minX) + minX, y: maxY }), // bottom
      () => ({ x: minX, y: Math.random() * (maxY - minY) + minY }), // left
      () => ({ x: maxX, y: Math.random() * (maxY - minY) + minY }), // right
    ];
    return sides[Math.floor(Math.random() * sides.length)]();
  }

  static getVelocityToRandomVector(
    outOfBoundsPosition: Vector,
    bounds: Bounds,
    A: number,
  ): Vector {
    // Calculate the A% area of the rectangle
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    const offsetW = (width * (1 - A / 100)) / 2;
    const offsetH = (height * (1 - A / 100)) / 2;

    const targetArea = {
      minX: bounds.minX + offsetW,
      maxX: bounds.maxX - offsetW,
      minY: bounds.minY + offsetH,
      maxY: bounds.maxY - offsetH,
    };

    // Generate a random point within the A% area
    const randomPoint = {
      x: Math.random() * (targetArea.maxX - targetArea.minX) + targetArea.minX,
      y: Math.random() * (targetArea.maxY - targetArea.minY) + targetArea.minY,
    };

    // Compute the velocity vector directed towards the random point
    const velocity = {
      x: randomPoint.x - outOfBoundsPosition.x,
      y: randomPoint.y - outOfBoundsPosition.y,
    };

    // Normalize the velocity vector
    const magnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    const normalizedVelocity = VectorHelpers.scaleVelocity(
      velocity,
      1 / magnitude,
    );

    // Scale velocity vector with random speed
    const scaleFactor = Math.random() * (4 - 2) + 2;
    const scaledVelocity = VectorHelpers.scaleVelocity(
      normalizedVelocity,
      scaleFactor,
    );

    return scaledVelocity;
  }

  static scaleVelocity(velocity: Vector, scaleFactor: number) {
    return {
      x: velocity.x * scaleFactor,
      y: velocity.y * scaleFactor,
    };
  }
}

export default VectorHelpers;
