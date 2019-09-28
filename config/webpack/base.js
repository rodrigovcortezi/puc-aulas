const appPath = require('app-root-path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	devtool: isProduction ? false : '#cheap-module-source-map',
	output: {
		path: appPath.resolve('dist'),
		publicPath: '/dist/',
		filename: '[name][chunkhash].js'
	},
	resolve: {
		alias: {
			'@': appPath.resolve('vue'),
			'public': appPath.resolve('public')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						preserveWhitespace: false
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	performance: {
		hints: false
	},
	plugins: [
		new VueLoaderPlugin(),
		new FriendlyErrorsPlugin()
	]
}
