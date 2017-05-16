var React = require('react')
var ReactDom = require('react-dom')
var ReactRouter = require('react-router')

var Utils = require('radmin').Utils

var LoginConfig = require('./config/LoginConfig')
var AjaxConfig = require('./config/AjaxConfig')
var RouteConfig = require('./config/RouteConfig')
var FilterConfig = require('./config/FilterConfig')

// 引入less文件
require('../less/index.less')

// 将login配置和ajax配置信息传入Radmin，在初始化完成之后执行ReactDom的render，并将route配置和filter配置进行整合得到新的ReactRouter配置
Utils.setLoginConfig(LoginConfig).setAjaxConfig(AjaxConfig).complete(function () {
  ReactDom.render(<ReactRouter.Router routes={Utils.combineConfig(RouteConfig, FilterConfig)} history={ReactRouter.hashHistory} />, document.getElementById('react'))
})
