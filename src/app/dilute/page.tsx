import { DilutionTools } from '../../components/DilutionTools/DilutionTools';
import { Subheader } from '../../components/Header/Subheader';
import { AppLayout } from '../../components/Layout/AppLayout';

export default function Dilute() {
  return (
    <>
      <Subheader heading="Dilute">
        <p>
          Enter your quantity and starting proof or ABV below for boozy,
          arithmetical awesomeness.
        </p>
      </Subheader>
      <AppLayout>
        <DilutionTools />
      </AppLayout>
    </>
  );
}
