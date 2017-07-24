var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Select = require('../select')
var Calendar = require('../calendar')
var Time = require('../time')
var CalendarPosition = require('../calendar/position')

const OptionType = {
  NONE: 'none',
  CUSTOM: 'react-date-range-picker-custom'
}

/**
 * 用于选择日期范围
 */
var DateRangePicker = React.createClass({
  propTypes: {
    /**
     * 默认显示的提示文字，例：'请选择'
     */
    name: React.PropTypes.any,
    /**
     * 下拉框数据结构，例：[{name: '最近一周', value: 'xxx'}, {name: '最近一月', value: 'xxx'}, {name: '最近一年', value: 'xxx'}]
     */
    options: React.PropTypes.array,
    /**
     * 下拉框默认选中的值，如果有则默认显示的提示文字不会被显示，例：'xxx'
     */
    defaultValue: React.PropTypes.any,
    /**
     * 开始日期时间，例：'2016-01-01 10:00:00'或'2016-01-01'
     */
    startValue: React.PropTypes.string,
    /**
     * 结束日期时间，例：'2016-01-01 10:00:00'或'2016-01-01'
     */
    endValue: React.PropTypes.string,
    /**
     * 最早日期时间，例：new Date()或'2016-01-01 10:00:00'或'2016-01-01'
     */
    minDate: React.PropTypes.any,
    /**
     * 最晚日期时间，例：new Date()或'2016-01-01 10:00:00'或'2016-01-01'
     */
    maxDate: React.PropTypes.any,
    /**
     * 日期格式，例：'YYYY-MM-DD'
     */
    format: React.PropTypes.string,
    /**
     * 显示界面，默认为'day'，只显示月为'month'，只显示年为'year'，例：'day'
     */
    view: React.PropTypes.string,
    /**
     * 是否显示时间(时、分、秒）控制器，例：true
     */
    showTime: React.PropTypes.bool,
    /**
     * 是否固定小时，例：false
     */
    fixedHour: React.PropTypes.bool,
    /**
     * 是否固定分钟，例：false
     */
    fixedMinute: React.PropTypes.bool,
    /**
     * 是否固定秒，例：false
     */
    fixedSecond: React.PropTypes.bool,
    /**
     * 横坐标位置偏移
     */
    left: React.PropTypes.number,
    /**
     * 日历样式宽度，不建议修改
     */
    calendarWidth: React.PropTypes.number,
    /**
     * 日历样式高度，不建议修改
     */
    calendarHeight: React.PropTypes.number,
    /**
     * 时间组件样式高度，不建议修改
     */
    showTimeHeight: React.PropTypes.number,
    /**
     * 开始时间只读
     */
    lockStart: React.PropTypes.bool, 
    /**
     * 结束时间只读
     */
    lockEnd: React.PropTypes.bool,

    /**
     * 选中回调，例：funciton(date) {}
     */
    onChange: React.PropTypes.func,
  },
  getDefaultProps: function () {
    var startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    var endDate = new Date();
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    return {
      options: [{name: '最近一周',value: {startDate: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7),endDate: new Date(endDate)}}, {name: '最近一月',value: {startDate: new Date(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDate()),endDate: new Date(endDate)}}, {name: '最近一年',value: {startDate: new Date(startDate.getFullYear() - 1, startDate.getMonth(), startDate.getDate()),endDate: new Date(endDate)}}],
      defaultValue: null,
      left: 0,
      view: 'day',
      showTime: false,
      calendarWidth: 273,
      calendarHeight: 370,
      showTimeHeight: 175,
      lockStart: false,
      lockEnd: false,
    }
  },
  getInitialState: function () {
    var startValue = this.props.startValue;
    var endValue = this.props.endValue;

    // 把时间部分取出
    var startTime = '00:00:00';
    if (startValue) {
      var index = startValue.indexOf(' ');
      this.props.showTime && index >= 0 ? startTime = startValue.substring(index) : null;
    }

    var endTime = '23:59:59';
    if (endValue) {
      index = endValue.indexOf(' ');
      this.props.showTime && index >= 0 ? endTime = endValue.substring(index) : null;
    }

    return {
      open: false,
      name: this.props.name,
      options: this.props.options,
      selectValue: this.props.defaultValue,
      showCalendar: false,
      startValue: startValue,
      endValue: endValue,
      startChecked: false,
      endChecked: false,
      computableFormat: this.props.format || 'YYYY.MM.DD',
      startTime: startTime,
      endTime: endTime,
      popupDiv: null,
      lastShowCalendar: false,
      internalLeft: 0,
      internalTop: 0,
      startMaxDate: endValue || this.props.maxDate,
      endMinDate: startValue || this.props.minDate
    }
  },
  componentWillMount: function () {
  },
  componentDidMount: function () {
    this.state.options = this.state.options ? this.state.options : [];
    var hasCustom = false;
    this.state.options.map(function (item) {
      if (item.value === OptionType.CUSTOM) {
        hasCustom = true
      }
    });
    if (!hasCustom) {
      this.state.options.push({name: '自定义时间段', value: OptionType.CUSTOM});
    }
    this.forceUpdate();

    this._createPopup()
  },
  componentWillUnmount: function () {
    this._removePopup();
  },
  componentWillReceiveProps: function (nextProps) {
    if (!(deepEqual(this.props, nextProps))) {
      this.state.name = nextProps.name;
      this.state.startValue = nextProps.startValue;
      this.state.endValue = nextProps.endValue;

      // 把时间部分取出
      if (this.state.startValue) {
        var index = this.state.startValue.indexOf(' ');
        index >= 0 ? this.state.startTime = this.state.startValue.substring(index) : null;
      }

      if (this.state.endValue) {
        index = this.state.endValue.indexOf(' ');
        index >= 0 ? this.state.endTime = this.state.endValue.substring(index) : null;
      }

      this.props = nextProps;
    }
  },
  componentWillUpdate: function () {
  },
  componentDidUpdate: function () {
    // 不能每次都重新渲染calendar 否则会重置calendar内部状态
    if (this.state.lastShowCalendar != this.state.showCalendar) {
      this.state.lastShowCalendar = this.state.showCalendar;
      this._createPopup();
    }
  },
  _onChange: function (value) {
    if (value === OptionType.CUSTOM) {
      this.setState({
        showCalendar: true,
        startChecked: false,
        endChecked: false
      })
    } else {
        if(value){
            this.setState({
                showCalendar: false,
                startMaxDate: value.endDate,
                endMinDate: value.startDate,
            })
        }

    }

    if (value != OptionType.CUSTOM) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value);
      }
    }
  },
  _onStartDateChange: function (date) {
    var self = this;
    if (typeof date === 'undefined' || date == null) {
      if (typeof this.state.startValue === 'undefined' || this.state.startValue == null || this.state.startValue === '') {
        return;
      } else {
        date = this.state.startValue;
      }
    }else{
      this.setState({
        endMinDate: date
      }, function(){
        self._createPopup();
      })
    }
    var index = date.indexOf(' ');
    index >= 0 ? date = date.substring(0, index) : null;
    this.setState({
      startValue: date + (this.props.showTime ? (' ' + this.state.startTime) : '')
    });
  },
  _onEndDateChange: function (date) {
    var self = this;
    if (typeof date === 'undefined' || date == null) {
      if (typeof this.state.endValue === 'undefined' || this.state.endValue == null || this.state.endValue === '') {
        return;
      } else {
        date = this.state.endValue;
      }
    }else{
      this.setState({
        startMaxDate: date
      }, function(){
        self._createPopup();
      })
    }
    var index = date.indexOf(' ');
    index >= 0 ? date = date.substring(0, index) : null;
    this.setState({
      endValue: date + (this.props.showTime ? (' ' + this.state.endTime) : '')
    });
  },
  _calendarInputClick: function () {
    if (this.state.options.length <= 1) {
      if (this.state.showCalendar) {
        this._hideCalendar();
      } else {
        this.setState({
          showCalendar: true,
          startChecked: false,
          endChecked: false
        });
      }
    } else {
      this._hideCalendar();
    }
  },
  _closeOnStartSelect: function () {
    this.setState({
      startChecked: true
    }, function () {
      if (this.state.startChecked && this.state.endChecked && !this.props.showTime) {
        this._hideCalendar();
      }
    })
  },
  _closeOnEndSelect: function () {
    this.setState({
      endChecked: true
    }, function () {
      if (this.state.startChecked && this.state.endChecked && !this.props.showTime) {
        this._hideCalendar();
      }
    })
  },
  _hideCalendar: function (confirm) {
    var that = this;
    if (this.state.showCalendar) {
      this.setState({
        showCalendar: false
      }, function () {
        if (typeof that.props.onChange === 'function') {
          // 点击确定键时 即使未选择也要使用默认值
          var dateString = this._dateToString(new Date());
          var startDateTimeString = dateString + ' ' + this.state.startTime;
          var endDateTimeString = dateString + ' ' + this.state.endTime;
          if (confirm === true) {
            if(
              that.props.minDate && new Date(startDateTimeString) >= new Date(that.props.minDate) || 
              !that.props.minDate
              ){

              if (!that.state.startValue) {
                that.state.startValue = this.props.showTime ? startDateTimeString : dateString
              }
            }
            if(
              that.props.maxDate && new Date(endDateTimeString) <= new Date(that.props.maxDate) ||
              !that.props.maxDate
              ){
              
              if (!that.state.endValue) {
                that.state.endValue = this.props.showTime ? endDateTimeString : dateString
              }
            }
          }

          if (that.state.startValue && that.state.endValue) {
            that.props.onChange({
              startDate: new Date(that.state.startValue),
              endDate: new Date(that.state.endValue)
            })
          } else {
            that.props.onChange(this.state.selectValue)
          }
          that.forceUpdate()
        }
      })
    }
  },
  _onStartTimeChange: function (value) {
    this.state.startTime = value;
    this.forceUpdate();
    this._onStartDateChange();
  },
  _onEndTimeChange: function (value) {
    this.state.endTime = value;
    this.forceUpdate();
    this._onEndDateChange();
  },
  _onConfirm: function() {
    this._hideCalendar(true);
  },
  _dateToString: function (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length <= 1 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate().toString().length <= 1 ? '0' : '') + date.getDate();
  },
  _dateTimeToString: function (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1).toString().length <= 1 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate().toString().length <= 1 ? '0' : '') + date.getDate() + ' ' + (date.getHours().toString().length <= 1 ? '0' : '') + date.getHours() + ':' + (date.getMinutes().toString().length <= 1 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds().toString().length <= 1 ? '0' : '') + date.getSeconds()
  },
  _createPopup: function () {
    var that = this
    this._removePopup()

    var minView = 0
    switch (this.props.view) {
      case 'month':
        minView = 1;
        break;
      case 'year':
        minView = 2;
        break;
    }
    // 动态创建浮层
    this.state.popupDiv = document.createElement('div');
    document.body.appendChild(this.state.popupDiv);
    ReactDom.render(
      this.state.showCalendar ?
        <div>
          <div className="date-range-popup-mask" onClick={this._hideCalendar} />
          <div className="date-range-popup">
            <div>
              <CalendarPosition
                key='start_calendar'
                className='start-calendar'
                calendarInputRef={that.refs.canlendar_input_ref}
                left={this.props.left}
                calendarWidth={this.props.calendarWidth * 2}
                calendarHeight={this.props.calendarHeight}
                showTime={this.props.showTime}
                showTimeHeight={this.props.showTimeHeight}
                fixedHour={this.props.fixedHour}
                fixedMinute={this.props.fixedMinute}
                fixedSecond={this.props.fixedSecond}
                >
                <Calendar
                  closeOnSelect={this._closeOnStartSelect}
                  date={this.state.startValue}
                  readonly={this.props.lockStart}
                  minDate={this.props.minDate}
                  maxDate={this.state.startMaxDate}
                  format={this.state.computableFormat}
                  computableFormat={this.state.computableFormat}
                  minView={minView}
                  onChange={this._onStartDateChange} />
                {this.props.showTime?
                  <div className="time-div">
                    <Time 
                      value={this.state.startTime} 
                      readonly={this.props.lockStart}
                      onChange={this._onStartTimeChange} 
                      fixedHour={this.props.fixedHour} 
                      fixedMinute={this.props.fixedMinute} 
                      fixedSecond={this.props.fixedSecond}
                      />
                    <div style={{textAlign: 'right'}}>
                      <div onClick={this._onConfirm} className="btn btn-rounded close-button">确定</div>
                    </div>
                  </div>
                : null}
              </CalendarPosition>
              <CalendarPosition
                key='end_calendar'
                className='end-calendar'
                calendarInputRef={that.refs.canlendar_input_ref}
                left={this.props.left}
                calendarWidth={this.props.calendarWidth * 2}
                calendarHeight={this.props.calendarHeight}
                showTime={this.props.showTime}
                showTimeHeight={this.props.showTimeHeight}
                fixedHour={this.props.fixedHour}
                fixedMinute={this.props.fixedMinute}
                fixedSecond={this.props.fixedSecond}
                >
                <Calendar
                  closeOnSelect={this._closeOnEndSelect}
                  date={this.state.endValue}
                  readonly={this.props.lockEnd}
                  minDate={this.state.endMinDate}
                  maxDate={this.props.maxDate}
                  format={this.state.computableFormat}
                  computableFormat={this.state.computableFormat}
                  minView={minView}
                  onChange={this._onEndDateChange} />
                {this.props.showTime ?
                  <div className="time-div">
                    <Time 
                      value={this.state.endTime}
                      readonly={this.props.lockEnd}
                      onChange={this._onEndTimeChange} 
                      fixedHour={this.props.fixedHour} 
                      fixedMinute={this.props.fixedMinute} 
                      fixedSecond={this.props.fixedSecond}
                      />
                    <div style={{textAlign: 'right'}}>
                      <div 
                        onClick={this._onConfirm} 
                        className="btn btn-rounded close-button"
                        >
                        确定
                      </div>
                    </div>
                  </div>
                : null}
              </CalendarPosition>
            </div>
          </div>
        </div>
      :
        <div></div>
    , this.state.popupDiv)
  },
  _removePopup: function () {
    if (this.state.popupDiv) {
      ReactDom.unmountComponentAtNode(this.state.popupDiv);
      this.state.popupDiv.parentNode.removeChild(this.state.popupDiv);
      this.state.popupDiv = null
    }
  },
  render: function() {
    var name = this.state.name || '请选择';
    if (this.state.startValue && this.state.endValue) {
      name = this.state.startValue + ' - ' + this.state.endValue;
      this.state.selectValue = '';
    }
    return (
      <div className={classnames({'date-range-picker': true}, this.props.className)} style={assign({width: 215, whiteSpace: 'nowrap'}, this.props.style)}>
        <div ref='canlendar_input_ref'>
          {this.state.showCalendar || this.state.options.length <= 1 ?
            <div className="calendar-input">
              <div className="button" onClick={this._calendarInputClick} style={assign({width: '100%', whiteSpace: 'nowrap'}, this.props.style)}>{(this.state.startValue ? this.state.startValue : '开始时间') + ' - ' + (this.state.endValue ? this.state.endValue : '结束时间')}</div>
            </div>
          :
            <Select name={name} options={this.state.options} defaultValue={this.state.selectValue} onChange={this._onChange} style={assign({width: '100%', whiteSpace: 'nowrap'}, this.props.style)} ></Select>
          }
        </div>
      </div>
    )
  }
});

module.exports = DateRangePicker;
