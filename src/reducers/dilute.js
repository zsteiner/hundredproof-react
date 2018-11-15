const dilute = (state = [], action) => {
  console.log('dilute action', action);
  switch (action.type) {
    case 'SAVE_DILUTE':
      return [
        ...state,
        {
          diluteData: {
            amount: action.amount,
            desiredABV: action.desiredABV,      
            displayMeasure: action.displayMeasure,
            displayMeasureUnit: action.displayMeasureUnit,
            displayResults: action.displayResults,
            displayUnits: action.displayUnits,
            measure: action.measure,
            resultsOz: action.resultsOz,
            resultsSpirit: action.resultsSpirit,
            resultsTranslated: action.resultsTranslated,
            startingABV: action.startingABV,
            translatedUnit: action.translatedUnit,
            unit: action.unit,
            volume: action.volume
          }
        }
      ]
    default:
      return state
  }
}

export default dilute;