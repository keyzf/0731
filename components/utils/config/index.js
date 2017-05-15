'use strict'

var React = require('react')

var LoginUtil = require('../login')
var AjaxUtil = require('../ajax')

var loginConfig = null

var configUtil = {}
var configComplete = 0
var configCompleteTotal = 0
var configCompleteFunc = null

var checkComplete = function checkComplete () {
  if (configComplete == configCompleteTotal) {
    if (typeof configCompleteFunc === 'function') {
      setTimeout(function () {
        configCompleteFunc()
        configComplete = 0
        configCompleteTotal = 0
      }, 1)
    }
  }
}

configUtil.setLoginConfig = function (config) {
  configCompleteTotal++

  // 设置用户可使用的登录方式：'oa'代表oa登录，'qq'代表qq登录，both代表qq和oa两种方式任选，'qc'代表qq互联登录，不区分大小写
  LoginUtil.setLoginMode(config.loginMode)
  typeof config.oa === 'object' ? LoginUtil.setOAConfig(config.oa) : null
  typeof config.qq === 'object' ? LoginUtil.setQQConfig(config.qq) : null
  typeof config.qc === 'object' ? LoginUtil.setQCConfig(config.qc) : null
  LoginUtil.setRedirectNotLoginPage(config.redirectNotLoginPage || false)

  // 是否采用跳转到notlogin页面的方式
  var redirectNotLoginPage = true

  loginConfig = config

  if (config.loginMode === 'qc') {
    LoginUtil.initQC(function () {
      configComplete++
      checkComplete()
    })
  } else {
    configComplete++
    checkComplete()
  }

  return configUtil
}

var ajaxConfig = null
configUtil.setAjaxConfig = function (config) {
  configCompleteTotal++

  AjaxUtil.setConfig(config)

  configComplete++
  checkComplete()

  return configUtil
}

configUtil.complete = function (callback) {
  configCompleteFunc = callback

  checkComplete()

  return configUtil
}

configUtil.combineConfig = function (routeConfig, filterConfig) {
  var currentRouteInfo = null

  var getUrlVars = function getUrlVars () {
    var vars = {},
      hash
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=')
      vars[hash[0]] = hash[1]
    }
    return vars
  }

  var update = null
  var filterEnd = false

  var App = React.createClass({
    displayName: 'App',

    _filterUtil: {
      that: this,
      filters: [],
      route: null,
      props: [],
      element: null, // 最终要render的内容
      init: function init (config, route, props) {
        this.filters = config.map(function (filter, i) {
          return filter
        })

        this.route = route
        this.props = props

        return this
      },
      execute: function execute () {
        if (this.filters.length <= 0) {
          filterEnd = true
          update()
          return null
        }
        var filter = this.filters.shift()
        return filter.call(filter, this)
      }
    },
    childContextTypes: {
      pathname: React.PropTypes.string,
      params: React.PropTypes.object,
      query: React.PropTypes.object
    },
    getChildContext: function getChildContext () {
      return {
        pathname: this.props.location ? this.props.location.pathname : '',
        params: this.props.params,
        query: getUrlVars()
      }
    },
    componentWillMount: function componentWillMount () {
      var that = this
      update = function () {
        that.forceUpdate()
      }

      if (!filterEnd) {
        var childContext = this.getChildContext()
        childContext.pathname = currentRouteInfo.path
        this._filterUtil.init(filterConfig, currentRouteInfo, childContext).execute()
      }
    },
    componentWillUpdate: function componentWillUpdate () {
      if (!filterEnd) {
        var childContext = this.getChildContext()
        childContext.pathname = currentRouteInfo.path
        this._filterUtil.init(filterConfig, currentRouteInfo, childContext).execute()
      }
    },
    render: function render () {
      return this._filterUtil.element
    }
  })

  var config = routeConfig.map(function (rt) {
    return {
      path: rt.path,
      component: App,
      onEnter: function onEnter (nextState) {
        filterEnd = false
        if (typeof rt.onEnter === 'function') {
          rt.onEnter()
        }
        currentRouteInfo = rt
      }
    }
  })

  return config
}

module.exports = configUtil
