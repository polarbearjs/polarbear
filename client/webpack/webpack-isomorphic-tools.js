import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
export default {
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extensions: ['scss'],
      filter: function(module, regex, options, log) {
        return regex.test(module.name);
      },
      path: function(module, options, log) {
        return module.name;
      },
      parser: function(module, options, log) {
        return module.source;
      }
    }
  }
}
