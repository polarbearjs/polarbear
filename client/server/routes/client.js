import { match } from 'react-router';
import renderLayout from '../render-layout';
import render from '../render';
import createStore from '../../store/create';
import createRoutes from '../../Routes';

const store = createStore();
const initialState = store.getState();
const routes = createRoutes({});

export default (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      const err = new Error(error.message);
      err.status = 500;
      return next(err);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const rootMarkup = render(renderProps, store);
      res.status(200).send(renderLayout({ rootMarkup, initialState }));
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  });
};
