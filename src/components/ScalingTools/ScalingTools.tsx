import { useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import { Ingredient } from '../../utils/types';
import Errors from '../Errors/Errors';
import Ingredients from '../Ingredients/Ingredients';
import ScalingHeader from '../ScalingHeader/ScalingHeader';
import ScalingResults from '../ScalingResults/ScalingResults';

const emptyIngredient = {
  id: 0,
  value: ''
};

const ScalingTools = () => {
  const [error, setError] = useState<number>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([emptyIngredient]);
  const [scalingFactor, setScalingFactor] = useState(2);
  const [showResults, setShowResults] = useState<boolean>(false);

  console.log('ingredients', ingredients);

  return (
    <ScalingContext.Provider value={{
      error,
      ingredients,
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
            <ScalingResults results={ingredients} />
          ) : null}
        </div>
      </section>
    </ScalingContext.Provider>
  );
};

export default ScalingTools;
