const path = require('path');
const merge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devPlugins = require("./webpack.dev.config");
const prodPlugins = require("./webpack.prod.config");


module.exports = (env) => {
	const isProdBuild = (env && env.prod);
	const sharedConfig = {
		"devtool": "source-map",
		"resolve": {
			"extensions": [
				".ts",
				".js"
			],
			"modules": [
				"./node_modules"
			]
		},
		"resolveLoader": {
			"modules": [
				"./node_modules"
			]
		},
		"entry": {
			"main": [
				"./ClientApp\\main.ts"
			],
			"polyfills": [
				"./ClientApp\\polyfills.ts"
			],
			"styles": [
				"./ClientApp\\styles.css"
			]
		},
		"output": {
			"library": ['main']
		},
		"module": {
			"rules": [
				{
					"enforce": "pre",
					"test": /\.js$/,
					"loader": "source-map-loader",
					"exclude": [
						/\/node_modules\//
					]
				},
				{
					"test": /\.json$/,
					"loader": "json-loader"
				},
				{
					"test": /\.html$/,
					"loader": "raw-loader"
				},
				{
					"test": /\.(eot|svg)$/,
					"loader": "file-loader?name=[name].[ext]"
				},
				{
					"test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
					"loader": "url-loader?name=[name].[ext]&limit=10000"
				},
				{
					"exclude": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.css$/,
					"loaders": [
						"exports-loader?module.exports.toString()",
						"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
						"postcss-loader"
					]
				},
				{
					"exclude": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.scss$|\.sass$/,
					"loaders": [
						"exports-loader?module.exports.toString()",
						"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
						"postcss-loader",
						"sass-loader"
					]
				},
				{
					"exclude": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.less$/,
					"loaders": [
						"exports-loader?module.exports.toString()",
						"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
						"postcss-loader",
						"less-loader"
					]
				},
				{
					"exclude": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.styl$/,
					"loaders": [
						"exports-loader?module.exports.toString()",
						"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
						"postcss-loader",
						"stylus-loader?{\"sourceMap\":true,\"paths\":[]}"
					]
				},
				{
					"include": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.css$/,
					"loaders": ExtractTextPlugin.extract({
						"use": [
							"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
							"postcss-loader"
						],
						"fallback": "style-loader"
					})
				},
				{
					"include": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.scss$|\.sass$/,
					"loaders": ExtractTextPlugin.extract({
						"use": [
							"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
							"postcss-loader",
							"sass-loader"
						],
						"fallback": "style-loader"
					})
				},
				{
					"include": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.less$/,
					"loaders": ExtractTextPlugin.extract({
						"use": [
							"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
							"postcss-loader",
							"less-loader"
						],
						"fallback": "style-loader"
					})
				},
				{
					"include": [
						path.join(process.cwd(), "ClientApp\\styles.css")
					],
					"test": /\.styl$/,
					"loaders": ExtractTextPlugin.extract({
						"use": [
							"css-loader?{\"sourceMap\":true,\"importLoaders\":1}",
							"postcss-loader",
							"stylus-loader?{\"sourceMap\":true,\"paths\":[]}"
						],
						"fallback": "style-loader"
					})
				},
				{
					"test": /\.ts$/,
					"loader": "@ngtools/webpack"
				}
			]
		},
		"node": {
			"fs": "empty",
			"global": true,
			"crypto": "empty",
			"tls": "empty",
			"net": "empty",
			"process": true,
			"module": false,
			"clearImmediate": false,
			"setImmediate": false
		}
	};

	return merge(isProdBuild ? prodPlugins() : devPlugins(), sharedConfig);
}