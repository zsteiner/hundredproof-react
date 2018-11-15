import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './DilutionTools.module.scss';

class DiluteResults extends Component {
  static propTypes = {
    displayMeasure: PropTypes.number,
    displayMeasureUnit: PropTypes.string,
    displayResults: PropTypes.number,
    displayUnits: PropTypes.string,
    orginalUnit: PropTypes.string,
    resultsOz: PropTypes.number,
    resultsSpirit: PropTypes.number,
    resultsTranslated: PropTypes.number,    
    translatedUnit: PropTypes.string,
    volume: PropTypes.string,
  };

  render() {
    const {
      displayMeasure,
      displayMeasureUnit,
      displayResults,      
      displayUnits,      
      resultsOz,
      resultsSpirit,
      resultsTranslated,
      translatedUnit,
      volume 
    } = this.props;
    
    const ozClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: resultsOz !== 1
    });

    const spiritClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: resultsSpirit !== 1
    });

    const translatedClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: resultsTranslated !== 1
    });

    const originalClasses = classNames({
      [styles.unit]: true,
      [styles.plural]: displayResults !== 1
    });
    
    const isVolEnd = volume === 'end';
    const isABV = displayMeasureUnit === 'abv';

    const measure = isABV ? '%' : ` ${displayMeasureUnit}`;
    const measurePrefix = isABV ? 'ABV' : null;
    
    return [
    	  <h3 className="hp-heading" key='0'>You Should Add...</h3>,    		
    		<div className={styles.results} key='1'> 
        <div className={styles.resultsGroup}>   
        		<p>
          		<span className={styles.resultsNumber}>{ resultsOz }</span> <span className={ozClasses}>ounce</span> 
          		{ isVolEnd ? <span> to <span className={styles.resultsNumber}>{ resultsSpirit }</span> <span className={spiritClasses}>ounce</span> of spirits</span> : null }
        		</p>
        		<div className={styles.resultsDivider}>or about</div>
        		<p><span className={styles.resultsNumber}>{ resultsTranslated }</span> <span className={translatedClasses}>{ translatedUnit }</span></p>
          <p className={styles.resultsText}>of water.</p>
        </div>
      </div>,            		
      <h3 className="hp-heading" key='2'>To Make</h3>,
    		<div className={styles.results} key='3'> 
        <div className={styles.resultsGroup}>   
        		<p><span className={styles.resultsNumber}>{  displayResults }</span> <span className={originalClasses}>{ displayUnits }</span></p>
        		<div className={styles.resultsDivider}>of</div>
        		<p className={styles.resultsText}>{ measurePrefix } { displayMeasure }{ measure } spirit.</p>
      		</div>
    		</div>
    ];
  }
}

export default DiluteResults;