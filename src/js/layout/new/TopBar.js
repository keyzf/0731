var React = require('react')
var clone = require('clone')

var Utils = require('radmin').Utils
var Navigator = require('radmin').Navigator

var StoreConfig = require('../../config/StoreConfig')
var MenuStore = require('../../stores/MenuStore')

var TopBar = React.createClass({
  getInitialState: function () {
    return {
      menuData: null
    }
  },
  componentDidMount: function () {
    MenuStore.addChangeListener(this._updateData)

    window.addEventListener('hashchange', this._handleHashChange)

    this._updateData()
  },
  componentWillUnmount: function () {
    MenuStore.removeChangeListener(this._updateData)

    window.removeEventListener('hashchange', this._handleHashChange)
  },
  _handleHashChange: function () {
    this._update()
  },
  _updateData: function () {
    this.setState({menuData: MenuStore.getData(StoreConfig.STORE_MENU_DATA)})
  },
  _update: function () {
    this.setState({menuData: this.state.menuData})
  },
  _onRedirect: function (url) {
    Utils.redirect('#' + url)
  },
  render: function () {
    if (this.state.menuData) {
      return (
        <Navigator navigatorRender='horizontal' data={this.state.menuData} onRedirect={this._onRedirect} dataLayer={1} />
      )
    } else {
      return null
    }
  }
})

module.exports = TopBar
