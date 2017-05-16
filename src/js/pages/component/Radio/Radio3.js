var React = require('react')

var Utils = require('radmin').Utils
var RadioGroup = require('radmin').RadioGroup

module.exports = React.createClass({
  getInitialState: function(){
    return{
      value: 1  //用于绑定value值
    }
  },
  componentDidMount: function() {
    this.setState({value: 2})
  },
  _onChange: function (data, value) {
    console.info(data)
    Utils.prompt(value)
    this.setState({value: value})
  },
  render: function () {
    return (
      <RadioGroup
        data={[{name: '香蕉', value: 0}, {name: '苹果', value: 1}, {name: '橘子', value: 2}]}
        value={this.state.value}
        onChange={this._onChange}
        margin={0}
        vertical={true} />
    )
  }
})
