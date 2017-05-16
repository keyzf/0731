# Ajax请求相关功能介绍

对于前后端完全分离的管理系统项目，一般来说Ajax是最主要的数据获取方式。
Radmin对于数据请求开发过程中的痛点进行了逐个击破，让开发者可以高效的处理业务逻辑。

## 热替换更新服务器

使用webpack dev server作为本地服务器，这样代码就不需要每次修改都编译一遍。
服务器把代码编译在内存中，并监控代码的变化进行局部编译，速度很快。
在项目根目录（包含package.json的目录）下执行npm start（或加sudo），服务器就被启动。
其中服务器的配置在webpack.dev.server.js中，webpack的配置在webpack.hot.config.js中。
可以在配置中调整服务器监听的端口

```js
/**
 * 设置本地服务器端口号
 */
const port = 80
```

## 前端服务器接口自动代理解决开发跨域问题

你是否有这样的经历：
* 想在自己的电脑上开发却因为跨域问题连不到服务器上的接口，只好把代码提交服务器拉下来再访问。
* 通过samba等方式连到服务器开发，但服务器又不能连接外网，项目的依赖包都没法通过包管理器下载，本地下载上传起来又太大更新不便。
* 发现线上出了问题，本地却因为数据等环境原因无法重现，多么想能直接连到线上接口看看浏览器到底报了什么错误。

现在使用前端服务器接口自动代理的方式，这些都不再成为困扰。
执行npm start（或加sudo）后，webpack dev server会自动读取项目中的src/js/config/UrlConfig.js配置文件，
将所有对于接口的请求都转发到实际接口所在的机器，从而解决跨域问题

```js
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
```

## 假数据

前端开发时可能相应的接口还没有好，这时可以根据接口文档创造假的接口数据文件来配合开发。
假数据放在src/mock文件夹下，由于mock文件夹和图片等其他资源一样最终会被复制到生成目录，因此在src/js/config/UrlConfig中定义接口地址如下

```js
getInfo: '/mock/getInfo.json',
```

另外，在代理转发的代码中已经设置以'/mock/'开头的请求是不会转发的

## Ajax通用配置与独立配置

在Radmin中，一个ajax请求会按如下优先级读取这个请求的参数：这个请求独立的配置->Ajax请求通用的配置->Ajax请求默认的配置
独立的配置直接写在src/js/actions/xxxAction.js文件中通过Utils.ajax创建请求的地方
通用的配置写在src/js/config/AjaxConfig
默认的配置是在Utils.ajax这个工具内部，开发者无需修改

对于一些错误码的通用处理，都写在通用配置里，方便开发和维护。Ajax通用配置文件内容如下

```js
var Utils = require('radmin').Utils

module.exports = {
  // 不设置则使用默认值
  timeout: null,
  // 'get'或'post'
  type: 'get',
  // 默认返回值类型，'json'或者'text'
  dataType: 'json',

  // 返回值数据格式处理
  // 如果dataType=text，则返回的json格式字符串需要在这里手动转换为对象
  dataFilter: function (msg, dataType) {
    // msg = JSON.parse(msg)
    return msg
  },

  // ajax返回值的通用错误处理，避免每个ajax回调函数内要写相同的逻辑。
  // 返回msg将继续执行ajax的success方法，否则终止
  beforeSuccess: function (msg, customCallback) {
    // 通用错误处理
    if (msg.code != 0) {
      if (customCallback) {
        if (!customCallback(msg)) {
          return
        }
      }
      switch (msg.code) {
        case -5: {
          // 服务器返回未登录code，则跳转登录
          Utils.prompt('您的登录状态已过期，请重新登录')
          // LoginAction.login()
          return
        }
        default: {
          Utils.prompt(msg.message)
          return
        }
      }
    }

    return msg
  }
}
```

## 请求中loading的解决方案

请求时的loading浮层一直是开发比较繁琐的地方，loading浮层一般和业务逻辑无关，属于用户体验的优化，Radmin通过Spin组件极大的简化了loading效果的实现。
控制loading显隐状态是耗时繁琐的工作，比如请求发生错误时也要隐去。Radmin通过在Ajax请求内部直接对Spin状态做控制，开发者使用起来极其便利，当然开发者也可以选择手动控制的方式。
自动控制loading的使用方法如下：

```js
// 页面中直接使用Spin组件，可以随意控制其遮挡的范围，对其命名
render: function () {
  return (
    <div>
      <Spin statusType='loading-name'>
        <div>
          这里会被loading效果遮挡
        </div>
      </Spin>
      <div>
        这里不会被loading效果遮挡
      </div>
    </div>
  )
}
```

```js
// action中将响应的ajax请求设置同样的命名
Utils.ajax({
  url: '...',
  data: {},
  statusType: 'loading-name',
  success: function(msg) {
  }
})
```

这样在ajax请求发送期间，loading会一直显示，请求结束时无论成功失败loading都会消失。
另外“loading-name”直接使用StoreConfig里存储的此请求对应的数据名即可，这样更加便利
