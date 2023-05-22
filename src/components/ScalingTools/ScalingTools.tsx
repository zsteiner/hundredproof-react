import { useEffect, useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import { emptyIngredient } from '../../utils/constants';
import { processIngredients } from '../../utils/processIngredients';
import { scaleIngredients } from '../../utils/scaleIngredients';
import { Ingredient } from '../../utils/types';
import Errors from '../Errors/Errors';
import Ingredients from '../Ingredients/Ingredients';
import ScalingHeader from '../ScalingHeader/ScalingHeader';
import ScalingResults from '../ScalingResults/ScalingResults';

const ScalingTools = () => {
  const [error, setError] = useState<number>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([emptyIngredient]);
  const [processedIngredients, setProcessedIngredients] = useState<Ingredient[]>(ingredients);
  const [scalingFactor, setScalingFactor] = useState<number | undefined>(2);
  const [results, setResults] = useState<Ingredient[]>(ingredients);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    setProcessedIngredients(processIngredients(ingredients));
  }, [ingredients]);

  useEffect(() => {
    setResults(scaleIngredients({ ingredients: processedIngredients, scalingFactor }));
  }, [processedIngredients, scalingFactor]);

  return (
    <ScalingContext.Provider value={{
      error,
      ingredients,
      processedIngredients,
      setIngredients,
      setError,
      scalingFactor,
      setScalingFactor,
      showResults,
      setShowResults,
    }}>
      <ScalingHeader />
      <section className="hp-section hp-app__row">
        <div className="hp-app__col">
          <h3 className="hp-heading">Original Recipe</h3>
          <Ingredients />
          {error ? <Errors errorCode={error} /> : null}
        </div>
        <div className="hp-app__col">
          <h3 className="hp-heading">Scaled Recipe</h3>
          {!error && showResults ? (
            <ScalingResults results={results} />
          ) : null}
        </div>
      </section>
    </ScalingContext.Provider>
  );
};

export default ScalingTools;
