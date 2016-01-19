import express from 'express';
import { error as debug } from '../lib/debug';
const router = express.Router();

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (router.get('env') === 'development') {
  // will print stacktrace
  // development error handler
  router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    debug(err);
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    debug(err);
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  });
}

export default router;
