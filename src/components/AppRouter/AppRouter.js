import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dilute from '../../pages/Dilute/Dilute';
import Header from '../Header/Header';
import Picker from '../../pages/Picker/Picker';
import Scale from '../../pages/Scale/Scale';

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Route exact path="/" component={Picker} />{' '}
      <Route exact path="/dilute" component={Dilute} />{' '}
      <Route exact path="/scale" component={Scale} />
    </React.Fragment>
  </Router>
);

export default AppRouter;
