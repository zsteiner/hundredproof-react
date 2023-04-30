import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import styles from './DilutionResults.module.scss';

class DiluteResults extends Component {
  static contextType = DilutionContext;

  static propTypes = {
    displayMeasure: PropTypes.number,
    displayMeasureUnit: PropTypes.string,
    displayResults: PropTypes.number,
    displayUnits: PropTypes.string,
    orginalUnit: PropTypes.string,
    resultsOz: PropTypes.number,
    resultsSpirit: PropTypes.number,
    resultsTranslated: PropTypes.number,
    translatedUnit: PropTypes.string,
    volume: PropTypes.string,
  };

  render() {
    const {
      displayMeasure,
      displayMeasureUnit,
      displayResults,
      displayUnits,
      finalAmountSpirit,
      resultsOz,
      resultsTranslated,
      translatedUnit,
      volume,
    } = this.context;

    const isVolEnd = volume === 'end';
    const isABV = displayMeasureUnit === 'abv';

    const measure = isABV ? '%' : ` ${displayMeasureUnit}`;
    const measurePrefix = isABV ? 'ABV' : null;

    return (
      <DilutionContext.Consumer>
        {(context) => (
          <React.Fragment>
            <h3 className="hp-heading">
              You Should {isVolEnd ? 'Combine' : 'Add'}
            </h3>
            <div className={styles.results}>
              <div className={styles.resultsGroup}>
                <ResultsBlock
                  amount={resultsOz}
                  ingredient="water"
                  unit="ounce"
                />
                {isVolEnd ? (
                  <ResultsBlock
                    amount={finalAmountSpirit}
                    ingredient="spirits"
                    showPlus
                    unit="ounce"
                  />
                ) : null}
                <p className={styles.resultsDivider}>or about</p>
                <ResultsBlock
                  amount={resultsTranslated}
                  ingredient="water"
                  unit={translatedUnit}
                />
                {isVolEnd ? (
                  <ResultsBlock
                    amount={context.finalAmountSpiritTranslated}
                    ingredient="spirits"
                    showPlus
                    unit={translatedUnit}
                  />
                ) : null}
              </div>
            </div>
            <h3 className="hp-heading">To Make</h3>
            <div className={styles.results}>
              <div className={styles.resultsGroup}>
                <p>
                  <span className={styles.resultsNumber}>{displayResults}</span>{' '}
                  <span className={styles.unit}>
                    {pluralize(displayUnits, displayResults)}
                  </span>{' '}
                  of {measurePrefix} {displayMeasure}
                  {measure} spirit.
                </p>
              </div>
            </div>
          </React.Fragment>
        )}
      </DilutionContext.Consumer>
    );
  }
}

export default DiluteResults;
