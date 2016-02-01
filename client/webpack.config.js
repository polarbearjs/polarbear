/* eslint-disable */
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production') // This has effect on the react lib size
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })

  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
      // Pass *.jsx files through jsx-loader transform
      /*{
        test: /\.jsx$/,
        loaders: 'babel'
      }*/
    ]
  },
  devtool: 'source-map',
  externals: { }
};
