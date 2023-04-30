export default function stringifyIngredient(ingredients) {
  const ingredientsRaw = [];

  ingredients.map(item => {
    const { amount, unit, ingredient } = item;
    const formatted = amount ? `${amount} ${unit} ${ingredient}` : '';

    ingredientsRaw.push(formatted);
    return ingredientsRaw;
  });
  return ingredientsRaw;
}
