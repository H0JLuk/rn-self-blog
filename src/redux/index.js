import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { postReducer } from './reducers/post'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const rootReducer = combineReducers({
  post: postReducer,
})

const enhancer = composeEnhancers ? composeEnhancers(applyMiddleware(thunk)) : applyMiddleware(thunk)

export default createStore(rootReducer, enhancer)
