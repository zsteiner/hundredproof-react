import { Ingredient } from '../../utils/types';
import { ResultsBlock } from '../ResultsBlock/ResultsBlock';
import styles from './ScalingResults.module.css';

type ScalingResultsProps = {
  results: Ingredient[];
};

export const ScalingResults = ({ results }: ScalingResultsProps) => {
  return (
    <ul className={`${styles.results} hp-clearlist`}>
      {results
        .filter((result) => result.amount && result.unit)
        .map((result, index) => {
          return (
            <li
              className={styles.resultsItem}
              key={index}
            >
              <ResultsBlock result={result} />
            </li>
          );
        })}
    </ul>
  );
};
