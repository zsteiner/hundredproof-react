import { assign, setup } from 'xstate';

import { convertABV } from '../../../utils/convertABV';
import { dilute } from '../../../utils/dilute';
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

type ComputeResultsParams = {
  amount: number;
  desiredABV: number;
  startingABV: number;
  unit: Unit;
  volume: VolumeDirection;
};

const computeResults = ({
  amount,
  desiredABV,
  startingABV,
  unit,
  volume,
}: ComputeResultsParams): DilutionResults => {
  return dilute({ amount, desiredABV, startingABV, unit, volume });
};

type ValidateABVParams = {
  startingABV: number;
  desiredABV: number;
  measure: Measure;
};

const validateABV = ({
  startingABV,
  desiredABV,
  measure,
}: ValidateABVParams): number | null => {
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

type CheckForErrorParams = {
  value: string;
  code: number;
};

const checkForError = ({
  value,
  code,
}: CheckForErrorParams): {
  parsedValue: number;
  error: number | null;
  isError: boolean;
} => {
  if (value === '' || value === '0') {
    return { parsedValue: 0, error: code, isError: true };
  }
  return { parsedValue: parseInt(value, 10), error: null, isError: false };
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
    const defaultDesiredABV = convertABV({
      measure: DEFAULT_MEASURE,
      value: 25,
    });
    const defaultStartingABV = convertABV({
      measure: DEFAULT_MEASURE,
      value: 50,
    });
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
      results: computeResults({
        amount,
        desiredABV: defaultDesiredABV,
        startingABV: defaultStartingABV,
        unit: DEFAULT_UNIT,
        volume,
      }),
    };
  },
  on: {
    SET_VOLUME: {
      actions: assign(({ context, event }) => {
        const results = computeResults({
          amount: context.amount,
          desiredABV: context.desiredABV,
          startingABV: context.startingABV,
          unit: context.unit,
          volume: event.volume,
        });
        return { volume: event.volume, results };
      }),
    },
    SET_MEASURE: {
      actions: assign(({ context, event }) => {
        const desiredABV = convertABV({
          measure: event.measure,
          value: context.desiredABV,
        });
        const startingABV = convertABV({
          measure: event.measure,
          value: context.startingABV,
        });
        const displayMeasure = convertABV({
          measure: event.measure,
          value: context.displayMeasure,
        });
        const results = computeResults({
          amount: context.amount,
          desiredABV,
          startingABV,
          unit: context.unit,
          volume: context.volume,
        });
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
        const { parsedValue, error, isError } = checkForError({
          value: event.amount,
          code: 1,
        });

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

        const results = computeResults({
          amount: parsedValue,
          desiredABV: context.desiredABV,
          startingABV: context.startingABV,
          unit: context.unit,
          volume: context.volume,
        });
        return { amount: parsedValue, error: null, results };
      }),
    },
    SET_UNITS: {
      actions: assign(({ context, event }) => {
        const unit = event.unit as Unit;
        const results = computeResults({
          amount: context.amount,
          desiredABV: context.desiredABV,
          startingABV: context.startingABV,
          unit,
          volume: context.volume,
        });
        return { unit, results };
      }),
    },
    SET_STARTING_ABV: {
      actions: assign(({ context, event }) => {
        const { parsedValue, error, isError } = checkForError({
          value: event.value,
          code: 2,
        });

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

        const abvError = validateABV({
          startingABV: parsedValue,
          desiredABV: context.desiredABV,
          measure: context.measure,
        });
        const results = computeResults({
          amount: context.amount,
          desiredABV: context.desiredABV,
          startingABV: parsedValue,
          unit: context.unit,
          volume: context.volume,
        });
        return {
          startingABV: parsedValue,
          error: abvError,
          results,
        };
      }),
    },
    SET_DESIRED_ABV: {
      actions: assign(({ context, event }) => {
        const { parsedValue, error, isError } = checkForError({
          value: event.value,
          code: 2,
        });

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

        const abvError = validateABV({
          startingABV: context.startingABV,
          desiredABV: parsedValue,
          measure: context.measure,
        });
        const results = computeResults({
          amount: context.amount,
          desiredABV: parsedValue,
          startingABV: context.startingABV,
          unit: context.unit,
          volume: context.volume,
        });
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
