/* eslint-disable */
'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractSass = new ExtractTextPlugin('[name].css');
var extractCss = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: {
    applicationStyles: [
      './styles/application.scss',
    ],
    app: ['./index.js'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production') // This has effect on the react lib size
      }
    }),
    extractSass,
    extractCss,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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
      loader: extractCss.extract(['css']),
    }, {
      test: /\.scss$/,
      loader: extractSass.extract(['css', 'sass']),
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
