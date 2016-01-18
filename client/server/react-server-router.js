import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './Html';
import PrettyError from 'pretty-error';
import createStore from '../redux/create';
import history from 'history/lib/createMemoryHistory';
import qs from 'query-string';
import routes from '../routes';
import { router as debug } from '../lib/debug';
import { ReduxRouter } from 'redux-router';
import { reduxReactRouter, match } from 'redux-router/server';
import { Provider } from 'react-redux';


export default function router(req, res) {
  const store = createStore(reduxReactRouter, routes, history);
  const pretty = new PrettyError();

  function hydrateOnClient() {
    res.send('<!doctype html>\n' + ReactDOM.renderToString(<Html assets={global.webpackIsomorphicTools.assets()} store={store}/>)); // eslint-disable-line max-len
  }

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      debug(`ROUTER ERROR: ${pretty.render(error)}`);
      res.status(500);
      hydrateOnClient();
    } else if (!routerState) {
      res.status(500);
      hydrateOnClient();
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search); // eslint-disable-line
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        );

        const status = routerState.routes.reduce((prev, cur) => cur.status || prev, undefined);
        if (status) res.status(status);
        res.send('<!doctype html>\n' + ReactDOM.renderToString(<Html assets={global.webpackIsomorphicTools.assets()} component={component} store={store}/>)); // eslint-disable-line max-len
      }).catch((err) => {
        debug(`DATA FETCHING ERROR: ${pretty.render(err)}`);
        res.status(500);
        hydrateOnClient();
      });
    }
  }));
}
