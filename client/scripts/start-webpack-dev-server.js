import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const compiler = webpack(config);

// Live reload
config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${process.env.DEV_SERVER_PORT}/`);

const server = new WebpackDevServer(compiler, {
  contentBase: '/dist',
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  filename: 'app.js',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  headers: { 'X-Custom-Header': 'yes' },
  stats: { colors: true },
  proxy: {
    '*': {
      target: `http://localhost:${process.env.PORT}`,
    },
  },
});

server.listen(
  process.env.DEV_SERVER_PORT || 8080,
  'localhost',
);
