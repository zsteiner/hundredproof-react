import { useSelector } from '@xstate/react';
import { useCallback, useContext } from 'react';

import { Measure, VolumeDirection } from '../../../utils/types';
import { DilutionMachineContext } from './provider';

export const useDilution = () => {
  const machine = useContext(DilutionMachineContext);

  if (!machine) {
    throw new Error('useDilution must be used within DilutionMachineProvider');
  }

  const {
    amount,
    desiredABV,
    displayMeasure,
    displayMeasureUnit,
    measure,
    startingABV,
    unit,
    volume,
    error,
    showResults,
    results,
  } = useSelector(machine, (state) => state.context);

  const setVolume = useCallback(
    (volume: VolumeDirection) => machine.send({ type: 'SET_VOLUME', volume }),
    [machine],
  );

  const setMeasure = useCallback(
    (measure: Measure) => machine.send({ type: 'SET_MEASURE', measure }),
    [machine],
  );

  const setAmount = useCallback(
    (amount: string) => machine.send({ type: 'SET_AMOUNT', amount }),
    [machine],
  );

  const setUnits = useCallback(
    (unit: string) => machine.send({ type: 'SET_UNITS', unit }),
    [machine],
  );

  const setStartingABV = useCallback(
    (value: string) => machine.send({ type: 'SET_STARTING_ABV', value }),
    [machine],
  );

  const setDesiredABV = useCallback(
    (value: string) => machine.send({ type: 'SET_DESIRED_ABV', value }),
    [machine],
  );

  const setShowResults = useCallback(
    (show: boolean) => machine.send({ type: 'SET_SHOW_RESULTS', show }),
    [machine],
  );

  return {
    amount,
    desiredABV,
    displayMeasure,
    displayMeasureUnit,
    measure,
    startingABV,
    unit,
    volume,
    error,
    showResults,
    results,
    setVolume,
    setMeasure,
    setAmount,
    setUnits,
    setStartingABV,
    setDesiredABV,
    setShowResults,
  };
};
