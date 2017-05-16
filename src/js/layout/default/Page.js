var React = require('react')

var PageTitle = require('./PageTitle')
var Breadcrumb = require('./Breadcrumb')
var Page = React.createClass({
  render: function () {
    return (
      <div className='content-wrapper' id='content-wrapper'>
        <div className='page-header'>
          <PageTitle />
          <Breadcrumb />
        </div>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Page
