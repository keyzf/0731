var React = require('react')

var Utils = require('radmin').Utils

module.exports = React.createClass({
  _prompt: function() {
    Utils.prompt('悬浮提示哟')
  },
  render: function () {
    return (
      <button type='button' className='btn btn-default' onClick={this._prompt}>
        Prompt
      </button>
    )
  }
})
