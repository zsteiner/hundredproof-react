'use client';

import { AmountSelector } from '../AmountSelector/AmountSelector';
import { DiluteResults } from '../DilutionResults/DiluteResults';
import { DilutionValues } from '../DilutionValues/DilutionValues';
import { Errors } from '../Errors/Errors';
import { Heading } from '../Heading/Heading';
import { Layout } from '../Layout/Layout';
import { MeasureHeader } from '../MeasureHeader/MeasureHeader';
import { DilutionMachineProvider, useDilution } from './useDilution';

const DilutionContent = () => {
  const { error, showResults } = useDilution();

  return (
    <>
      <MeasureHeader />
      <Layout>
        <Layout.Column>
          <Heading as="h3">Starting with</Heading>
          <AmountSelector />
          <DilutionValues />
          {error ? <Errors errorCode={error} /> : null}
        </Layout.Column>
        <Layout.Column>{showResults ? <DiluteResults /> : null}</Layout.Column>
      </Layout>
    </>
  );
};

export const DilutionTools = () => {
  return (
    <DilutionMachineProvider>
      <DilutionContent />
    </DilutionMachineProvider>
  );
};
