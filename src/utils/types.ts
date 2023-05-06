import { units } from './units';

export type IconType = 'close' | 'cup' | 'jigger' | 'shot';

export type Ingredient = {
  amount?: number;
  id: number;
  ingredient?: string;
  unit?: Unit;
  value?: string;
}

export type IngredientParams = {
  id: number,
  value: string,
}

export type Measure = 'abv' | 'proof';

export type Unit = typeof units[number] | undefined;