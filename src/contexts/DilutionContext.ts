import { createContext } from "react";

type DilutionContextType = {
  dilution: number;
  error?: number;
  setVolume?: () => void;
  displayResults: string,
  displayUnits: string,
  displayMeasure: string,
  displayMeasureUnit: string,
  finalAmountSpirit: string,
  finalAmountSpiritTranslated: string,
  resultsOz: number,
  resultsSpirit: string,
  resultsTranslated: string,
  showResults: boolean,
  translatedUnit: string,
}

export const DilutionContext = createContext<DilutionContextType>({
  dilution: 0,
  displayResults: "",
  displayUnits: "",
  displayMeasure: "",
  displayMeasureUnit: "",
  finalAmountSpirit: "",
  finalAmountSpiritTranslated: "",
  resultsOz: 0,
  resultsSpirit: "",
  resultsTranslated: "",
  showResults: false,
  translatedUnit: "",
});
