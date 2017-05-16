var React = require('react')

var Utils = require('radmin').Utils
var RadioGroup = require('radmin').RadioGroup

module.exports = React.createClass({
  _onChange: function (data, value) {
    console.info(data)
    Utils.prompt(value)
  },
  render: function () {
    return (
      <RadioGroup
        data={[{name: '香蕉', value: 0}, {name: '苹果', value: 1, disabled: true}, {name: '橘子', value: 2, checked: true}]}
        onChange={this._onChange}
        labelWidth={100} />
    )
  }
})
