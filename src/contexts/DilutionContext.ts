import { createContext } from 'react';

import { Measure, Unit, VolumeDirection } from '../utils/types';

export type DilutionParams = {
  amount?: number;
  dilution?: number;
  desiredABV?: number,
  displayUnits?: Unit,
  error?: number;
  displayResults?: string,
  displayMeasure?: number,
  displayMeasureUnit?: Measure,
  finalAmountSpirit?: number,
  finalAmountSpiritTranslated?: number,
  measure?: Measure,
  resultsOz?: number,
  resultsSpirit?: number,
  resultsTranslated?: number,
  startingABV?: number,
  translatedUnit?: Unit,
  unit?: Unit,
  volume?: VolumeDirection,
}

type DilutionContextType = DilutionParams & {
  setStartingABV?: (value: string) => void,
  setAmount?: (value: string) => void,
  setDesiredABV?: (value: string) => void,
  setMeasure?: (value: Measure) => void,
  setUnits?: (value: Unit) => void;
  setVolume?: (value: VolumeDirection) => void;
  showResults?: boolean,
  updateResults?: () => void,
}

export const DilutionContext = createContext<DilutionContextType>({
  dilution: 0,
});
