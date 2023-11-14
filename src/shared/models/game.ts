import { GameOptions } from '@/game';
import { MovementType } from '@/shared/models/movement';

export const defaultGameOptions: GameOptions = {
  movement: {
    type: MovementType.ROTATION,
    speed: 3,
    rotationSpeed: 0.05,
    friction: 0.97,
  },
  asteroids: {
    numberPerWave: 5,
  },
};
