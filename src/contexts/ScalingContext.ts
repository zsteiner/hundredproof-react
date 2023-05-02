import { createContext } from 'react';

type ScalingContextType = {
  error?: number,
  ingredients: string[],
  scalingFactor: number,
  setError?: (newValue: number) => void,
  setIngredients?: (newValue: string[]) => void,
  setScalingFactor?: (newValue: number) => void,
  setShowResults?: (newValue: boolean) => void,
  showResults?: boolean,
}

export const ScalingContext = createContext<ScalingContextType>({
  ingredients: [],
  scalingFactor: 2,
});
