import pluralize from 'pluralize';
import { useContext } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import styles from './DilutionResults.module.css';

const DiluteResults = () => {
  const { results } = useContext(DilutionContext);
  const {
    displayMeasure,
    displayMeasureUnit,
    displayResults,
    displayUnits,
    finalAmountSpirit,
    finalAmountSpiritTranslated,
    resultsOz,
    resultsTranslated,
    translatedUnit,
    volume,
  } = results;

  const isVolEnd = volume === 'end';
  const isABV = displayMeasureUnit === 'abv';
  const measure = isABV ? '%' : ` ${displayMeasureUnit}`;
  const measurePrefix = isABV ? 'ABV' : null;

  return (
    <>
      <h3 className="hp-heading">
        You Should {isVolEnd ? 'Combine' : 'Add'}
      </h3>
      <div className={styles.results}>
        <div className={styles.resultsGroup}>
          <ResultsBlock
            result={{
              id: 0,
              amount: resultsOz,
              ingredient: 'water',
              unit: 'ounce',
            }}
          />
          {isVolEnd ? (
            <ResultsBlock
              result={{
                id: 1,
                amount: finalAmountSpirit,
                ingredient: 'spirits',
                unit: 'ounce',
              }}
              showPlus
            />
          ) : null}
          <p className={styles.resultsDivider}>or about</p>
          <ResultsBlock
            result={{
              id: 2,
              amount: resultsTranslated,
              ingredient: 'water',
              unit: translatedUnit
            }}
          />
          {isVolEnd ? (
            <ResultsBlock
              result={{
                id: 3,
                amount: finalAmountSpiritTranslated,
                ingredient: 'spirits',
                unit: translatedUnit,
              }}
              showPlus
            />
          ) : null}
        </div>
      </div>
      <h3 className="hp-heading">To Make</h3>
      <div className={styles.results}>
        <div className={styles.resultsGroup}>
          <p>
            <span className={styles.resultsNumber}>{displayResults.toLocaleString('en-us')}</span>{' '}
            <span className={styles.unit}>
              {pluralize(displayUnits, displayResults)}
            </span>{' '}
            of {measurePrefix} {displayMeasure}
            {measure} spirit.
          </p>
        </div>
      </div>
    </>
  );
};

export default DiluteResults;
