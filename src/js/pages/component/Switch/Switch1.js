var React = require('react')

var Switch = require('radmin').Switch

module.exports = React.createClass({
  getInitialState: function () {
    return {
      open: false
    }
  },
  _onChange: function (checked) {
    this.state.open = checked
    this.forceUpdate()
  },
  render: function () {
    return (
      <Switch value={0} checked={this.state.open} onChange={this._onChange} />
    )
  }
})
