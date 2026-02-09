import { Ingredient } from '../../utils/types';
import { ResultsBlock } from '../ResultsBlock/ResultsBlock';
import styles from './ScalingResults.module.css';

type ScalingResultsProps = {
  results: Ingredient[];
};

export const ScalingResults = ({ results }: ScalingResultsProps) => {
  return (
    <ul className={styles.results}>
      {results
        .filter((result) => result.amount && result.unit)
        .map((result) => {
          return (
            <li
              className={styles.resultsItem}
              key={result.id}
            >
              <ResultsBlock result={result} />
            </li>
          );
        })}
    </ul>
  );
};
