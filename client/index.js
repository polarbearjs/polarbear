import React from 'react';
import ReactDOM from 'react-dom';
import createRouter from './Routes';
import createStore from './store/create';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

const reduxRouterMiddleware = syncHistory(browserHistory);
const store = createStore([reduxRouterMiddleware], window.BOOTSTRAP_CLIENT_STATE);

ReactDOM.render(
  <Provider store={store}>
    {createRouter({ history: browserHistory })}
  </Provider>,
  document.getElementById('root')
);
