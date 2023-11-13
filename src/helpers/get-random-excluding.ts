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
