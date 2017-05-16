var React = require('react')

var UiConfig = require('../../config/UiConfig')
var StoreConfig = require('../../config/StoreConfig')
var MenuAction = require('../../actions/MenuAction')
var MenuStore = require('../../stores/MenuStore')

var PageHeader = React.createClass({
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
    this.setState({ menuData: MenuStore.getData(StoreConfig.STORE_MENU_DATA) })
  },
  contextTypes: {
    pathname: React.PropTypes.string
  },
  _renderName: function () {
    if (!this.state.menuData) return null
    var name = null
    return this._findName(this.state.menuData)
  },
  _findName: function (data) {
    var self = this
    for (var key in data) {
      if (Array.isArray(data[key].url)) {
        if (data[key].url.indexOf(self.context.pathname) != -1) {
          return data[key].text
        }
      } else {
        if (data[key].url == self.context.pathname) {
          return data[key].text
        }
      }
      if (data[key].value) {
        var sub = data[key].value
        for (var i in sub) {
          if (Array.isArray(sub[i].url)) {
            if (sub[i].url.indexOf(self.context.pathname) != -1) {
              return sub[i].text
            }
          } else {
            if (sub[i].url == self.context.pathname) {
              return sub[i].text
            }
          }
        }
      }
    }
  },
  render: function () {
    return (
      <div className='page-header-content'>
        <div className='page-title'>
          <h4>{this._renderName()}</h4>
        </div>
      </div>
    )
  }
})

module.exports = PageHeader
