import { createStore, compose } from 'redux'
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

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
  hundredProofTools
)

export default store;