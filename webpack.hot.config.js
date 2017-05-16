var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var fs = require('fs')

// 获取多页面配置的方法
var getMultipageConfig = function(port) {
  // 读取src下所有html入口页面名称
  var fileNames = fs.readdirSync('src')
  var entryNames = []
  var extNames = ['.html', '.htm']
  fileNames.map(function(fileName) {
    extNames.map(function(extName) {
      if(fileName.lastIndexOf(extName) > 0 && fileName.lastIndexOf(extName) === (fileName.length - extName.length)) {
        entryNames.push(fileName.substring(0, fileName.lastIndexOf(extName)))
      }
    })
  })

  // 创建入口配置，分为hot和production环境两种
  var entryObj = {}
  entryNames.map(function(entryName) {
    if (port) {
      entryObj[entryName] = [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, './src/js/' + entryName)
      ]
    } else {
      entryObj[entryName] = [
        path.resolve(__dirname, './src/js/' + entryName)
      ]
    }
  })
  
  // 创建入口页面生成配置
  var htmlWebpackPluginArray = entryNames.map(function(entryName) {
    return new HtmlWebpackPlugin({
      filename: entryName + '.html',
      template: 'src/' + entryName + '.html',
      inject: true,
      hash: true,
      chunks: ['common.js', entryName]
    })
  })

  return {entryObj: entryObj, htmlWebpackPluginArray: htmlWebpackPluginArray}
}

var getHotConfigWithPort = function(port) {
  return {
    devtool: 'inline-source-map',
    entry: getMultipageConfig(port).entryObj,
    output: {
      path: path.resolve(__dirname, 'hot'),
      publicPath: '/',
      filename: '[name].js'
    },
    externals: {
      //'react': 'React'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      
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
      alias: {
        radmin: path.join(__dirname, './components'),
      },
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.(less|css)$/,
          loader: 'style!css!less'
        }, {
          test: /\.js$/,
          loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
          exclude: /node_modules/,
          include: [path.join(__dirname, 'src'), path.join(__dirname, './components')]
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url?limit=10000'
        }, {
          test: /\.(woff|woff2|eot|ttf)$/i,
          loader: 'url?limit=10000'
        }
      ]
    }
  }
}

// 获取多页面配置
module.exports.getMultipageConfig = getMultipageConfig
// 获取dev server的webpack配置，同时设置端口号
module.exports.getHotConfigWithPort = getHotConfigWithPort
