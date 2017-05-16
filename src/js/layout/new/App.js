var React = require('react')
var ReactDom = require('react-dom')
var ClassName = require('classnames')
var Utils = require('radmin').Utils

var NavigationH = require('radmin').NavigationH

var HeadBar = require('../default/HeadBar')
var Content = require('../default/Content')
var Login = require('../default/Login')
var SideBar = require('../default/SideBar')
var Page = require('../default/Page')
var TopBar = require('./TopBar')

var App = React.createClass({
  getInitialState: function () {
    return {
      sidebarType: false,
      contentHeight: null
    };
  },
  componentDidMount: function () {
    this.state.contentHeight = window.innerHeight - ReactDom.findDOMNode(this.refs.headbar).offsetHeight
    this.forceUpdate();
  },
  _toggleSidebar: function (type) {
    type = type || null
    this.setState({
      sidebarType: this.state.sidebarType ? null : type,
    })
  },
  render: function () {
    var classes = ClassName({
      'sidebar-xs': this.state.sidebarType == "xs",
      'sidebar-mobile-main': this.state.sidebarType == "mobile"
    })

    return (
      <div className='app'>
        <HeadBar ref='headbar' onSidebarToggle={this._toggleSidebar}>
          <TopBar />
          <Login />
        </HeadBar>
        <Content height={this.state.contentHeight} className={classes}>
          <Page>
            {this.props.children}
          </Page>
        </Content>
      </div>
    )
  }
})

module.exports = App
