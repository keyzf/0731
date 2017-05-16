var React = require('react')

var Utils = require('radmin').Utils

module.exports = React.createClass({
  _alert: function () {
    Utils.alert('这是alert框')
  },
  render: function () {
    return (
      <button type='button' className='btn btn-default' onClick={this._alert}>
        Alert
      </button>
    )
  }
})
