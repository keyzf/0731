var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var hotConfig = require('./webpack.hot.config')

/* 可以通过配置代理访问后端接口，这样非常方便前后端在不同机器上开发
 * 代理中指定的域名不走本地host，而是直接指定ip，所以本机host中配置的本地域名与接口域名相同或不同都可以
 * 此代码自动读取UrlConfig中配置的接口，除手动排除的以外全部走代理，记得每次修改UrlConfig中的接口需要重新启动此服务器
 * 如果不想使用此自动化代码，也可以写成如下形式，支持通配符，具体可查看webpack dev server相关文档
 * proxy: {
 *   '/login/do': {
 *     target: 'http://119.29.188.156/',
 *     secure: false,
 *     headers: {host: 'xyz.qq.com'}
 *   },
 *   '/vendor/profile/apply': {
 *     target: 'http://119.29.188.156/',
 *     secure: false,
 *     headers: {host: 'xyz.qq.com'}
 *   }
 * }
 */

// 自动接口代理模式
var UrlConfig = require('./src/js/config/UrlConfig')

var getProxyOptions = function () {
  var options = {}

  for (var key in UrlConfig) {
    var url = UrlConfig[key]
    // url是本地文件的不走代理
    if (url && url.substring(0, 6) != '/mock/') {
      options[url] = {
        target: 'http://127.0.0.1', // 后端接口所在机器
        secure: false,
        headers: {Host: 'radmin.qq.com'}  // 接口域名
      }
    }
  }
  
  return options
}

/**
 * 设置本地服务器端口号
 */
const port = 80

new WebpackDevServer(webpack(hotConfig.getHotConfigWithPort(port)), {
  contentBase: path.resolve(__dirname, './src'),
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
  proxy: getProxyOptions(), // 开启自动接口代理模式
}).listen(port, 'localhost', function (error) {
  if (error) {
    console.log(error)
  }

  console.log('Listening at localhost:' + port)
})
