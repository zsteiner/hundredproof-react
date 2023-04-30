import pluralize from 'pluralize';
import { useContext } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import styles from './DilutionResults.module.scss';

const DiluteResults = () => {
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
  } = useContext(DilutionContext);

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
              amount={finalAmountSpiritTranslated}
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
              {pluralize(displayUnits, parseInt(displayResults))}
            </span>{' '}
            of {measurePrefix} {displayMeasure}
            {measure} spirit.
          </p>
        </div>
      </div>
    </>
  );
}

export default DiluteResults;
