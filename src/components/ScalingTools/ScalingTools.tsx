'use client';
import { useMemo, useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import { emptyIngredient } from '../../utils/constants';
import { processIngredients } from '../../utils/processIngredients';
import { scaleIngredients } from '../../utils/scaleIngredients';
import { Ingredient } from '../../utils/types';
import { Errors } from '../Errors/Errors';
import { Heading } from '../Heading/Heading';
import { Ingredients } from '../Ingredients/Ingredients';
import { Layout } from '../Layout/Layout';
import { ScalingHeader } from '../ScalingHeader/ScalingHeader';
import { ScalingResults } from '../ScalingResults/ScalingResults';

export const ScalingTools = () => {
  const [error, setError] = useState<number>();
  const [ingredients, setIngredientsRaw] = useState<Ingredient[]>([
    emptyIngredient,
  ]);
  const [scalingFactor, setScalingFactor] = useState<number | undefined>(2);
  const [showResults, setShowResults] = useState<boolean>(false);

  const setIngredients = (newIngredients: Ingredient[]) => {
    const lastItem = newIngredients[newIngredients.length - 1];

    if (newIngredients.length === 1 && !!lastItem.value) {
      const newItem = { id: newIngredients.length, value: '' };
      setIngredientsRaw([...newIngredients, newItem]);
    } else {
      setIngredientsRaw(newIngredients);
    }
  };

  const processedIngredients = useMemo(
    () => processIngredients(ingredients),
    [ingredients],
  );

  const results = useMemo(
    () =>
      scaleIngredients({ ingredients: processedIngredients, scalingFactor }),
    [processedIngredients, scalingFactor],
  );

  return (
    <ScalingContext.Provider
      value={{
        error,
        ingredients,
        processedIngredients,
        setIngredients,
        setError,
        scalingFactor,
        setScalingFactor,
        showResults,
        setShowResults,
      }}
    >
      <ScalingHeader />
      <Layout>
        <Layout.Column>
          <Heading as="h3">Original Recipe</Heading>
          <Ingredients />
          {error ? <Errors errorCode={error} /> : null}
        </Layout.Column>
        <Layout.Column>
          <Heading as="h3">Scaled Recipe</Heading>
          {!error && showResults ? <ScalingResults results={results} /> : null}
        </Layout.Column>
      </Layout>
    </ScalingContext.Provider>
  );
};
