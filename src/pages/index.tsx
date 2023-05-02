import Link from 'next/link'

import buttonStyles from '../components/Button/Button.module.scss';
import Subheader from '../components/Header/Subheader';
import styles from './indexPage.module.scss';

const Picker = () => {
  return (
    <>
      <Subheader heading="Math for the modern mixologist." />
      <section className={styles.picker}>
        <div className={styles.pickerItem}>
          <h2>Dilute</h2>
          <h3 className={styles.tagline}>Spirits at the perfect strength.</h3>
          <p>
            Got a bottle of uncut whiskey and unsure how much water to add for
            sipping?
          </p>
          <Link className={buttonStyles.button} href="/dilute">
            get started
          </Link>
        </div>
        <div className={styles.pickerItem}>
          <h2>Scale</h2>
          <h3 className={styles.tagline}>Cocktails for a thirsty crowd.</h3>
          <p>
            Want to make a batch of your favorite drink to share at a party?
          </p>
          <Link className={buttonStyles.button} href="/scale">
            get started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Picker;
