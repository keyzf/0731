var Utils = require('radmin').Utils
var LoginUtil = require('radmin').Utils.LoginUtil

var LoginStore = require('../stores/LoginStore')
var StoreConfig = require('../config/StoreConfig')

module.exports = {
  login: function (url) {
    // 根据当前用户可使用的登录方式
    switch (LoginUtil.getLoginMode()) {
      case 'oa':
        LoginUtil.setCurrentLoginMode('oa')

        if (LoginUtil.isOALogin()) {
          LoginUtil.oaLogout(null, url)
        } else {
          LoginUtil.oaLogin(url)
        }
        break
      case 'qq':
        LoginUtil.setCurrentLoginMode('qq')

        if (LoginUtil.isQQLogin()) {
          LoginUtil.qqLogout(null, url)
        } else {
          LoginUtil.qqLogin(url)
        }
        break
      case 'qc':
        LoginUtil.setCurrentLoginMode('qc')

        if (LoginUtil.isQCLogin()) {
          LoginUtil.qcLogout(null, url)
        } else {
          LoginUtil.qcLogin(function () {
            window.location.href = 'http://' + window.location.host
          })
        }
        break
      default:
        LoginUtil.selectLoginMode(function () {
          LoginUtil.setCurrentLoginMode('oa')

          if (LoginUtil.isOALogin()) {
            LoginUtil.oaLogout(null, url)
          } else {
            LoginUtil.oaLogin(url)
          }
        }, function () {
          LoginUtil.setCurrentLoginMode('qq')

          // 如果采用QQ登录, OA一定要退出，这是采用两种登录方式的优先级的问题
          // 但是这里不能调用跳转登出，只能单纯删除本地OA的cookie
          if (LoginUtil.isOALogin()) {
            LoginUtil.deleteOATicket()
          }

          if (LoginUtil.isQQLogin()) {
            LoginUtil.qqLogout(null, url)
          } else {
            LoginUtil.qqLogin(url)
          }
        })
        break
    }
  },
  getLoginData: function () {
    // 根据当前用户已使用的登录方式，优先根据已主动点击登录的登录模式，再看设置的登录模式（因为设置可能有both这类不确定的模式）。
    switch (LoginUtil.getCurrentLoginMode() || LoginUtil.getLoginMode()) {
      case 'oa':
        LoginUtil.setCurrentLoginMode('oa')

        LoginUtil.getOALoginData(function (data) {
          if (data.code == 0) {
            Utils.saveToStore({
              type: StoreConfig.STORE_LOGIN_DATA,
              data: {mode: LoginUtil.getCurrentLoginMode(), data: data.data}
            })
          } else {
            Utils.prompt(data.message)
          }
        })
        break
      case 'qq':
        LoginUtil.setCurrentLoginMode('qq')

        LoginUtil.getQQLoginData(function (data) {
          if (data.code == 0) {
            Utils.saveToStore({
              type: StoreConfig.STORE_LOGIN_DATA,
              data: {mode: LoginUtil.getCurrentLoginMode(), data: data.data}
            })
          } else {
            Utils.prompt(data.message)
          }
        })
        break
      case 'qc':
        LoginUtil.setCurrentLoginMode('qc')

        LoginUtil.getQCLoginData(function (data) {
          if (data.code == 0) {
            Utils.saveToStore({
              type: StoreConfig.STORE_LOGIN_DATA,
              data: {mode: LoginUtil.getCurrentLoginMode(), data: data.data}
            })
          } else {
            Utils.prompt(data.message)
          }
        })

        // 后端根据access_token和openid做登录验证，这两个值可以这样取到
        LoginUtil.getQCAccessTokenAndOpenId(function (openId, accessToken) {})
        break
      default:
        // 未指定的情况下优先查询OA登录
        if (LoginUtil.isOALogin()) {
          LoginUtil.setCurrentLoginMode('oa')

          LoginUtil.getOALoginData(function (data) {
            if (data.code == 0) {
              Utils.saveToStore({
                type: StoreConfig.STORE_LOGIN_DATA,
                data: {mode: LoginUtil.getCurrentLoginMode(), data: data.data}
              })
            } else {
              Utils.prompt(data.message)
            }
          })
        } else if (LoginUtil.isQQLogin()) {
          LoginUtil.setCurrentLoginMode('qq')

          LoginUtil.getQQLoginData(function (data) {
            if (data.code == 0) {
              Utils.saveToStore({
                type: StoreConfig.STORE_LOGIN_DATA,
                data: {mode: LoginUtil.getCurrentLoginMode(), data: data.data}
              })
            } else {
              Utils.prompt(data.message)
            }
          })
        }
        break
    }
  },
  logout: function (callback, url) {
    // 根据当前用户已使用的登录方式，此时肯定已经有确定的登录模式
    switch (LoginUtil.getCurrentLoginMode()) {
      case 'oa':
        LoginUtil.oaLogout(function () {
          Utils.saveToStore({
            type: StoreConfig.STORE_LOGIN_DATA,
            data: null
          })

          if (typeof callback === 'function') {
            callback()
          }
        }, url)
        break
      case 'qq':
        LoginUtil.qqLogout(function () {
          Utils.saveToStore({
            type: StoreConfig.STORE_LOGIN_DATA,
            data: null
          })

          if (typeof callback === 'function') {
            callback()
          }
        }, url)
        break
      case 'qc':
        LoginUtil.qcLogout(function () {
          Utils.saveToStore({
            type: StoreConfig.STORE_LOGIN_DATA,
            data: null
          })

          if (typeof callback === 'function') {
            callback()
          }
        }, url)
        break
    }
  }
}
