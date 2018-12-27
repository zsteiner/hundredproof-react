import React, { Component } from 'react';

import AppRouter from './components/AppRouter/AppRouter';
import Footer from './components/Footer/Footer';
import IconSet from './components/IconSet/IconSet';

import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <IconSet />
        <div className={styles.pagewrap}>
          <AppRouter />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
