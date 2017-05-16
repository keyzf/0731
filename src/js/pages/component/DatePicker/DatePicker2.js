var React = require('react')

var Utils = require('radmin').Utils
var DatePicker = require('radmin').DatePicker

module.exports = React.createClass({
  getInitialState: function () {
    var date = new Date()
    return {
      dateTime: this._dateTimeToString(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())),
    }
  },
  _dateToString: function (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length <= 1 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate().toString().length <= 1 ? '0' : '') + date.getDate()
  },
  _dateTimeToString: function (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length <= 1 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate().toString().length <= 1 ? '0' : '') + date.getDate() + ' ' + (date.getHours().toString().length <= 1 ? '0' : '') + date.getHours() + ':' + (date.getMinutes().toString().length <= 1 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds().toString().length <= 1 ? '0' : '') + date.getSeconds()
  },
  _onChange: function (value) {
    if (!value) {
      return
    }

    this.state.dateTime = this._dateTimeToString(value)

    this.forceUpdate()

    Utils.prompt(this.state.dateTime)
  },
  render: function () {
    var date = new Date()
    
    return (
      <DatePicker
        name='请选择'
        format='YYYY-MM-DD'
        value={this.state.dateTime}
        minDate={new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())}
        maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
        onChange={this._onChange}
        fixedSecond={true}
        showTime={true} />
    )
  }
})
