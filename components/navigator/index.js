var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Core = require('./core')
var defaultVerticalRender = require('./render/defaultVerticalRender')
var defaultHorizontalRender = require('./render/defaultHorizontalRender')

/**
 * 支持横向和纵向导航，支持完全自定义导航样式，支持多导航组件组合使用（分别对应导航配置的任意级别）
 */
var Navigator = React.createClass({
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
    navigatorRender: React.PropTypes.any,

    /**
     * 自定义重定向回调，例：function(url, alias) {}
     */
    onRedirect: React.PropTypes.func,
    /**
     * 当前url没有匹配项回调，例：function(url) {}
     */
    onNotFoundCallback: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.props = nextProps
    }
  },
  render: function () {
    // 选择render器
    var render = defaultVerticalRender;
    if (typeof this.props.navigatorRender === 'string') {
      switch (this.props.navigatorRender) {
        case 'vertical':
        case 'v':
          render = defaultVerticalRender
          break;
        case 'horizontal':
        case 'h':
          render = defaultHorizontalRender
          break;
      }
    } else if (typeof this.props.navigatorRender === 'object' && this.props.navigatorRender != null) {
      render = this.props.navigatorRender
    }

    return (
      <Core {...this.props} nRender={render} />
    )
  }
})

module.exports = Navigator
