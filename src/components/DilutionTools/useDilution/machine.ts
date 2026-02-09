import { assign, setup } from 'xstate';

import convertABV from '../../../utils/convertABV';
import dilute from '../../../utils/dilute';
import { Measure, Unit, VolumeDirection } from '../../../utils/types';

export type DilutionResults = {
  displayResults?: number;
  displayUnits?: Unit;
  finalAmountSpirit?: number;
  finalAmountSpiritTranslated?: number;
  resultsOz?: number;
  resultsTranslated?: number;
  translatedUnit?: Unit;
};

export type DilutionMachineContext = {
  amount: number;
  desiredABV: number;
  displayMeasure: number;
  displayMeasureUnit: Measure;
  measure: Measure;
  startingABV: number;
  unit: Unit;
  volume: VolumeDirection;
  error: number | null;
  showResults: boolean;
  results: DilutionResults;
};

export type DilutionMachineEvents =
  | { type: 'SET_VOLUME'; volume: VolumeDirection }
  | { type: 'SET_MEASURE'; measure: Measure }
  | { type: 'SET_AMOUNT'; amount: string }
  | { type: 'SET_UNITS'; unit: string }
  | { type: 'SET_STARTING_ABV'; value: string }
  | { type: 'SET_DESIRED_ABV'; value: string }
  | { type: 'SET_SHOW_RESULTS'; show: boolean };

const computeResults = (
  amount: number,
  desiredABV: number,
  startingABV: number,
  unit: Unit,
  volume: VolumeDirection,
): DilutionResults => {
  const dilutionResults = dilute(amount, desiredABV, startingABV, unit, volume);

  return {
    displayResults: dilutionResults.displayResults,
    displayUnits: dilutionResults.displayUnits,
    finalAmountSpirit: dilutionResults.finalAmountSpirit,
    finalAmountSpiritTranslated: dilutionResults.finalAmountSpiritTranslated,
    resultsOz: dilutionResults.resultsOz,
    resultsTranslated: dilutionResults.resultsTranslated,
    translatedUnit: dilutionResults.translatedUnit,
  };
};

const validateABV = (
  startingABV: number,
  desiredABV: number,
  measure: Measure,
): number | null => {
  const formattedStartingABV = Number(startingABV);
  const formattedDesiredABV = Number(desiredABV);

  if (formattedDesiredABV >= formattedStartingABV) {
    return 4;
  }

  const max = measure === 'abv' ? 100 : 200;
  const code = measure === 'abv' ? 5 : 6;

  if (formattedDesiredABV > max || formattedStartingABV > max) {
    return code;
  }

  return null;
};

const checkForError = (
  value: string,
  code: number,
): { parsedValue: number; error: number | null; isError: boolean } => {
  if (value === '' || value === '0') {
    return { parsedValue: 0, error: code, isError: true };
  }
  return { parsedValue: parseInt(value), error: null, isError: false };
};

const DEFAULT_MEASURE: Measure = 'proof';
const DEFAULT_UNIT: Unit = 'teaspoon';

export const dilutionMachine = setup({
  types: {
    context: {} as DilutionMachineContext,
    events: {} as DilutionMachineEvents,
  },
}).createMachine({
  id: 'dilution',
  context: () => {
    const defaultDesiredABV = convertABV(DEFAULT_MEASURE, 25);
    const defaultStartingABV = convertABV(DEFAULT_MEASURE, 50);
    const amount = 1;
    const volume: VolumeDirection = 'start';

    return {
      amount,
      desiredABV: defaultDesiredABV,
      displayMeasure: defaultDesiredABV,
      displayMeasureUnit: DEFAULT_MEASURE,
      measure: DEFAULT_MEASURE,
      startingABV: defaultStartingABV,
      unit: DEFAULT_UNIT,
      volume,
      error: null,
      showResults: false,
      results: computeResults(
        amount,
        defaultDesiredABV,
        defaultStartingABV,
        DEFAULT_UNIT,
        volume,
      ),
    };
  },
  on: {
    SET_VOLUME: {
      actions: assign(({ context, event }) => {
        const results = computeResults(
          context.amount,
          context.desiredABV,
          context.startingABV,
          context.unit,
          event.volume,
        );
        return { volume: event.volume, results };
      }),
    },
    SET_MEASURE: {
      actions: assign(({ context, event }) => {
        const desiredABV = convertABV(event.measure, context.desiredABV);
        const startingABV = convertABV(event.measure, context.startingABV);
        const displayMeasure = convertABV(
          event.measure,
          context.displayMeasure,
        );
        const results = computeResults(
          context.amount,
          desiredABV,
          startingABV,
          context.unit,
          context.volume,
        );
        return {
          measure: event.measure,
          desiredABV,
          startingABV,
          displayMeasure,
          displayMeasureUnit: event.measure,
          results,
        };
      }),
    },
    SET_AMOUNT: {
      actions: assign(({ context, event }) => {
        const { parsedValue, error, isError } = checkForError(event.amount, 1);

        if (isError) {
          return {
            amount: parsedValue,
            error,
            showResults: false,
            results: {
              resultsOz: 0,
              resultsTranslated: 0,
              translatedUnit: undefined,
              displayResults: undefined,
              displayMeasure: 0,
            } as DilutionResults,
          };
        }

        const results = computeResults(
          parsedValue,
          context.desiredABV,
          context.startingABV,
          context.unit,
          context.volume,
        );
        return { amount: parsedValue, error: null, results };
      }),
    },
    SET_UNITS: {
      actions: assign(({ context, event }) => {
        const unit = event.unit as Unit;
        const results = computeResults(
          context.amount,
          context.desiredABV,
          context.startingABV,
          unit,
          context.volume,
        );
        return { unit, results };
      }),
    },
    SET_STARTING_ABV: {
      actions: assign(({ context, event }) => {
        const { parsedValue, error, isError } = checkForError(event.value, 2);

        if (isError) {
          return {
            startingABV: parsedValue,
            error,
            showResults: false,
            results: {
              resultsOz: 0,
              resultsTranslated: 0,
              translatedUnit: undefined,
              displayResults: undefined,
              displayMeasure: 0,
            } as DilutionResults,
          };
        }

        const abvError = validateABV(
          parsedValue,
          context.desiredABV,
          context.measure,
        );
        const results = computeResults(
          context.amount,
          context.desiredABV,
          parsedValue,
          context.unit,
          context.volume,
        );
        return {
          startingABV: parsedValue,
          error: abvError,
          results,
        };
      }),
    },
    SET_DESIRED_ABV: {
      actions: assign(({ context, event }) => {
        const { parsedValue, error, isError } = checkForError(event.value, 2);

        if (isError) {
          return {
            desiredABV: parsedValue,
            error,
            showResults: false,
            results: {
              resultsOz: 0,
              resultsTranslated: 0,
              translatedUnit: undefined,
              displayResults: undefined,
              displayMeasure: 0,
            } as DilutionResults,
          };
        }

        const abvError = validateABV(
          context.startingABV,
          parsedValue,
          context.measure,
        );
        const results = computeResults(
          context.amount,
          parsedValue,
          context.startingABV,
          context.unit,
          context.volume,
        );
        return {
          desiredABV: parsedValue,
          error: abvError,
          results,
        };
      }),
    },
    SET_SHOW_RESULTS: {
      actions: assign(({ event }) => ({
        showResults: event.show,
      })),
    },
  },
});
