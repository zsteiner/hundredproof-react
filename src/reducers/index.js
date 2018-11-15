import { combineReducers } from 'redux'
import dilute from './dilute'

const hundredProofTools = combineReducers({
  dilute
})

console.log('hundredProofTools', hundredProofTools);

export default hundredProofTools