var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var getMultipageConfig = require('./webpack.hot.config.js').getMultipageConfig

module.exports = {
  entry: getMultipageConfig().entryObj,
  output: {
    path: path.resolve(__dirname, './web'),
    //publicPath: '/',
    filename: '[name].js'
  },
  externals: {
    //'react': 'React'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),

    // 混淆
    new webpack.optimize.UglifyJsPlugin(),
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
	  
    // 抽离CSS文件
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),

    // 不同页面提取公用js
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    
    // 复制文件夹到输出目录
    new CopyWebpackPlugin([{
      from: 'src/mock',
      to: 'mock'
    }, {
      from: 'src/img',
      to: 'img'
    }, {
      from: 'src/font',
      to: 'font'
    }, {
      from: 'src/favicon.ico',
      to: 'favicon.ico'
    }])
  ].concat(getMultipageConfig().htmlWebpackPluginArray),
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      }, {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'radmin')]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000&name=img/[name].[ext]'
      }, {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'url?limit=10000&name=font/[name].[ext]'
      }
    ]
  }
}
