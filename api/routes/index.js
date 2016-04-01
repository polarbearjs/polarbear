export function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply({ hello: 'world' });
    },
  });
  next();
}

register.attributes = {
  name: 'index',
};
