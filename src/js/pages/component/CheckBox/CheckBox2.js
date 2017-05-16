var React = require('react')

var Utils = require('radmin').Utils
var CheckBoxGroup = require('radmin').CheckBoxGroup

module.exports = React.createClass({
  _onChange: function (data) {
    Utils.alert(JSON.stringify(data))
  },
  render: function () {
    return (
      <CheckBoxGroup
        data={[{name: '香蕉', value: 0, checked: true}, {name: '苹果', value: 1, checked: true}, {name: '橘子', value: 2, checked: false}]}
        value={1}
        onChange={this._onChange}
        margin={0}
        labelWidth={100} />
    )
  }
})
