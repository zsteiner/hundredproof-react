import { createContext } from 'react';

type ScalingContextType = {
  error?: number,
  ingredients: string[],
  ingredientsRaw: string[],
  scalingFactor: number,
  setError?: (newValue: number) => void,
  setIngredients?: (newValue: []) => void,
  setIngredientsRaw?: (newValue: []) => void,
  setScalingFactor?: (newValue: number) => void,
  setShowResults?: (newValue: boolean) => void,
  showResults?: boolean,
}

export const ScalingContext = createContext<ScalingContextType>({
  ingredients: [],
  ingredientsRaw: [],
  scalingFactor: 2,
});
