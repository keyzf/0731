var React = require('react')

var Utils = require('radmin').Utils
var Tags = require('radmin').Tags

module.exports = React.createClass({
  _onChange: function (index, ev) {
    Utils.prompt('点击标签' + index)
  },
  _onDelete: function(index, ev){
    Utils.prompt('删除标签' + index)
  },
  render: function () {
    return (
      <Tags data={[{ name: '苹果', value: '0' }, { name: '梨子', value: '1' }, { name: '香蕉', value: '2' }]} onChange={this._onChange} onDelete={this._onDelete} />
    )
  }
})
