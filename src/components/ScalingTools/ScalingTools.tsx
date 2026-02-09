'use client';

import { Errors } from '../Errors/Errors';
import { Heading } from '../Heading/Heading';
import { Ingredients } from '../Ingredients/Ingredients';
import { Layout } from '../Layout/Layout';
import { ScalingHeader } from '../ScalingHeader/ScalingHeader';
import { ScalingResults } from '../ScalingResults/ScalingResults';
import { ScalingMachineProvider, useScaling } from './useScaling';

const ScalingContent = () => {
  const { error, showResults, results } = useScaling();

  return (
    <>
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
    </>
  );
};

export const ScalingTools = () => {
  return (
    <ScalingMachineProvider>
      <ScalingContent />
    </ScalingMachineProvider>
  );
};
