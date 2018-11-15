import { combineReducers, createStore, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import hundredProofTools from './reducers'

export const history = createHistory()

const initialState = {}
const enhancers = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  ...enhancers
)

const reducers = combineReducers(  rootReducer,
  initialState,
  composedEnhancers,
  hundredProofTools
)

const store = createStore(
reducers)

export default store;