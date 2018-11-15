import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { dilute } from './DilutionFunctions';
import { saveDilute } from '../../actions';


import Button from '../Button/Button';
import DiluteResults from './DiluteResults';
import Errors from '../Errors/Errors';
import Input from '../Input/Input';
import InputGroup from './InputGroup';
import SegmentedButton from '../SegmentedButton/SegmentedButton';
import UnitSelect from '../UnitSelect/UnitSelect';

import styles from './DilutionTools.module.scss';

class DilutionTools extends Component {
  constructor(props) {
    super(props);
    
    const measure = this.props.measure;
    const startingABV = measure === 'abv' ? 50 : 100;
    const desiredABV = measure === 'abv' ? 40 : 80;

    this.state = {
      amount: 1,
      desiredABV: desiredABV,      
      displayMeasure: desiredABV,
      displayMeasureUnit: measure,
      displayResults: 1,
      displayUnits: 'ounce',
      measure: this.props.measure,
      resultsOz: .25,
      resultsSpirit: 0,
      resultsTranslated: 1.5,
      startingABV: startingABV,
      showResults: true,
      translatedUnit: 'teaspoon',
      unit: 'shot',
      volume: 'start',
    };
  }

  static propTypes = {
    diluteData: PropTypes.shape({
      amount: PropTypes.number,
      desiredABV: PropTypes.number,      
      displayMeasure: PropTypes.number,
      displayMeasureUnit: PropTypes.string,
      displayResults: PropTypes.number,
      displayUnits: PropTypes.oneOf(['ounce', 'cup']),
      measure: PropTypes.oneOf(['abv', 'proof']),
      resultsOz: PropTypes.number,
      resultsSpirit: PropTypes.number,
      resultsTranslated: PropTypes.number,
      startingABV: PropTypes.number,
      translatedUnit: PropTypes.oneOf(['teaspoon', 'ounce']),
      unit: PropTypes.oneOf(['shot','jigger','cup']),
      volume: PropTypes.oneOf(['start','end']),
    }).isRequired,
    saveDilute: PropTypes.func.isRequired
  };

  static defaultProps = {
    diluteData: {
      amount: 1,
      displayResults: 1,
      displayUnits: 'ounce',
      measure: 'proof',
      resultsOz: .25,
      resultsSpirit: 0,
      resultsTranslated: 1.5,
      translatedUnit: 'teaspoon',
      unit: 'shot',
      volume: 'start',
    }
  };
  
  componentDidMount() {
    this.updateResults();
  }
  
  convertABV(measure, value) {
    return measure === 'proof' ? (value * 2) : (value / 2);
  }
  
  checkForError(value, code) {
    if( isNaN(value) || value === '' ) {
      this.setState({
        error: code,
        resultsOz: 0,
        resultsTranslated: 0,
        translatedUnit: 0,
        displayResults: 0,
        displayMeasure: 0,
        showResults: false
      });
      console.error('ERROR!');
      return '';
    } else {
      this.setState({
        error: null
      });
      return value.trim();
    }
  }
  
  setVolume = (volume) => {    
    this.setState({
      volume: volume
    });
  }

  setMeasure = (measure) => {    
    const { desiredABV, startingABV, displayMeasure } = this.state;

    this.setState({
      measure: measure,
      desiredABV: this.convertABV(measure, desiredABV),
      startingABV: this.convertABV(measure, startingABV),
      displayMeasure: this.convertABV(measure, displayMeasure),
      displayMeasureUnit: measure
    });
  }

  setAmount = (event) => {
    const amount = this.checkForError(event.target.value, 1);
    
    this.setState({
      amount: amount
    });
  }

  setUnits = (event) => {
    const unit = event.target.value;

    this.setState({
      unit: unit
    });
  }

  setStartingABV = (event) => {
    const startingABV = this.checkForError(event.target.value, 2);

    this.setState({
      startingABV: startingABV
    });
  }

  setDesiredABV = (event) => {
    const desiredABV = this.checkForError(event.target.value, 3);

    this.setState({
      desiredABV: desiredABV
    });
  }
  
  updateResults = () => {
    const { amount, measure, desiredABV, startingABV, unit, volume } = this.state;
  
    const dilutionResults = dilute(amount, desiredABV, startingABV, unit, volume);
    
    const resultsSpirit = dilutionResults[1]
    const resultsOz = dilutionResults[2]
    const displayUnits = dilutionResults[3]
    const displayResults =  dilutionResults[4]
    const resultsTranslated = dilutionResults[5]
    const translatedUnit = dilutionResults[6]
    
    this.props.saveDilute();
        
    this.setState({
      resultsOz: resultsOz,
      resultsSpirit: resultsSpirit,
      resultsTranslated: resultsTranslated,
      translatedUnit: translatedUnit,
      displayResults: displayResults,
      displayUnits: displayUnits,
      displayMeasure: desiredABV,
      displayMeasureUnit: measure,
      showResults: true
    });
  }
  
  render() {
    const { amount, 
            desiredABV,
            displayMeasure,
            displayMeasureUnit,
            displayResults,
            displayUnits,
            measure,
            resultsOz,
            resultsSpirit,
            resultsTranslated,
            showResults, 
            startingABV, 
            translatedUnit, 
            unit,
            volume 
          } = this.state;

    const measureOptions = [
      {
        label: 'ABV',
        value: 'abv',
      },
      {
        label: 'Proof',
        value: 'proof',
        default: true
      },
    ];

    const volumeOptions = [
      {
        label: 'End Amount',
        value: 'end',
      },
      {
        label: 'Start Amount',
        value: 'start',
        default: true
      },
    ];
    
    const isError = this.state.error ? true : false; 

    return [
    		<section className={`${styles.measureHeader} hp-section`} key='0'>    
        <div>
          	<h4 className="hp-heading">I want to set my:</h4>
        	  <SegmentedButton 
        	    name='volume'
        	    options={volumeOptions}
        	    onChange={this.setVolume}
        	    className={styles.measureButtons}
        	  />  
        </div>
        	<div>
          	<h4 className="hp-heading">Working with:</h4>
        	  <SegmentedButton 
        	    name='measure'
        	    options={measureOptions}
        	    onChange={this.setMeasure}
        	    className={styles.measureButtons}
        	  />
      	  </div>  
    		</section>,
      	<section className="hp-section hp-app__row" key='1'>
        	<div className="hp-app__col"> 
        	  <h3 className="hp-heading">Starting with ... </h3>
        	  <div className={styles.inputgroup}>
          	  <p>I have</p>
          	  <Input 
            	  autoFocus
            	  autoSize
            	  className={styles.input}
            	  onChange={this.setAmount}
            	  type='number'
            	  value={amount}
          	  />
          	  <UnitSelect 
            	  amount={ amount ? parseInt(amount, 10) : 0 }
            	  setUnits={this.setUnits}
          	  />
        	  </div>
        	  <InputGroup 
            onChange={this.setStartingABV}
            measure={measure}
            text="Starting at"
            value={startingABV}        	  
        	  />
        	  <InputGroup 
            onChange={this.setDesiredABV}
            measure={measure}
            text="I want to end with"
            value={desiredABV}        	  
        	  />
        	  <Button 
          	  onClick={this.updateResults}
          	  text='Update' 
          	  className={styles.submitButton} 
          	  disabled={isError}
        	  />
        	  <Errors errorCode={this.state.error} />
        	</div>
        	<div className="hp-app__col"> 
        	  { !isError && showResults ? <DiluteResults 
            displayMeasure={displayMeasure}
            displayMeasureUnit={displayMeasureUnit}
            displayResults={displayResults}
            displayUnits={displayUnits}
            resultsOz={resultsOz}
            resultsSpirit={resultsSpirit}
            resultsTranslated={resultsTranslated}
            translatedUnit={translatedUnit}
            orginalUnit={unit}
            volume={volume}
        	  /> : null }
        	</div>
      </section>
    ];
  }
}

const mapStateToProps = state => {
  return {
    diluteData: state.diluteData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveDilute: () => {
      dispatch(saveDilute(ownProps.diluteData))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(DilutionTools);