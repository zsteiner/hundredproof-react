import { Subheader } from '../../components/Header/Subheader';
import { AppLayout } from '../../components/Layout/AppLayout';
import { ScalingTools } from '../../components/ScalingTools/ScalingTools';

export default function Scale() {
  return (
    <>
      <Subheader heading="Scale">
        <p>
          Enter each ingredient like "1 oz gin" or "1.5 shots of whisky" or "2
          dashes of dry vermouth". Let's get this party started.
        </p>
      </Subheader>
      <AppLayout>
        <ScalingTools />
      </AppLayout>
    </>
  );
}
