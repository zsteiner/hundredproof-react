import { createContext } from "react";

type ScalingContextType = {
  ingredients: string[],
  ingredientsRaw: string[],
  scalingFactor: number,
  setScalingFactor?: () => void,
  setIngredients?: () => void,
}

export const ScalingContext = createContext<ScalingContextType>({
  ingredients: [],
  ingredientsRaw: [],
  scalingFactor: 2,
});
