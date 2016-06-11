import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import createStore from './store/create';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const store = createStore([routerMiddleware(browserHistory)], window.BOOTSTRAP_CLIENT_STATE);
const history = syncHistoryWithStore(browserHistory, store);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} store={store} />
  </Provider>,
  document.getElementById('root')
);
