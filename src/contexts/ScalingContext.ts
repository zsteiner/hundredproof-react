import { createContext } from 'react';

import { Ingredient } from '../utils/types';

type ScalingContextType = {
  error?: number,
  ingredients: Ingredient[],
  scalingFactor: number,
  setError?: (newValue: number) => void,
  setIngredients?: (newValue: Ingredient[]) => void,
  setScalingFactor?: (newValue: number) => void,
  setShowResults?: (newValue: boolean) => void,
  showResults?: boolean,
}

export const ScalingContext = createContext<ScalingContextType>({
  ingredients: [],
  scalingFactor: 2,
});
