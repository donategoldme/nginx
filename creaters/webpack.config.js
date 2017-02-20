var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var projectRootPath = path.resolve(__dirname, './');
var assetsPath = path.resolve(projectRootPath, '../static/dist/');
var outputJs = path.resolve(assetsPath, './js/');
var outputHtml = path.resolve(assetsPath, './html/');
var fileName = '[name]-[hash].js';
var standardDonatePath = path.resolve(projectRootPath, "./src/standardDonate/");
var youtubePath = path.resolve(projectRootPath, "./src/youtube/")

module.exports = {
  entry: {standardDonate: standardDonatePath + '/index.js', youtube: youtubePath + '/index.js'},
  output: {
    path: outputJs,
    filename: fileName,
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/screen/js/'
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
    new CleanPlugin([outputJs, outputHtml], { root: assetsPath }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("init.js"),
    new HtmlWebpackPlugin({
      template: standardDonatePath + '/index.template.ejs',
      filename: '../html/standardWidget.html',
      chunks: ["standardDonate", "init.js"],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: youtubePath + '/index.template.ejs',
      filename: '../html/youtubeWidget.html',
      chunks: ["youtube", "init.js"],
      inject: 'body',
    }),
  ]
};