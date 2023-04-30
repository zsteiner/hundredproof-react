export type Ingredient = {
  amount: number;
  formatted?: string;
  unit: Unit;
  ingredient: string;
}

export type Unit = 'cup' | 'jigger' | 'ounce' | 'ounces' | 'jigger' | 'jiggers' | 'shot' | 'shots' | 'oz';