import React, { Component } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';

import dilute from '../../utils/dilute';
import convertABV from '../../utils/convertABV';

import AmountSelector from '../AmountSelector/AmountSelector';
import DiluteResults from '../DilutionResults/DiluteResults';
import DilutionValues from '../DilutionValues/DilutionValues';
import Errors from '../Errors/Errors';
import MeasureHeader from '../MeasureHeader/MeasureHeader';

class DilutionTools extends Component {
  constructor(props) {
    super(props);

    const defaults = {
      displayUnits: 'ounce',
      measure: 'proof',
      translatedUnit: 'teaspoon',
      unit: 'shot',
      volume: 'start',
    };

    const startingABV = convertABV(defaults.measure, 50);
    const desiredABV = convertABV(defaults.measure, 25);

    this.state = {
      amount: 1,
      desiredABV: desiredABV,
      displayMeasure: desiredABV,
      displayMeasureUnit: defaults.measure,
      displayResults: 1,
      displayUnits: defaults.displayUnits,
      measure: defaults.measure,
      resultsOz: 0.25,
      resultsSpirit: 0,
      resultsTranslated: 1.5,
      setVolume: this.setVolume,
      setMeasure: this.setMeasure,
      setAmount: this.setAmount,
      setUnits: this.setUnits,
      setStartingABV: this.setStartingABV,
      setDesiredABV: this.setDesiredABV,
      startingABV: startingABV,
      showResults: true,
      translatedUnit: defaults.translatedUnit,
      finalAmountSpiritTranslated: 1.5,
      updateResults: this.updateResults,
      unit: defaults.unit,
      volume: defaults.volume,
    };
  }

  componentDidMount() {
    this.updateResults();
  }

  updateResults = (event) => {
    if (event) {
      event.preventDefault();
    }

    const {
      amount,
      desiredABV,
      measure,
      startingABV,
      unit,
      volume,
    } = this.state;

    const dilutionResults = dilute(
      amount,
      desiredABV,
      startingABV,
      unit,
      volume,
    );

    this.setState({
      displayResults: dilutionResults.displayResults,
      displayUnits: dilutionResults.displayUnits,
      displayMeasure: desiredABV,
      displayMeasureUnit: measure,
      finalAmountSpirit: dilutionResults.finalAmountSpirit,
      finalAmountSpiritTranslated: dilutionResults.finalAmountSpiritTranslated,
      resultsOz: dilutionResults.resultsOz,
      resultsSpirit: dilutionResults.resultsSpirit,
      resultsTranslated: dilutionResults.resultsTranslated,
      showResults: true,
      translatedUnit: dilutionResults.translatedUnit,
    });
  };

  checkForError(value, code) {
    if (isNaN(value) || value === '') {
      this.setState({
        error: code,
        resultsOz: 0,
        resultsTranslated: 0,
        translatedUnit: 0,
        displayResults: 0,
        displayMeasure: 0,
        showResults: false,
      });
      return '';
    } else {
      this.setState({
        error: null,
      });
      return value.trim();
    }
  }

  setVolume = (volume) => {
    this.setState(
      {
        volume: volume,
      },
      () => {
        this.updateResults();
      },
    );
  };

  setMeasure = (measure) => {
    const { desiredABV, startingABV, displayMeasure } = this.state;

    this.setState(
      {
        measure: measure,
        desiredABV: convertABV(measure, desiredABV),
        startingABV: convertABV(measure, startingABV),
        displayMeasure: convertABV(measure, displayMeasure),
        displayMeasureUnit: measure,
      },
      () => {
        this.updateResults();
      },
    );
  };

  setAmount = (event) => {
    const amount = this.checkForError(event.target.value, 1);

    this.setState({
      amount: amount,
    });
  };

  setUnits = (event) => {
    const unit = event.target.value;

    this.setState(
      {
        unit: unit,
      },
      this.updateResults,
    );
  };

  abvValidation(startingABV, desiredABV) {
    if (Number(desiredABV) >= Number(startingABV)) {
      this.setState({
        error: 4,
      });
    }
  }

  setStartingABV = (event) => {
    const { desiredABV } = this.state;
    const startingABV = this.checkForError(event.target.value, 2);

    this.abvValidation(startingABV, desiredABV);

    this.setState({
      startingABV: Number(startingABV),
    });
  };

  setDesiredABV = (event) => {
    const { startingABV } = this.state;
    const desiredABV = this.checkForError(event.target.value, 3);

    this.abvValidation(startingABV, desiredABV);

    this.setState({
      desiredABV: Number(desiredABV),
    });
  };

  render() {
    const { error, showResults } = this.state;

    return (
      <DilutionContext.Provider value={this.state}>
        <MeasureHeader />
        <section className="hp-section hp-app__row">
          <div className="hp-app__col">
            <h3 className="hp-heading">Starting with</h3>
            <AmountSelector />
            <DilutionValues />
            {error ? <Errors errorCode={error} /> : null}
          </div>
          <div className="hp-app__col">
            {!error && showResults ? <DiluteResults /> : null}
          </div>
        </section>
      </DilutionContext.Provider>
    );
  }
}

export default DilutionTools;
