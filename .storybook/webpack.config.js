const path = require('path');
const webpack = require('webpack');

module.exports = {
	module: {

		preLoaders: [],

		loaders: [
			{ test: /\.(js|jsx)$/, exclude: [ /node_modules/ ], loader: 'babel' },
			{ test: /\.(png|jpg|gif)$/, loader: 'file-loader' },
      { test: /\.(less|css)$/, loader: 'style-loader!css-loader!less-loader' }
		]
	},

	resolve: {
		root: path.resolve(__dirname),
		extensions: ['', '.js', '.jsx']
	},

	plugins: [
	],

	devServer: {
		stats: 'minimal'
	},

	devtool: 'source-map'
};
