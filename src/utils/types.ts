import { units } from './units';

export type IconType = 'close' | 'cup' | 'jigger' | 'shot';

export type Ingredient = {
  amount: number;
  formattedName?: string;
  unit: Unit;
  name: string;
}

export type Measure = 'abv' | 'proof';

export type Unit = typeof units[number] | undefined;