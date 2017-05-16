var React = require('react')
var Navigator = require('radmin').Navigator
var Utils = require('radmin').Utils

var UiConfig = require('../../config/UiConfig')
var StoreConfig = require('../../config/StoreConfig')
var MenuAction = require('../../actions/MenuAction')
var MenuStore = require('../../stores/MenuStore')
var SideBar = React.createClass({
  getDefaultProps: function () {
    return {
      closeWidth: false,
      alwaysOpen: false
    }
  },
  getInitialState: function () {
    return {
      menuData: {}
    }
  },
  componentDidMount: function () {
    MenuStore.addChangeListener(this._update)

    var that = this

    if (typeof MenuStore.getData(StoreConfig.STORE_MENU_DATA) !== 'undefined' && MenuStore.getData(StoreConfig.STORE_MENU_DATA) != null) {
      this._update()
    } else {
      MenuAction.getMenu(function () {
        that._update()
      })
    }
  },
  componentWillUnmount: function () {
    MenuStore.removeChangeListener(this._update)
  },
  _update: function () {
    this.setState({menuData: MenuStore.getData(StoreConfig.STORE_MENU_DATA)})
  },
  _redirect: function (url, alias) {
    // 处理多页面跳转：当url为'//'双斜杠开头时，不做hash跳转，而是url跳转
    if (url.length > 1 && url[0] === '/' && url[1] === '/') {
      url = url.substring(1)
      Utils.redirect(url)
    } else {
      Utils.redirect(UiConfig.hashSymbol + url)
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.closeWidth != nextProps.closeWidth) {
      this.props = nextProps
    } else if (this.props.alwaysOpen != nextProps.alwaysOpen) {
      this.props = nextProps
    }
  },
  render: function () {
    return (
      <div className='sidebar sidebar-main'>
        <Navigator
          data={this.state.menuData}
          onRedirect={this._redirect}
          alwaysOpen={this.props.alwaysOpen}
          dataLayerIndex={1}
          dataLayerRange={2}
        />
      </div>
    )
  }
})

module.exports = SideBar
