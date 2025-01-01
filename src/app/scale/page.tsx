import { Subheader } from '../../components/Header/Subheader';
import { ScalingTools } from '../../components/ScalingTools/ScalingTools';

const Scale = () => (
  <>
    <Subheader heading="Scale">
      <p>
        Enter each ingredient like "1 oz gin" or "1.5 shots of whisky" or "2
        dashes of dry vermouth". Let's get this party started.
      </p>
    </Subheader>
    <article className="hp-app">
      <ScalingTools />
    </article>
  </>
);

export default Scale;
