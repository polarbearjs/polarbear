import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();

// this will be used to tell the server when to stop taking connections
app.set('shutting-down', false);

app.use((req, res, next) => {
  // Timeout connection so the client tries to reconnect once the server is back up
  if (app.settings['shutting-down']) req.connection.setTimeout(1);
  return next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  // will print stacktrace
  // development error handler
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
}

export default app;
