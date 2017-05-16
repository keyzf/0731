var React = require('react')

var Utils = require('radmin').Utils

module.exports = React.createClass({
  _promptWithCallback: function() {
    Utils.prompt({
      text: '悬浮提示带回调哟',
      onClose: function() {
        Utils.prompt('执行回调')
      }
    })
  },
  render: function () {
    return (
      <button type='button' className='btn btn-default' onClick={this._promptWithCallback}>
        Prompt
      </button>
    )
  }
})
