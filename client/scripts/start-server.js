import app from '../server';
import { server as debug } from '../lib/debug';
import http from 'http';

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
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
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
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  debug(`Listening on ${addr.address} at ${addr.port} PID ${process.pid}`);
}

/**
 * Event listener for shutdown.
 */

function shutdown() {
  debug('shutdown:Attempting shutdown');
  const addr = server.address();
  const suicide = 2 * 60 * 1000; // 2 mins
  app.set('shutting-down', true);
  server.close(() => {
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

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
