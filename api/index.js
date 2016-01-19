import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import errors from './routes/error-handling';
import compression from 'compression';

const app = express();

// this will be used to tell the server when to stop taking connections
app.set('shutting-down', false);
app.use(compression());
app.use(logger('dev'));
app.use((req, res, next) => {
  // Timeout connection so the client tries to reconnect once the server is back up
  if (app.settings['shutting-down']) req.connection.setTimeout(1);
  return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(errors);


export default app;
