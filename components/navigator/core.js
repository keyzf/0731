var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var ReactRouter = require('react-router')

var clone = require('clone')

var Core = React.createClass({
  propTypes: {
    /**
     * 导航数据配置，例[{text: '第一项', alias: '1', url: ['/page1', '/page1/1'], value: [{text: '子项', alias: '1-1', url: 'page1/1'}]}]
     */
    data: React.PropTypes.any,
    /**
     * 每个第二级属性高度，例：40
     */
    cellHeight: React.PropTypes.number,
    /**
     * 从data中的哪级导航开始
     */
    dataLayerIndex: React.PropTypes.number,
    /**
     * 支持data中的几级导航，值为1或2，例：2
     */
    dataLayerRange: React.PropTypes.number,
    /**
     * 当有多个项的url均符合当前浏览器地址的时候，只显示其中一个，优先根据当前alias, 如：false
     */
    onlyOneUrl: React.PropTypes.bool,
    /**
     * 是否所有项始终打开，覆盖data中的值
     */
    alwaysOpen: React.PropTypes.bool, // 永远打开，例：false
    /**
     * navigator处理器，以便支持自定义处理器，已提供默认处理器，不建议修改，如：'horizontal'
     */
    nRender: React.PropTypes.object,

    /**
     * 自定义重定向回调，例：function(url, alias) {}
     */
    onRedirect: React.PropTypes.func,
    /**
     * 当前url没有匹配项回调，例：function(url) {}
     */
    onNotFoundCallback: React.PropTypes.func
  },
  contextTypes: {
    pathname: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      data: {},
      cellHeight: 40,
      onRedirect: null,
      dataLayerRange: 2,
      onClickEye: null,
      maxWidth: 200,
      minWidth: 60,
      navigatorRender: {}
    }
  },
  getInitialState: function () {
    return {
      init: true,
      currentAlias: null, // 只有onlyOneUrl被开启时才有作用
      data: {},
      renderData: null,
      width: this.props.maxWidth
    }
  },
  componentWillMount: function () {
    this.parseData()
  },
  parseData: function () {
    this.state.data = clone(this.props.data)
  },
  componentDidMount: function () {
    // 初始化处理一次状态
    window.addEventListener('hashchange', this._onHashChange)
  },
  componentWillUnmount: function () {
    window.removeEventListener('hashchange', this._onHashChange)
  },
  componentWillReceiveProps: function (nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.props = nextProps
      this.parseData()
    }
  },
  componentDidUpdate: function () {
    typeof this.props.nRender.renderComplete === 'function' ? this.props.nRender.renderComplete.call(this, this.state.data, this.props) : null
  },
  _onHashChange: function () {
    this.forceUpdate()
  },
  _onRedirect: function (url, alias) {
    // 当前项有多个url则取第一个
    if (url instanceof Array) {
      url = url[0]
    }

    if (this.props.onlyOneUrl === true) {
      this.state.currentAlias = alias
    }

    if (typeof this.props.onRedirect === 'function') {
      this.props.onRedirect(url, alias)
    } else {
      location.href = url
    }
  },
  _findConfigValue: function () {
    var url = this.context.pathname
    var data = this.state.data

    this.state.renderData = null
    var config = this._compare(url, data, this.state.init, this.props, this._equalUrl) || this._compare(url, data, this.state.init, this.props, this._accordUrl)
    // 是否需要剔除多项被同时选中
    // this._ifOnlyOne(data)
    // 没有匹配项则执行无匹配回调
    if (typeof this.props.onNotFoundCallback === 'function' && (typeof config === 'undefined' || config == null)) {
      this.props.onNotFoundCallback(url)
    }
    return config
  },
  _parseDataByUrl: function (data, params, url, init, onEqualFunc) {
    var parseData = function(data, dataLayerIndex) {
      var config = null

      for (var key in data) {
        data[key].selected = false
        if (onEqualFunc(url, data[key].url)) {
          if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
            data[key].selected = true

            config = data
          }
        }

        data[key].sub_selected = false
        if (parseData(data[key].value, dataLayerIndex + 1)) {
          data[key].sub_selected = true

          config = data
        }
      }

      return config
    }

    // 返回要显示的data结构
    return parseData(data, 1) || data
  },
  _compare: function (url, data, init, params, onEqualFunc) {
    var parseDataByUrl = this.props.nRender.parseDataByUrl || this._parseDataByUrl
    var config = null

    switch (this.props.dataLayerIndex) {
      case 2:
        for (var key in data) {
          if (typeof data[key].value === 'object' && data[key].value != null) {
            if (config = parseDataByUrl(data[key].value, params, url, init, onEqualFunc)) {
              this.state.renderData = config
              return config
            }
          }
        }
        break
      case 3:
        for (var key in data) {
          for (var k in data[key].value) {
            if (typeof data[key].value[k].value === 'object' && data[key].value[k].value != null) {
              if (config = parseDataByUrl(data[key].value[k].value, params, url, init, onEqualFunc)) {
                this.state.renderData = config
                return config
              }
            }
          }
        }
        break
      default:
        if (config = parseDataByUrl(data, params, url, init, onEqualFunc)) {
          this.state.renderData = config
          return config
        }
        break
    }
    if(config = parseDataByUrl(data, params, url, init, onEqualFunc)){
      this.state.renderData = config
      return config
    } 
    return null
  },
  _equalUrl: function (url, pattern) {
    if (pattern instanceof Array) {
      for (var key in pattern) {
        if (url === pattern[key]) {
          return true
        }
      }
      return false
    } else {
      return url === pattern
    }
  },
  _accordUrl: function (url, pattern) {
    /**
     * url(/aaa/bcc)符合pattern(/aaa/:p)
     */
    if (pattern instanceof Array) {
      for (var key in pattern) {
        if (this._match(url, pattern[key])) {
          return true
        }
      }
      return false
    } else {
      return this._match(url, pattern)
    }
  },
  _match: function (url, pattern) {
    var paramMatch = true
    var patternParam = this._getUrlVars(pattern)
    for (var key in patternParam) {
      if (this._getUrlVar(key, url) !== patternParam[key]) {
        paramMatch = false
      }
    }
    // 参数不符合
    if (!paramMatch) {
      return false
    }
    // url去掉参数进行比对
    url = url.replace(/\?[^\#]+/gi, '')

    var pattern = pattern
    pattern = pattern.replace(/\/:[^\/]+/g, '/[^\/]+')
    pattern = pattern.replace(/\//g, '\\\/')
    pattern = new RegExp('^' + pattern + '$', 'gi')

    var result = url.match(pattern)
    return result && result.length > 0
  },
  _getUrlVars: function (url) {
    var vars = [],
      hash
    if (typeof url === 'undefined' || url == null) {
      url = window.location.href
    }

    if (url.indexOf('?') != -1) {
      var param = url.match(/\?[^\#]+/gi)
      if (param) {
        param = param[0]
        param = param.replace(/\?/gi, '')
        param = param.split(/[\&]/)
      }
      for (var i = 0; i < param.length; i++) {
        hash = param[i].split('=')
        vars[hash[0]] = hash[1]
      }
    }

    return vars
  },
  _getUrlVar: function (name, url) {
    return this._getUrlVars(url)[name]
  },
  _ifOnlyOne: function (data) {
    // 考虑多个相同url的项都被选中的情况
    if (this.props.onlyOneUrl === true) {
      if (this.state.currentAlias) {
        var selectOne = null
        for (var key in data) {
          if (data[key].selected) {
            if (selectOne == null) {
              selectOne = data[key]
            } else if (selectOne != null && data[key].alias === this.state.currentAlias) {
              selectOne.selected = false
              selectOne = data[key]
            } else {
              data[key].selected = false
            }
          }

          for (var k in data[key].value) {
            if (data[key].value[k].selected) {
              if (selectOne == null) {
                selectOne = data[key].value[k]
              } else if (selectOne != null && data[key].value[k].alias === this.state.currentAlias) {
                selectOne.selected = false
                selectOne = data[key].value[k]
              } else {
                data[key].value[k].selected = false
              }
            }
          }
        }
        if (selectOne) {
          selectOne.selected = true
        }
      } else {
        var selectOne = null
        for (var key in data) {
          if (data[key].selected) {
            if (selectOne == null) {
              selectOne = data[key]
            } else {
              data[key].selected = false
            }
          }

          for (var k in data[key].value) {
            if (data[key].value[k].selected) {
              if (selectOne == null) {
                selectOne = data[key].value[k]
              } else if (selectOne != null) {
                data[key].value[k].selected = false
              }
            }
          }
        }
        if (selectOne) {
          selectOne.selected = true
        }
      }
    }
  },
  _render: function() {
    var config = this._findConfigValue()

    var that = this
    return typeof this.props.nRender.render === 'function' ? this.props.nRender.render.call(this, this.state.renderData, this.props, config, this._onRedirect, function() {
      that.state.init = false
    }) : null
  },
  render: function () {
    return (
      this._render()
    )
  }
})

module.exports = Core
