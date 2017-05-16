var React = require('react')

var Content = React.createClass({
  render: function () {
    var classes = 'page-container ' + this.props.className
    return (
      <div className={classes} style={{ minHeight: this.props.height || 'auto' }}>
        <div className='page-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
})

module.exports = Content
