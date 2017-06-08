const path = require('path');
const webpack = require('webpack');

module.exports = {
	module: {

		preLoaders: [],

		loaders: [
			{ test: /\.(js)$/, exclude: [ /node_modules/ ], loader: 'babel' },
			{ test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},

	resolve: {
		root: path.resolve(__dirname),
		extensions: ['', '.js']
	},

	plugins: [
	],

	devServer: {
		stats: 'minimal'
	},

	devtool: 'source-map'
};
