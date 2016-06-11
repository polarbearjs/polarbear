import Hapi from 'hapi';
import { register as indexRoutes } from './routes/index';
import { register as staticRoutes } from './routes/static';

const server = new Hapi.Server();

export function createServer({ port }) {
  server.connection({
    port,
    host: '0.0.0.0',
    router: {
      stripTrailingSlash: true,
    },
  });

  server.register([
    {
      register: require('good'),
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: { ops: '*', request: '*', log: '*', response: '*', error: '*' },
        }],
      },
    },
    {
      register: require('inert'),
    },
    {
      register: indexRoutes,
    },
    {
      register: staticRoutes,
    },
  ], (err) => {
    if (err) {
      throw err;
    }

    server.start((startErr) => {
      if (startErr) {
        throw startErr;
      }
    });
  });
  return server.listener;
}

export default server;
