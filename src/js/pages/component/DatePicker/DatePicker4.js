var React = require('react')

var Utils = require('radmin').Utils
var DatePicker = require('radmin').DatePicker

module.exports = React.createClass({
  getInitialState: function () {
    return {
      date: '2017-07-07'
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
      this.state.date = null
      this.forceUpdate()
      return
    }

    this.state.date = this._dateToString(value)

    this.forceUpdate()

    Utils.prompt(this.state.date)
  },
  render: function () {
    var date = new Date()

    return (
      <div>
        <DatePicker
          name='请选择'
          format='YYYY-MM-DD'
          minDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
          maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)}
          value={this.state.date}
          onChange={this._onChange} />
      </div>
    )
  }
})
