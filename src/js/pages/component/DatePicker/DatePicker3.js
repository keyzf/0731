var React = require('react')

var Utils = require('radmin').Utils
var DatePicker = require('radmin').DatePicker

module.exports = React.createClass({
  getInitialState: function () {
    var date = new Date()
    return {
      dateTime: undefined,
    }
  },
  _monthToString: function (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length <= 1 ? '0' : '') + (date.getMonth() + 1)
  },
  _onChange: function (value) {
    if (!value) {
      return
    }
    
    this.state.dateTime = this._monthToString(value)

    this.forceUpdate()

    Utils.prompt(this.state.dateTime)
  },
  render: function () {
    var date = new Date()
    
    return (
      <DatePicker
        name='请选择'
        format='YYYY-MM'
        value={this.state.dateTime}
        view='month'
        onChange={this._onChange}
        />
    )
  }
})
