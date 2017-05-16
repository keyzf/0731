var React = require('react')

var Error404 = React.createClass({
  contextTypes: {
    pathname: React.PropTypes.string
  },
  render: function () {
    return (
      <div className='app'>
        页面未找到：
        {this.context.pathname}
      </div>
    )
  }
})

module.exports = Error404
