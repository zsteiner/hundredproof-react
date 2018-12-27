import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DilutionContext } from '../../contexts/DilutionContext';

import { convertABV, dilute } from './DilutionFunctions';

import Button from '../Button/Button';
import DiluteResults from './DiluteResults';
import Errors from '../Errors/Errors';
import Input from '../Input/Input';
import InputGroup from './InputGroup';
import SegmentedButton from '../SegmentedButton/SegmentedButton';
import UnitSelect from '../UnitSelect/UnitSelect';

import styles from './DilutionTools.module.scss';

class DilutionTools extends Component {
  constructor(props) {
    super(props);

    const defaults = {
      displayUnits: 'ounce',
      measure: 'proof',
      translatedUnit: 'teaspoon',
      unit: 'shot',
      volume: 'start'
    };

    const startingABV = convertABV(defaults.measure, 50);
    const desiredABV = convertABV(defaults.measure, 40);

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
      updateResults: this.updateResults,
      unit: defaults.unit,
      volume: defaults.volume
    };
  }

  static propTypes = {
    diluteData: PropTypes.shape({
      amount: PropTypes.number,
      desiredABV: PropTypes.number,
      displayMeasure: PropTypes.number,
      displayMeasureUnit: PropTypes.string,
      displayResults: PropTypes.number,
      displayUnits: PropTypes.oneOf(['ounce', 'cup']),
      measure: PropTypes.oneOf(['abv', 'proof']),
      resultsOz: PropTypes.number,
      resultsSpirit: PropTypes.number,
      resultsTranslated: PropTypes.number,
      startingABV: PropTypes.number,
      translatedUnit: PropTypes.oneOf(['teaspoon', 'ounce']),
      unit: PropTypes.oneOf(['shot', 'jigger', 'cup']),
      volume: PropTypes.oneOf(['start', 'end'])
    }).isRequired
  };

  static defaultProps = {
    diluteData: {
      amount: 1,
      displayResults: 1,
      displayUnits: 'ounce',
      measure: 'proof',
      resultsOz: 0.25,
      resultsSpirit: 0,
      resultsTranslated: 1.5,
      translatedUnit: 'teaspoon',
      unit: 'shot',
      volume: 'start'
    }
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
        showResults: false
      });
      console.error('ERROR!');
      return '';
    } else {
      this.setState({
        error: null
      });
      return value.trim();
    }
  }

  setVolume = volume => {
    this.setState({
      volume: volume
    });
  };

  setMeasure = measure => {
    const { desiredABV, startingABV, displayMeasure } = this.state;

    this.setState({
      measure: measure,
      desiredABV: convertABV(measure, desiredABV),
      startingABV: convertABV(measure, startingABV),
      displayMeasure: convertABV(measure, displayMeasure),
      displayMeasureUnit: measure
    });
  };

  setAmount = event => {
    const amount = this.checkForError(event.target.value, 1);

    this.setState({
      amount: amount
    });
  };

  setUnits = event => {
    const unit = event.target.value;

    this.setState({
      unit: unit
    });
  };

  setStartingABV = event => {
    const startingABV = this.checkForError(event.target.value, 2);

    this.setState({
      startingABV: startingABV
    });
  };

  setDesiredABV = event => {
    const desiredABV = this.checkForError(event.target.value, 3);

    this.setState({
      desiredABV: desiredABV
    });
  };

  updateResults = event => {
    event.preventDefault();

    const {
      amount,
      desiredABV,
      measure,
      startingABV,
      unit,
      volume
    } = this.state;

    const dilutionResults = dilute(
      amount,
      desiredABV,
      startingABV,
      unit,
      volume
    );

    this.setState({
      resultsOz: dilutionResults.resultsOz,
      resultsSpirit: dilutionResults.resultsSpirit,
      resultsTranslated: dilutionResults.resultsTranslated,
      translatedUnit: dilutionResults.translatedUnit,
      displayResults: dilutionResults.displayResults,
      displayUnits: dilutionResults.displayUnits,
      displayMeasure: desiredABV,
      displayMeasureUnit: measure,
      showResults: true
    });
  };

  render() {
    const {
      amount,
      desiredABV,
      measure,
      showResults,
      startingABV
    } = this.state;

    const measureOptions = [
      {
        label: 'ABV',
        value: 'abv'
      },
      {
        label: 'Proof',
        value: 'proof',
        default: true
      }
    ];

    const volumeOptions = [
      {
        label: 'End Amount',
        value: 'end'
      },
      {
        label: 'Start Amount',
        value: 'start',
        default: true
      }
    ];

    const isError = this.state.error ? true : false;

    return [
      <section className={`${styles.measureHeader} hp-section`} key="0">
        <div>
          <h4 className="hp-heading">I want to set my:</h4>
          <SegmentedButton
            name="volume"
            options={volumeOptions}
            onChange={this.setVolume}
            className={styles.measureButtons}
          />
        </div>
        <div>
          <h4 className="hp-heading">Working with:</h4>
          <SegmentedButton
            name="measure"
            options={measureOptions}
            onChange={this.setMeasure}
            className={styles.measureButtons}
          />
        </div>
      </section>,
      <section className="hp-section hp-app__row" key="1">
        <div className="hp-app__col">
          <h3 className="hp-heading">Starting with ... </h3>
          <div className={styles.inputgroup}>
            <p>I have</p>
            <Input
              autoFocus
              autoSize
              className={styles.input}
              onChange={this.setAmount}
              type="number"
              value={amount}
            />
            <UnitSelect
              amount={amount ? parseInt(amount, 10) : 0}
              setUnits={this.setUnits}
            />
          </div>
          <form onSubmit={this.updateResults}>
            <InputGroup
              onChange={this.setStartingABV}
              measure={measure}
              text="Starting at"
              value={startingABV}
            />
            <InputGroup
              onChange={this.setDesiredABV}
              measure={measure}
              text="I want to end with"
              value={desiredABV}
            />
            <Button
              onClick={this.updateResults}
              text="Update"
              className={styles.submitButton}
              disabled={isError}
            />
            <Errors errorCode={this.state.error} />
          </form>
        </div>
        <div className="hp-app__col">
          {!isError && showResults ? (
            <DilutionContext.Provider value={this.state}>
              <DiluteResults />
            </DilutionContext.Provider>
          ) : null}
        </div>
      </section>
    ];
  }
}

export default DilutionTools;