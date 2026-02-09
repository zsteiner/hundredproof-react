import { useSelector } from '@xstate/react';
import { useCallback, useContext } from 'react';

import { Ingredient } from '../../../utils/types';
import { ScalingMachineContext } from './provider';

export const useScaling = () => {
  const machine = useContext(ScalingMachineContext);

  if (!machine) {
    throw new Error('useScaling must be used within ScalingMachineProvider');
  }

  const {
    ingredients,
    scalingFactor,
    error,
    showResults,
    processedIngredients,
    results,
  } = useSelector(machine, (state) => state.context);

  const setIngredients = useCallback(
    (ingredients: Ingredient[]) =>
      machine.send({ type: 'SET_INGREDIENTS', ingredients }),
    [machine],
  );

  const setScalingFactor = useCallback(
    (factor: number) => machine.send({ type: 'SET_SCALING_FACTOR', factor }),
    [machine],
  );

  const setError = useCallback(
    (code: number | undefined) => machine.send({ type: 'SET_ERROR', code }),
    [machine],
  );

  const setShowResults = useCallback(
    (show: boolean) => machine.send({ type: 'SET_SHOW_RESULTS', show }),
    [machine],
  );

  return {
    ingredients,
    scalingFactor,
    error,
    showResults,
    processedIngredients,
    results,
    setIngredients,
    setScalingFactor,
    setError,
    setShowResults,
  };
};
