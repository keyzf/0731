var React = require('react')

var LoginConfig = require('../config/LoginConfig')
var LoginUtil = require('radmin').Utils.LoginUtil

// 前端验证登录态的filter
module.exports = function (context) {
  // 未登录页面不需要验证登录态，直接显示
  // 不需要登录态的页面都写在这
  if (context.props.location.pathname == '/notlogin') {
    context.execute()
    return
  }

  if (LoginUtil.getLoginMode() == 'oa' || LoginUtil.getLoginMode() == 'qq' || LoginUtil.getLoginMode() == 'qc') {
    LoginUtil.setCurrentLoginMode(LoginUtil.getLoginMode())
  }

  // 未登录的常用页面展现形式有两种，一种是跳转到一个自定义的未登录页面，可在此页面中登录，另一种是弹出登录框或跳转登录页
  var redirectNotLoginPage = LoginUtil.getRedirectNotLoginPage()

  // 如果在未登录页面登录后，登录功能本身指定了跳转页面的话，下面的url参数也可以不添加，此参数原本的目的在于从任何页面跳转到未登录页面，登录完成都会自动返回跳转前的页面
  var notLoginUrl = '/notlogin?url=' + encodeURIComponent(window.location.href)

  var notLogin = false
  switch (LoginUtil.getLoginMode()) {
    case 'oa':
      if (!LoginUtil.isOALogin()) {
        if (redirectNotLoginPage) {
          notLogin = true
        } else {
          LoginUtil.oaLogin()
        }
      }
      break
    case 'qq':
      if (!LoginUtil.isQQLogin()) {
        if (redirectNotLoginPage) {
          notLogin = true
        } else {
          LoginUtil.qqLogin()
        }
      }
      break
    case 'qc':
      if (!LoginUtil.isQCLogin()) {
        if (redirectNotLoginPage) {
          notLogin = true
        } else {
          LoginUtil.qcLogin()
        }
      }
      break
    default:
      // 默认显示两种登录方式供选择
      if (!LoginUtil.isOALogin() && !LoginUtil.isQQLogin()) {
        if (redirectNotLoginPage) {
          notLogin = true
        } else {
          LoginUtil.selectLoginMode(function () {
            LoginUtil.setCurrentLoginMode('oa')
            LoginUtil.oaLogin()
          }, function () {
            LoginUtil.setCurrentLoginMode('qq')
            LoginUtil.qqLogin()
          })
        }
      }
      break
  }

  if (notLogin) {
    location.href = notLoginUrl
  } else {
    context.execute()
  }
}
