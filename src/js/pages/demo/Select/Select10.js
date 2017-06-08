var React = require('react')

var Select = require('radmin').Select

module.exports = React.createClass({
  getInitialState: function(){
    return {
      optionsAll: [{ name: '苹果', value: '0' }, { name: '梨子', value: '1' }, { name: '香蕉', value: '2' }, { name: '西瓜', value: '3' }, { name: '芒果', value: '4' }],
      options: null
    }
  },
  _onChange: function (value, index) {
    console.info(value, index)
  },
  _onUpdate: function (value) {
    if (typeof value === 'undefined' || value == null || value === '') {
      this.setState({options: null})
    } else {
      this.setState({
        options: this.state.optionsAll.filter(function(item){
          return (value || value === 0) && (item.name.indexOf(value) > -1 || item.value.indexOf(value) > -1)
        })
      })
    }
  },
  render: function () {
    return (
      <Select
        autocomplete
        multiselect
        defaultValue={[{ name: '香蕉', value: '2' }, { name: '西瓜', value: '3' }]}
        onUpdate={this._onUpdate}
        onChange={this._onChange}
        name='请选择'
        options={this.state.options} 
        />
    )
  }
})
