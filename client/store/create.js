import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routeReducer } from 'react-router-redux';
import reducers from '../reducers';

const reducer = combineReducers({
  ...reducers,
  routing: routeReducer,
});

const configureStore = (middleware = [], initialState = {}) => {
  return compose(
    applyMiddleware([...middleware, ...thunkMiddleware])
  )(createStore)(reducer, initialState);
};

export default configureStore;
