var Utils = require('radmin').Utils

// var LoginAction = require('../actions/LoginAction')

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
