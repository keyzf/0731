var React = require('react')

var Select = require('radmin').Select

module.exports = React.createClass({
  _onChange: function (value, index) {
    console.info(value, index)
  },
  render: function () {
    return (
      <Select
        displayKey='text'
        displayValue='id'
        defaultValue='1'
        onChange={this._onChange}
        name='请选择'
        options={[{ text: '苹果', id: '0' }, { text: '梨子', id: '1' }, { text: '香蕉', id: '2' }]} />
    )
  }
})
