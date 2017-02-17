var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './dist/js/');
var fileName = '[name].js'

module.exports = {
  entry: {standardDonate: './src/standardDonate/index.js', youtube: './src/youtube/index.js'},
  output: {
    path: assetsPath,
    filename: fileName,
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/js/'
  },
  module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
              test: /\.scss$/,
              use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
  plugins: [
    new CleanPlugin([assetsPath + '/' + fileName], { root: projectRootPath }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
};