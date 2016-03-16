var webpack = require('webpack');
$ = jQuery = require('jquery');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './client/app.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'app-bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
}