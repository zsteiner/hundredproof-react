import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DilutionContext } from '../../contexts/DilutionContext';

import styles from './DilutionResults.module.scss';
import DilutionResultsBlock from '../DilutionResultsBlock/DilutionResultsBlock';

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
    volume: PropTypes.string
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
      volume
    } = this.context;

    const ozClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: resultsOz !== 1
    });

    const translatedClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: resultsTranslated !== 1
    });

    const originalClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: displayResults !== 1
    });

    const isVolEnd = volume === 'end';
    const isABV = displayMeasureUnit === 'abv';

    const measure = isABV ? '%' : ` ${displayMeasureUnit}`;
    const measurePrefix = isABV ? 'ABV' : null;

    return (
      <DilutionContext.Consumer>
        {context => (
          <React.Fragment>
            <h3 className="hp-heading">
              You Should {isVolEnd ? 'Combine' : 'Add'} ...
            </h3>
            <div className={styles.results}>
              <div className={styles.resultsGroup}>
                <DilutionResultsBlock
                  amount={resultsOz}
                  unit="ounce"
                  liquid="water"
                />
                {isVolEnd ? (
                  <DilutionResultsBlock
                    amount={finalAmountSpirit}
                    unit="ounce"
                    liquid="spirits"
                    showPlus
                  />
                ) : null}
                <p className={styles.resultsDivider}>or about</p>
                <DilutionResultsBlock
                  amount={resultsTranslated}
                  unit={translatedUnit}
                  liquid="water"
                />
                {isVolEnd ? (
                  <DilutionResultsBlock
                    amount={context.finalAmountSpiritTranslated}
                    unit={translatedUnit}
                    liquid="spirits"
                    showPlus
                  />
                ) : null}
              </div>
            </div>
            <h3 className="hp-heading">To Make</h3>
            <div className={styles.results}>
              <div className={styles.resultsGroup}>
                <p>
                  <span className={styles.resultsNumber}>{displayResults}</span>{' '}
                  <span className={originalClasses}>{displayUnits}</span>
                </p>
                <div className={styles.resultsDivider}>of</div>
                <p className={styles.resultsText}>
                  {measurePrefix} {displayMeasure}
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
