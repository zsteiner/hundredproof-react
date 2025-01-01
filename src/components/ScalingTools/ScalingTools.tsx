'use client';
import { useEffect, useState } from 'react';

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
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    emptyIngredient,
  ]);
  const [processedIngredients, setProcessedIngredients] =
    useState<Ingredient[]>(ingredients);
  const [scalingFactor, setScalingFactor] = useState<number | undefined>(2);
  const [results, setResults] = useState<Ingredient[]>(ingredients);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    setProcessedIngredients(processIngredients(ingredients));

    const newItem = { id: ingredients.length, value: '' };
    const ingredientsLength = ingredients.length;

    if (
      ingredients.length === 1 &&
      !!ingredients[ingredientsLength - 1].value
    ) {
      setIngredients([...ingredients, newItem]);
    }
  }, [ingredients]);

  useEffect(() => {
    setResults(
      scaleIngredients({ ingredients: processedIngredients, scalingFactor }),
    );
  }, [processedIngredients, scalingFactor]);

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
