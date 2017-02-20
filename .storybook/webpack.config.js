const path = require('path');
const webpack = require('webpack');

module.exports = {
	module: {

		preLoaders: [],

		loaders: [
			{ test: /\.(js|jsx)$/, exclude: [ /node_modules/ ], loader: 'babel' },
			{ test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(eot|ttf|svg|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
		]
	},

	resolve: {
		root: path.resolve(__dirname),
		extensions: ['', '.js', '.jsx'],
    alias: {
      'blabbr-config': path.join(path.resolve(__dirname), '../config/blabbr-config.js')
    }
	},

	plugins: [
	],

	devServer: {
		stats: 'minimal'
	},

	devtool: 'source-map'
};
