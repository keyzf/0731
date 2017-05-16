var React = require('react')

var UiConfig = require('../../config/UiConfig')

var HeadBar = React.createClass({
  _enableSidebarXS: function () {
    this.props.onSidebarToggle ? this.props.onSidebarToggle('xs') : null
  },
  _enableSidebarMobile: function () {
    this.props.onSidebarToggle ? this.props.onSidebarToggle('mobile') : null
  },
  render: function () {
    return (
      <div className='navbar navbar-inverse'>
        <div className='navbar-collapse' id='navbar-mobile'>
          <div>
            <ul className='nav navbar-nav' style={{marginLeft: 5}}>
              <li>
                <a className='sidebar-control sidebar-main-toggle hidden-xs' onClick={this._enableSidebarXS}><i className='icon-paragraph-justify3'></i></a>
              </li>
            </ul>
          </div>
          <div className='navbar-header' style={{minWidth: 209}}>
            <ul className='nav navbar-nav navbar-right visible-xs-block'>
              <li>
                <a className='sidebar-mobile-main-toggle' onClick={this._enableSidebarMobile}><i className='icon-paragraph-justify3'></i></a>
              </li>
            </ul>
            <a href={UiConfig.hashSymbol + '/'} className='navbar-brand'>Radmin前端框架</a>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
})

module.exports = HeadBar
