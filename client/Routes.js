import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import App from './components/app';
import Snap from './components/Snap';

const propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="snap" component={Snap} />
  </Router>
);

Routes.propTypes = propTypes;

export default Routes;
