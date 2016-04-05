/* eslint-disable */
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),

  entry: {
    applicationStyles: [
      './styles/application.scss',
    ],
    app: ['./index.js'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  plugins: [
  ],

  module: {
    preLoaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true
      },
    }],
    loaders: [{
      test: /\.css$/,
      loaders: [ 'style', 'css' ]
    }, {
      test: /\.scss$/,
      loaders: [ 'style', 'css', 'sass' ]
    }, {
      test: /\.png$/,
      loader: 'url?limit=65000&mimetype=image/png&name=public/assets/[name].[ext]',
    }, {
      test: /\.svg$/,
      loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]',
    }, {
      test: /\.woff$/,
      loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]',
    }, {
      test: /\.woff2$/,
      loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]',
    }, {
      test: /\.[ot]tf$/,
      loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]',
    }, {
      test: /\.eot$/,
      loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]',
    }]
  },
  devtool: 'source-map',
  externals: { }
};
