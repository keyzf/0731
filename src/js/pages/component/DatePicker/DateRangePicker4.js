var React = require('react')

var Utils = require('radmin').Utils
var DateRangePicker = require('radmin').DateRangePicker

module.exports = React.createClass({
  getInitialState: function () {
    return {
      startTime: '2017-03-15',
      endTime: '2017-04-10'
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

    this.state.startTime = this._dateTimeToString(value.startDate)
    this.state.endTime = this._dateTimeToString(value.endDate)

    this.forceUpdate()

    if ((new Date(this.state.end).getTime()) < (new Date(this.state.begin).getTime())) {
      Utils.prompt('结束时间必须大于开始时间')
    } else {
      Utils.prompt(this.state.startTime + ' 至 ' + this.state.endTime)
    }
  },
  render: function () {
    return (
      <DateRangePicker
        options={[]}
        format='YYYY-MM-DD'
        lockStart={true}
        lockEnd={true}
        startValue={this.state.startTime}
        endValue={this.state.endTime}
        onChange={this._onChange}
        showTime={true}
        style={{width: 340}} />
    )
  }
})
