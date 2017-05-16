var React = require('react')

var Utils = require('radmin').Utils
var Radio = require('radmin').Radio

module.exports = React.createClass({
  _onChange: function (value) {
    Utils.prompt(value)
  },
  render: function () {
    return (
      <Radio
        value={0}
        checked={true}
        onChange={this._onChange}>
        香蕉
      </Radio>
    )
  }
})
