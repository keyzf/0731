var React = require('react')

var Utils = require('radmin').Utils
var Navigator = require('radmin').Navigator

var UiConfig = require('../../../config/UiConfig')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      menuData: null
    }
  },
  _getConfig: function () {
    return [
      {
        text: '第一项',
        alias: 'component-navigator',
        url: '/component/navigator'
      }, {
        text: '第二项',
        alias: 'component-navigator-2',
        url: '/component/navigator/2'
      }, {
        text: '第三项',
        alias: 'component-navigator-3',
        url: ['/component/navigator/3', '/component/navigator/4']
      }
    ]
  },
  _redirect: function (url, alias) {
    Utils.redirect(UiConfig.hashSymbol + url)
  },
  render: function () {
    return (
      <div className='navbar navbar-inverse'>
        <Navigator
          data={this._getConfig()}
          onRedirect={this._redirect}
          navigatorRender='horizontal'
          dataLayerIndex={1}
          dataLayerRange={2}
        />
      </div>
    )
  }
})
