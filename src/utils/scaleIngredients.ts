import { Ingredient } from './types';

type ScaleIngredientsParams = {
  ingredients: Ingredient[];
  scalingFactor: number | undefined;
};

export const scaleIngredients = ({
  ingredients,
  scalingFactor,
}: ScaleIngredientsParams) => {
  return ingredients
    .filter((item) => item.value)
    .map((item) => {
      const { amount, ...rest } = item;
      const normalizeScalingFactor =
        scalingFactor === undefined || isNaN(scalingFactor) ? 1 : scalingFactor;

      return {
        ...rest,
        amount: (amount ?? 0) * normalizeScalingFactor,
      };
    });
};
