var React = require('react')

var Utils = require('radmin').Utils
var InlineEdit = require('radmin').InlineEdit

module.exports = React.createClass({
  getInitialState: function () {
    return {
      desc: ''
    }
  },
  _editDesc: function (value) {
    var that = this
    if (value != this.state.desc) {
      this.state.desc = value
      Utils.prompt('名称更改成功')
      this.forceUpdate()
    }
  },
  render: function () {
    return (
      <InlineEdit onBlur={this._editDesc} placeholder={<div style={{color: '#aaaaaa'}}>点击输入...</div>}>
        {this.state.desc}
      </InlineEdit>
    )
  }
})
