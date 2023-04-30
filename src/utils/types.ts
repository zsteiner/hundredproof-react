import { units } from './units';

export type IconType = 'close' | 'cup' | 'jigger' | 'shot';

export type Ingredient = {
  amount: number;
  formatIngredient?: string;
  unit: Unit;
  ingredient: string;
}

export type Measure = 'abv' | 'proof';

export type Unit = typeof units[number] | undefined;