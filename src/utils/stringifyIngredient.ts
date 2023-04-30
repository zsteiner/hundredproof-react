import { Ingredient } from './types';

export default function stringifyIngredient(ingredients: Ingredient[]) {
  const ingredientsRaw = [] as string[];

  ingredients.map(item => {
    const { amount, unit, ingredient } = item;
    const formatted = amount ? `${amount} ${unit} ${ingredient}` : '';

    ingredientsRaw.push(formatted);

    return ingredientsRaw;
  });

  return ingredientsRaw;
}
