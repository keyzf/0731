var React = require('react')

var Select = require('radmin').Select

module.exports = React.createClass({
  _onChange: function (value, index) {
    console.info(value, index)
  },
  render: function () {
    return (
      <Select
        name='请选择' 
        onChange={this._onChange} 
        options={[{ name: '苹果', value: '0' }, { name: '梨子', value: '1' }, { name: '香蕉', value: '2' }]} 
        />
    )
  }
})
