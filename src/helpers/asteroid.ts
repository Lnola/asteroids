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

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomExcluding = (
  firstBottomBound: number,
  firstTopBound: number,
  secondBottomBound: number,
  secondTopBound: number,
) => {
  const firstRandom = getRandom(firstBottomBound, firstTopBound);
  const secondRandom = getRandom(secondBottomBound, secondTopBound);
  const isZero = getRandom(0, 1) === 0;
  return isZero ? firstRandom : secondRandom;
};
