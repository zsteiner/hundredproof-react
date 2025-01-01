import { useEffect, useState } from 'react';

import {
  DilutionContext,
  DilutionParams,
} from '../../contexts/DilutionContext';
import convertABV from '../../utils/convertABV';
import dilute from '../../utils/dilute';
import { Measure, Unit, VolumeDirection } from '../../utils/types';
import { AmountSelector } from '../AmountSelector/AmountSelector';
import { DiluteResults } from '../DilutionResults/DiluteResults';
import { DilutionValues } from '../DilutionValues/DilutionValues';
import { Errors } from '../Errors/Errors';
import { MeasureHeader } from '../MeasureHeader/MeasureHeader';

export const DilutionTools = () => {
  const defaultMeasure = 'proof';
  const defaultUnit = 'teaspoon';
  const desiredABV = convertABV(defaultMeasure, 25);
  const [dilutionParams, setDilutionParams] = useState<DilutionParams>({
    amount: 1,
    desiredABV,
    displayMeasure: desiredABV,
    displayMeasureUnit: defaultMeasure,
    displayUnits: 'ounce',
    finalAmountSpiritTranslated: 1.5,
    measure: defaultMeasure,
    resultsOz: 0.25,
    resultsSpirit: 0,
    resultsTranslated: 1.5,
    startingABV: convertABV(defaultMeasure, 50),
    translatedUnit: defaultUnit,
    unit: defaultUnit,
    volume: 'start',
  });
  const [error, setError] = useState<number | null>(null);
  const [results, setResults] = useState<DilutionParams>();
  const [showResults, setShowResults] = useState(false);

  const checkForError = (value: string, code: number) => {
    if (value === '' || value === '0') {
      setDilutionParams({
        ...dilutionParams,
        resultsOz: 0,
        resultsTranslated: 0,
        translatedUnit: undefined,
        displayResults: undefined,
        displayMeasure: 0,
      });
      setError(code);
      setShowResults(false);
      return '';
    } else {
      setError(null);

      return value;
    }
  };

  const setVolume = (volume: VolumeDirection) => {
    setDilutionParams({
      ...dilutionParams,
      volume,
    });
  };

  const setMeasure = (measure: Measure) => {
    const { desiredABV, startingABV, displayMeasure } = dilutionParams;

    setDilutionParams({
      ...dilutionParams,
      measure,
      desiredABV: convertABV(measure, desiredABV),
      startingABV: convertABV(measure, startingABV),
      displayMeasure: convertABV(measure, displayMeasure),
      displayMeasureUnit: measure,
    });
  };

  const setAmount = (amount: string) => {
    setDilutionParams({
      ...dilutionParams,
      amount: parseInt(checkForError(amount, 1)),
    });
  };

  const setUnits = (unit: string) => {
    setDilutionParams({
      ...dilutionParams,
      unit: unit as Unit,
    });
  };

  const abvValidation = (startingABV: number, desiredABV: number) => {
    const formattedStartingABV = Number(startingABV);
    const formattedDesiredABV = Number(desiredABV);

    if (formattedDesiredABV >= formattedStartingABV) {
      setError(4);
    }
    const { measure } = dilutionParams;
    const max = measure === 'abv' ? 100 : 200;
    const code = measure === 'abv' ? 5 : 6;

    if (formattedDesiredABV > max || formattedStartingABV > max) {
      setError(code);
    }
  };

  const setStartingABV = (value: string) => {
    const startingABV = parseInt(checkForError(value, 2));
    const { desiredABV } = dilutionParams;

    abvValidation(startingABV, desiredABV);

    setDilutionParams({
      ...dilutionParams,
      startingABV: startingABV,
    });
  };

  const setDesiredABV = (value: string) => {
    const { startingABV } = dilutionParams;
    const desiredABV = parseInt(checkForError(value, 2));

    abvValidation(startingABV, desiredABV);

    setDilutionParams({
      ...dilutionParams,
      desiredABV: desiredABV,
    });
  };

  useEffect(() => {
    const { amount, desiredABV, startingABV, unit, volume } = dilutionParams;

    const dilutionResults = dilute(
      amount,
      desiredABV,
      startingABV,
      unit,
      volume,
    );

    setResults({
      ...dilutionParams,
      displayResults: dilutionResults.displayResults,
      displayUnits: dilutionResults.displayUnits,
      finalAmountSpirit: dilutionResults.finalAmountSpirit,
      finalAmountSpiritTranslated: dilutionResults.finalAmountSpiritTranslated,
      resultsOz: dilutionResults.resultsOz,
      resultsTranslated: dilutionResults.resultsTranslated,
      translatedUnit: dilutionResults.translatedUnit,
    });
  }, [dilutionParams]);

  return (
    <DilutionContext.Provider
      value={{
        ...dilutionParams,
        error,
        results,
        setVolume,
        setMeasure,
        setAmount,
        setUnits,
        setStartingABV,
        setDesiredABV,
        setShowResults,
      }}
    >
      <MeasureHeader />
      <section className="hp-section hp-app__row">
        <div className="hp-app__col">
          <h3 className="hp-heading">Starting with</h3>
          <AmountSelector />
          <DilutionValues />
          {error ? <Errors errorCode={error} /> : null}
        </div>
        <div className="hp-app__col">
          {showResults ? <DiluteResults /> : null}
        </div>
      </section>
    </DilutionContext.Provider>
  );
};
