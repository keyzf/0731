var React = require('react')

var Utils = require('radmin').Utils

module.exports = React.createClass({
  _confirm: function () {
    Utils.confirm({
      text: '这是confirm框',
      onConfirm: function () {
        Utils.prompt('确定')
      },
      onCancel: function () {
        Utils.prompt('取消')
      }
    })
  },
  render: function () {
    return (
      <button type='button' className='btn btn-default' onClick={this._confirm}>
        Confirm
      </button>
    )
  }
})
