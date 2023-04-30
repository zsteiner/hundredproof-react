

import DilutionTools from '../components/DilutionTools/DilutionTools';
import Subheader from '../components/Header/Subheader';

const Dilute = () => {
  return (
    <>
      <Subheader heading="Dilute">
        <p>
          Enter your quantity and starting proof or ABV below for boozy,
          arithmetical awesomeness.
        </p>
      </Subheader>
      <article className="hp-app">
        <DilutionTools />
      </article>
    </>
  );
};

export default Dilute;
