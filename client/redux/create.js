import { createStore, applyMiddleware } from 'redux';
import create from './middleware/client';
import transition from './middleware/transition';
import reducer from './modules/reducer';

export default function store(router, routes, history, client, data) {
  const middleware = [create(client), transition];
  const storeWithMiddlware = applyMiddleware(...middleware)(createStore);
  return router({ routes, history })(storeWithMiddlware)(reducer, data);
}
