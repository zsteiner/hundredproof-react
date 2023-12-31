import { createContext } from 'react';

import { Measure, Unit, VolumeDirection } from '../utils/types';

export type DilutionParams = {
  amount?: number;
  dilution?: number;
  desiredABV?: number,
  displayUnits?: Unit,
  error?: number;
  displayResults?: number,
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
  results?: DilutionParams,
  setStartingABV?: (value: string) => void,
  setAmount?: (value: string) => void,
  setDesiredABV?: (value: string) => void,
  setMeasure?: (value: Measure) => void,
  setShowResults?: (value: boolean) => void;
  setUnits?: (value: string) => void;
  setVolume?: (value: VolumeDirection) => void;
  showResults?: boolean,
}

export const DilutionContext = createContext<DilutionContextType>({
  dilution: 0,
});
