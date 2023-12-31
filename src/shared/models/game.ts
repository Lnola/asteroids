import { GameOptions } from '@/game';

export const defaultGameOptions: GameOptions = {
  movement: {
    speed: 3,
    rotationSpeed: 0.05,
    friction: 0.97,
  },
  asteroids: {
    numberPerWave: 5,
    secondsBetweenWaves: 5,
  },
};
