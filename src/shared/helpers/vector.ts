import { Bounds } from '@/shared/models/bounds';
import { Vector } from '@/shared/models/vector';

class VectorHelpers {
  // Generates a random vector located on the side of a rectangle defined by Bounds.
  static getRandomVectorOnRectangleSide({
    maxX,
    minX,
    maxY,
    minY,
  }: Bounds): Vector {
    // Array of functions, each generating a vector on a different side of the rectangle
    const sides = [
      () => ({ x: Math.random() * (maxX - minX) + minX, y: minY }), // top side
      () => ({ x: Math.random() * (maxX - minX) + minX, y: maxY }), // bottom side
      () => ({ x: minX, y: Math.random() * (maxY - minY) + minY }), // left side
      () => ({ x: maxX, y: Math.random() * (maxY - minY) + minY }), // right side
    ];
    // Select and return a random vector from one of the rectangle's sides
    return sides[Math.floor(Math.random() * sides.length)]();
  }

  // Calculates a velocity vector pointing towards a random point inside an A% area of Bounds.
  static getVelocityToRandomVector(
    outOfBoundsPosition: Vector,
    bounds: Bounds,
    A: number,
  ): Vector {
    // Calculate target area, a smaller rectangle inside the given bounds
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

    // Generate a random point within the target area
    const randomPoint = {
      x: Math.random() * (targetArea.maxX - targetArea.minX) + targetArea.minX,
      y: Math.random() * (targetArea.maxY - targetArea.minY) + targetArea.minY,
    };

    // Calculate velocity vector directed towards the random point
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

    // Scale velocity vector with a random speed between 2 and 4
    const scaleFactor = Math.random() * (4 - 2) + 2;
    return VectorHelpers.scaleVelocity(normalizedVelocity, scaleFactor);
  }

  // Scales a velocity vector by a given factor.
  static scaleVelocity(velocity: Vector, scaleFactor: number) {
    return {
      x: velocity.x * scaleFactor,
      y: velocity.y * scaleFactor,
    };
  }
}

export default VectorHelpers;
