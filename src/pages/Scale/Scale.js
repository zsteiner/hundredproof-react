import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Subheader from '../../components/Header/Subheader';

class Scale extends Component {
  static propTypes = {
    prop: PropTypes.string
  };

  render() {
    return (
      <Subheader>
        <p>Scaling</p>
      </Subheader>
    );
  }
}

export default Scale;
