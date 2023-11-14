import { ValuesType } from 'utility-types';

export const MovementType = {
  LINEAR: 'LINEAR',
  ROTATION: 'ROTATION',
} as const;

export type MovementType = ValuesType<typeof MovementType>;
