import { createContext } from 'react';

import { Measure, Unit } from '../utils/types';

type DilutionContextType = {
  amount?: number;
  dilution?: number;
  desiredABV?: number,
  displayUnits?: Unit,
  error?: number;
  displayResults?: string,
  displayMeasure?: Unit,
  displayMeasureUnit?: 'abv' | 'proof',
  finalAmountSpirit?: number,
  finalAmountSpiritTranslated?: number,
  resultsOz?: number,
  measure?: Measure,
  resultsSpirit?: string,
  resultsTranslated?: number,
  setStartingABV?: () => void,
  startingABV?: number,
  setAmount?: () => void,
  setDesiredABV?: () => void,
  setMeasure?: () => void,
  setUnits?: () => void;
  setVolume?: () => void;
  showResults?: boolean,
  translatedUnit?: Unit,
  updateResults?: () => void,
  volume?: 'start' | 'end',
}

export const DilutionContext = createContext<DilutionContextType>({
  dilution: 0,
});
