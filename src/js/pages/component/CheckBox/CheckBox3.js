var React = require('react')

var Utils = require('radmin').Utils
var CheckBox = require('radmin').CheckBox

module.exports = React.createClass({
  _onChange: function (value) {
    Utils.prompt(value)
  },
  render: function () {
    return (
      <CheckBox
        value={0}
        checked={true}
        onChange={this._onChange}>
        香蕉
      </CheckBox>
    )
  }
})
