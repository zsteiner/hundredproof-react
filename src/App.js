import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Dilute from './pages/Dilute/Dilute';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import IconSet from './components/IconSet/IconSet';
import Picker from './pages/Picker/Picker';
import Scale from './pages/Scale/Scale';

import styles from './App.module.scss';

class App extends Component {
  render() {
    return [
      <IconSet key='0' />,
      <div className={styles.pagewrap} key='1'>
        <Header />
        <Route exact path="/" component={Picker} />
        <Route exact path="/dilute" component={Dilute} />
        <Route exact path="/scale" component={Scale} />
      </div>,
      <Footer key='2' />
    ];
  }
}

export default App;
