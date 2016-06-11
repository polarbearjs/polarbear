import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import reducers from '../reducers';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const configureStore = (middleware = [], initialState = {}) => (
  applyMiddleware.apply(
    this,
    [...middleware, thunkMiddleware]
  )(createStore)(reducer, initialState)
);

export default configureStore;
