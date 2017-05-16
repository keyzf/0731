var React = require('react')

var Slider = require('radmin').Slider

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: 0
    }
  },
  _onChange: function(value) {
    this.setState({value: value})
  },
  render: function () {
    return (
      <div>
        <Slider value={this.state.value} onChange={this._onChange}/>{this.state.value}
      </div>
    )
  }
})
