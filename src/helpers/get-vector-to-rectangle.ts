import { Vector } from '@/main';

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
