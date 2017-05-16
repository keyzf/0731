var React = require('react')

var ToolTip = require('radmin').ToolTip

module.exports = React.createClass({
  render: function () {
    return (
      <ToolTip title='提示'> 这是气泡提示哟 </ToolTip>
    )
  }
})
