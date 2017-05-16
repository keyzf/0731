var React = require('react')

var Utils = require('radmin').Utils
var DateRangePicker = require('radmin').DateRangePicker

module.exports = React.createClass({
  getInitialState: function () {
    return {
      start: null,
      end: null,
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

    if (value === 'all') {
      Utils.prompt('全部')
    } else {
      this.state.start = this._dateToString(value.startDate)
      this.state.end = this._dateToString(value.endDate)

      this.forceUpdate()

      Utils.prompt(this.state.start + ' 至 ' + this.state.end)
    }
  },
  _getOptions: function () {
    var startDate = new Date()
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)

    var endDate = new Date()
    endDate.setHours(0)
    endDate.setMinutes(0)
    endDate.setSeconds(0)

    var options = [{
      name: '全部',
      value: 'all'
    }, {
      name: '最近一天',
      value: {
        startDate: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1),
        endDate: new Date(endDate)
      }
    }, {
      name: '最近一周',
      value: {
        startDate: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7),
        endDate: new Date(endDate)
      }
    }, {
      name: '最近一月',
      value: {
        startDate: new Date(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDate()),
        endDate: new Date(endDate)
      }
    }]
    return options
  },
  render: function () {
    var date = new Date()
    
    return (
      <DateRangePicker
        name='请选择'
        options={this._getOptions()}
        format='YYYY-MM-DD'
        startValue={this.state.start}
        endValue={this.state.end}
        minDate={new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())}
        maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
        onChange={this._onChange} />
    )
  }
})
