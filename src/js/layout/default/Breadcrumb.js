var React = require('react')
var clone = require('clone')

var Breadcrumb = require('radmin').Breadcrumb
var Utils = require('radmin').Utils

var NavigatorConfig = require('../../config/NavigatorConfig')
// var CurrentAction = require('../../actions/CurrentAction')

var BreadcrumbBar = React.createClass({
  getInitialState: function () {
    return {
      menuData: {}
    }
  },
  componentDidMount: function () {
    var that = this

    this.setState({ menuData: clone(NavigatorConfig) })
  },
  _onTitleChange: function (title, alias) {
    CurrentAction.changeCurrentData({ title, alias})
  },
  _redirect: function (url) {
    Utils.redirect('#' + url)
  },
  render: function () {
    return (
      <div className='breadcrumb-line'>
        <div className='navigator-bar'>
          <Breadcrumb
            data={this.state.menuData}
            defaultItem={{text: 'Radmin', url: ''}}
            onTitleChange={this._onTitleChange}
            onRedirect={this._redirect}
          />
        </div>
      </div>
    )
  }
})

module.exports = BreadcrumbBar
