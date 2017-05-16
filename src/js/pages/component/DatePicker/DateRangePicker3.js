var React = require('react')

var Utils = require('radmin').Utils
var DateRangePicker = require('radmin').DateRangePicker

module.exports = React.createClass({
  getInitialState: function () {
    return {
      startTime: null,
      endTime: null
    }
  },
  _monthToString: function (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length <= 1 ? '0' : '') + (date.getMonth() + 1)
  },
  _onChange: function (value) {
    if (!value) {
      return
    }

    this.state.startTime = this._monthToString(value.startDate)
    this.state.endTime = this._monthToString(value.endDate)

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
        format='YYYY-MM'
        startValue={this.state.startTime}
        endValue={this.state.endTime}
        onChange={this._onChange}
        view='month'
        style={{width: 340}} />
    )
  }
})
