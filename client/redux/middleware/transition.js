import { middleware as debug } from '../../lib/debug';
import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';
import getDataDependencies from '../helpers/get-data-dependencies';

// TODO: This file needs a good scrubbing

const locationsAreEqual = (locA, locB) => {
  return (locA.pathname === locB.pathname) && (locA.search === locB.search);
};

export default ({ getState, dispatch }) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router &&
        locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }

    const { components, location, params } = action.payload;
    const promise = new Promise((resolve) => {
      const doTransition = () => {
        next(action);
        Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
          .then(resolve)
          .catch(error => {
            debug('Warning: Error in fetchDataDeferred', error);
            return resolve();
          });
      };

      Promise.all(getDataDependencies(components, getState, dispatch, location, params))
        .then(doTransition)
        .catch(error => {
          debug('Warning: Error in fetchData', error);
          return doTransition();
        });
    });

    getState().router = promise; // eslint-disable-line

    return promise;
  }

  return next(action);
};
