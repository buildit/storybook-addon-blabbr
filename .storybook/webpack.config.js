const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname), 'node_modules']
  },

  devServer: {
    stats: 'minimal'
  },

  devtool: 'source-map'
};
