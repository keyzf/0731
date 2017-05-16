var React = require('react')
var ReactDom = require('react-dom')
var ClassName = require('classnames')
var Utils = require('radmin').Utils

var HeadBar = require('./HeadBar')
var Content = require('./Content')
var Login = require('./Login')
var SideBar = require('./SideBar')
var Page = require('./Page')

var App = React.createClass({
  getInitialState: function () {
    return {
      sidebarType: null,
      contentHeight: null
    }
  },
  componentDidMount: function () {
    this.state.contentHeight = window.innerHeight - ReactDom.findDOMNode(this.refs.headbar).offsetHeight
    this.forceUpdate()
  },
  _toggleSidebar: function (type) {
    type = type || null
    this.setState({
      sidebarType: this.state.sidebarType ? null : type
    })
  },
  render: function () {
    // 兼容移动端样式
    var classes = ClassName({
      'sidebar-xs': this.state.sidebarType == 'xs',
      'sidebar-mobile-main': this.state.sidebarType == 'mobile'
    })

    return (
      <div className='app'>
        <HeadBar ref='headbar' onSidebarToggle={this._toggleSidebar}>
          <Login />
        </HeadBar>
        <Content height={this.state.contentHeight} className={classes}>
          <SideBar alwaysOpen={this.state.sidebarType == 'xs'} />
          <Page>
            {this.props.children}
          </Page>
        </Content>
      </div>
    )
  }
})

module.exports = App
