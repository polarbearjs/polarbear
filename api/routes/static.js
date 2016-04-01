export function register(server, options, next) {
  /* Serve static files from public folder */
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: 'public',
        },
      },
    },
  });
  next();
}

register.attributes = {
  name: 'static',
};
