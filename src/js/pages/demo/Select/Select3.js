var React = require('react')

var Select = require('radmin').Select

var optionsAll = [{ name: '苹果', value: '0' }, { name: '梨子', value: '1' }, { name: '香蕉', value: '2' }, { name: '西瓜', value: '3' }]

module.exports = React.createClass({
  getInitialState: function(){
    return{
      options: optionsAll
    }
  },
  _onUpdate: function(value){
    if (typeof value === 'undefined' || value == null || value === '') {
      this.setState({options: optionsAll})
    } else {
      this.setState({
        options: optionsAll.filter(function(item){
          return (value || value === 0) && (item.name.indexOf(value) > -1 || item.value.indexOf(value) > -1)
        })
      })
    }
  },
  _onChange: function (value, index) {
    console.info(value, index)
    this.setState({
      options: optionsAll
    })
  },
  render: function () {
    return (
      <Select
        searchable
        onChange={this._onChange}
        onUpdate={this._onUpdate}
        name='请选择'
        options={this.state.options}
        />
    )
  }
})
