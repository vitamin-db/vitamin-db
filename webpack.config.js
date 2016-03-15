var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/app.js'
  ],
  output: {
        path: __dirname + "/dist",
        filename: "app-bundle.js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
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
    devServer: {
    hot: true
  }
}
// module.exports = {
//   entry: [
//     'webpack-dev-server/client?http://localhost:8080',
//     'webpack/hot/only-dev-server',
//     './client/app.js'
//   ],
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       loader: 'react-hot!babel'
//     }]
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   output: {
//     path: __dirname + '/dist',
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   devServer: {
//     contentBase: './dist',
//     hot: true
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ]