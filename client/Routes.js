import React from 'react';
import { Router, Route } from 'react-router';
import App from './components/app';
import Snap from './components/snap';

export default ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/snap" component={Snap} />
  </Router>
);
