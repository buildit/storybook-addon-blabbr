const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/register.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'register.js',
    library: 'storybook-addon-blabbr',
    libraryTarget: 'umd'
  },

  externals: {
    "react": {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'react'
    }
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader' },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)$/, loader: ["file-loader"] }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],

  devtool: 'source-map'
};
