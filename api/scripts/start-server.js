import server, { createServer } from '../';
import http from 'http';
import { server as debug } from '../lib/debug';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
/**
 * Create HTTP httpServer.
 */

const httpServer = createServer({ port, http });

/**
 * Event listener for HTTP httpServer "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges'); // eslint-disable-line no-console
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use'); // eslint-disable-line no-console
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP httpServer "listening" event.
 */

function onListening() {
  const addr = httpServer.address();
  debug(`Listening on ${addr.address} at ${addr.port} PID ${process.pid}`);
}

/**
 * Event listener for shutdown.
 */

function shutdown() {
  debug('shutdown:Attempting shutdown');
  const addr = httpServer.address();
  const suicide = 2 * 60 * 1000; // 2 mins
  server.app.shuttingDown = true;
  httpServer.close(() => {
    debug(`shutdown:Shutting down server PID ${process.pid} on ${addr.address} at ${addr.port}`);
    process.exit(0);
  });
  setTimeout(() => {
    debug(`shutdown:Some connections left open server PID ${process.pid} on ${addr.address} at ${addr.port}`); // eslint-disable-line max-len
    process.exit(1);
  }, suicide);
}

/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.on('error', onError);
httpServer.on('listening', onListening);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

httpServer.listen(port);
