import { assign, setup } from 'xstate';

import { emptyIngredient } from '../../../utils/constants';
import { processIngredients } from '../../../utils/processIngredients';
import { scaleIngredients } from '../../../utils/scaleIngredients';
import { Ingredient } from '../../../utils/types';

export type ScalingMachineContext = {
  ingredients: Ingredient[];
  scalingFactor: number | undefined;
  error: number | undefined;
  showResults: boolean;
  processedIngredients: Ingredient[];
  results: Ingredient[];
};

export type ScalingMachineEvents =
  | { type: 'SET_INGREDIENTS'; ingredients: Ingredient[] }
  | { type: 'SET_SCALING_FACTOR'; factor: number }
  | { type: 'SET_ERROR'; code: number | undefined }
  | { type: 'SET_SHOW_RESULTS'; show: boolean };

const computeDerived = (
  ingredients: Ingredient[],
  scalingFactor: number | undefined,
) => {
  const processedIngredients = processIngredients(ingredients);
  const results = scaleIngredients({
    ingredients: processedIngredients,
    scalingFactor,
  });
  return { processedIngredients, results };
};

const applyAutoAppend = (newIngredients: Ingredient[]): Ingredient[] => {
  const lastItem = newIngredients[newIngredients.length - 1];

  if (newIngredients.length === 1 && !!lastItem.value) {
    const newItem = { id: newIngredients.length, value: '' };
    return [...newIngredients, newItem];
  }

  return newIngredients;
};

export const scalingMachine = setup({
  types: {
    context: {} as ScalingMachineContext,
    events: {} as ScalingMachineEvents,
  },
}).createMachine({
  id: 'scaling',
  context: () => {
    const ingredients = [emptyIngredient];
    const scalingFactor = 2;

    return {
      ingredients,
      scalingFactor,
      error: undefined,
      showResults: false,
      ...computeDerived(ingredients, scalingFactor),
    };
  },
  on: {
    SET_INGREDIENTS: {
      actions: assign(({ context, event }) => {
        const ingredients = applyAutoAppend(event.ingredients);
        return {
          ingredients,
          ...computeDerived(ingredients, context.scalingFactor),
        };
      }),
    },
    SET_SCALING_FACTOR: {
      actions: assign(({ context, event }) => {
        return {
          scalingFactor: event.factor,
          ...computeDerived(context.ingredients, event.factor),
        };
      }),
    },
    SET_ERROR: {
      actions: assign(({ event }) => ({
        error: event.code,
      })),
    },
    SET_SHOW_RESULTS: {
      actions: assign(({ event }) => ({
        showResults: event.show,
      })),
    },
  },
});
