import { Vector } from '@/main';
import { Bounds } from '@/objects/asteroid';

export function getRandomVectorOnRectangleSide({
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

const SPEED_REDUCTION_FACTOR = 0.005;

const getRandomPointInRectangle = (width: number, height: number) => {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return { x, y };
};

export const getVectorToRectangle = (
  point_outside: Vector,
  width: number,
  height: number,
) => {
  const pointInside = getRandomPointInRectangle(width, height);
  return {
    x: (pointInside.x - point_outside.x) * SPEED_REDUCTION_FACTOR,
    y: (pointInside.y - point_outside.y) * SPEED_REDUCTION_FACTOR,
  };
};
