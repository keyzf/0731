'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Calendar = require('../calendar');
var Time = require('../time');
var CalendarPosition = require('../calendar/position');

/**
 * 用于选择日期
 */
var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    /**
     * 默认显示的提示文字，例：'请选择'
     */
    name: React.PropTypes.any,
    /**
     * 默认选中的日期，例：'2016-01-01'
     */
    date: React.PropTypes.any,
    /**
     * 可选日期最小值，例：new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())
     */
    minDate: React.PropTypes.any,
    /**
     * 可选日期最大值，例：new Date()
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
     * 显示清除按钮，例：true
     */
    showClear: React.PropTypes.bool,
    /**
     * 点击layer自动设置时间，例：true
     * zee
     */
    layerCloseSetDate: React.PropTypes.bool,
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
     * 默认显示的时间
     */
    defaultTime: React.PropTypes.string,
    /**
     * 日历展示开始的日期
     * zee 20170503
     */
    startValue: React.PropTypes.string,

    /**
     * 选中回调，例：funciton(date) {}
     */
    onChange: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      left: 0,
      view: 'day',
      showClear: true,
      layerCloseSetDate: true,
      showTime: false,
      calendarWidth: 273,
      calendarHeight: 370,
      showTimeHeight: 175,
      defaultTime: '00:00:00',
      startValue: ''
    };
  },
  getInitialState: function getInitialState() {
    var startValue = this.props.value;

    // 把时间部分取出
    var startTime = this.props.defaultTime;
    if (startValue) {
      var index = startValue.indexOf(' ');
      index >= 0 ? startTime = startValue.substring(index) : null;
    }

    return {
      open: false,
      name: this.props.name,
      showCalendar: false,
      startValue: startValue,
      computableFormat: this.props.format || 'YYYY.MM.DD',
      startTime: startTime,
      popupDiv: null,
      lastShowCalendar: false,
      internalLeft: 0,
      internalTop: 0,

      canlendarRef: null
    };
  },
  componentDidMount: function componentDidMount() {
    this._createPopup();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._removePopup();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.state.name = nextProps.name;
      this.state.startValue = nextProps.value;

      // 把时间部分取出
      if (this.state.startValue) {
        var index = this.state.startValue.indexOf(' ');
        index >= 0 ? this.state.startTime = this.state.startValue.substring(index) : null;
      }

      this.props = nextProps;
    }
  },
  componentWillUpdate: function componentWillUpdate() {},
  componentDidUpdate: function componentDidUpdate() {
    // 不能每次都重新渲染calendar 否则会重置calendar内部状态
    if (this.state.lastShowCalendar != this.state.showCalendar) {
      this.state.lastShowCalendar = this.state.showCalendar;
      this._createPopup();
    }
  },
  _onStartDateChange: function _onStartDateChange(date) {
    if (typeof date === 'undefined' || date == null) {
      if (typeof this.state.startValue === 'undefined' || this.state.startValue == null || this.state.startValue === '') {
        return;
      } else {
        date = this.state.startValue;
      }
    }
    var index = date.indexOf(' ');
    index >= 0 ? date = date.substring(0, index) : null;
    this.setState({
      startValue: date + (this.props.showTime ? ' ' + this.state.startTime : '')
    });
  },
  _calendarInputClick: function _calendarInputClick() {
    if (this.state.showCalendar) {
      this._hideCalendar();
    } else {
      this.setState({
        showCalendar: true
      });
    }
  },
  _closeOnStartSelect: function _closeOnStartSelect() {
    this._hideCalendar();
  },
  _hideCalendar: function _hideCalendar() {
    var that = this;
    if (this.state.showCalendar) {
      this.setState({
        showCalendar: false
      }, function () {
        if (typeof that.props.onChange === 'function') {
          if (that.state.startValue != null && that.state.startValue != '') {
            that.props.onChange(new Date(that.state.startValue));
          } else {
            that.props.onChange(null);
          }
        }
      });
    }
  },
  //zee add for layer click 20170502
  _onLayerClick: function _onLayerClick() {
    var that = this;
    if (this.props.layerCloseSetDate) {
      this._hideCalendar();
    } else {
      this.setState({
        showCalendar: false
      }, function () {
        /*if (typeof that.props.onChange === 'function') {
            if (that.props.value != null && that.props.value != '') {
                that.props.onChange(
                    new Date(that.props.value)
                )
            } else {
                that.props.onChange(
                    null
                )
            }
        }*/
      });
    }
  },
  _onStartTimeChange: function _onStartTimeChange(value) {
    this.state.startTime = value;
    this.forceUpdate();
    this._onStartDateChange();
  },
  _createPopup: function _createPopup() {
    var that = this;
    this._removePopup();

    var minView = 0;
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
    this.state.canlendarRef = ReactDom.render(this.state.showCalendar ? React.createElement(
      'div',
      null,
      React.createElement('div', { className: 'date-range-popup-mask', onClick: this._onLayerClick }),
      React.createElement(
        'div',
        { className: 'date-range-popup' },
        React.createElement(
          'div',
          null,
          React.createElement(
            CalendarPosition,
            {
              key: 'start_calendar',
              className: 'start-calendar',
              calendarInputRef: that.refs.canlendar_input_ref,
              left: this.props.left,
              calendarWidth: this.props.calendarWidth,
              calendarHeight: this.props.calendarHeight,
              showTime: this.props.showTime,
              showTimeHeight: this.props.showTimeHeight,
              fixedHour: this.props.fixedHour,
              fixedMinute: this.props.fixedMinute,
              fixedSecond: this.props.fixedSecond
            },
            React.createElement(Calendar, {
              closeOnSelect: this._closeOnStartSelect,
              date: this.state.startValue || this.props.startValue,
              minDate: this.props.minDate,
              maxDate: this.props.maxDate,
              format: this.state.computableFormat,
              computableFormat: this.state.computableFormat,
              minView: minView,
              onChange: this._onStartDateChange }),
            this.props.showTime ? React.createElement(
              'div',
              { className: 'time-div' },
              React.createElement(Time, {
                value: this.state.startTime,
                onChange: this._onStartTimeChange,
                fixedHour: this.props.fixedHour,
                fixedMinute: this.props.fixedMinute,
                fixedSecond: this.props.fixedSecond }),
              React.createElement(
                'div',
                { style: { textAlign: 'right' } },
                React.createElement(
                  'div',
                  { onClick: this._hideCalendar, className: 'btn btn-rounded close-button' },
                  '\u5173\u95ED'
                )
              )
            ) : null
          )
        )
      )
    ) : React.createElement('div', null), this.state.popupDiv);
  },
  _removePopup: function _removePopup() {
    if (this.state.popupDiv) {
      this.state.canlendarRef = null;
      ReactDom.unmountComponentAtNode(this.state.popupDiv);
      this.state.popupDiv.parentNode.removeChild(this.state.popupDiv);
      this.state.popupDiv = null;
    }
  },
  _clear: function _clear() {
    this.state.startValue = null;
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(null);
    }
    this.forceUpdate();
  },
  _onMouseOver: function _onMouseOver() {
    this.setState({ mouseOver: true });
  },
  _onMouseOut: function _onMouseOut() {
    this.setState({ mouseOver: false });
  },
  render: function render() {
    var name = this.state.name || '请选择';
    this.state.startValue ? name = this.state.startValue : null;

    return React.createElement(
      'div',
      { className: classnames({ 'date-picker': true }, this.props.className), style: assign({ width: 215 }, this.props.style) },
      React.createElement(
        'div',
        { className: 'calendar-input', ref: 'canlendar_input_ref', onMouseEnter: this._onMouseOver, onMouseLeave: this._onMouseOut },
        this.props.showClear && this.state.startValue && !this.showCalendar && this.state.mouseOver ? React.createElement(
          'span',
          { className: 'calendar-input-opera' },
          React.createElement('i', { className: 'icon-cross3', onClick: this._clear })
        ) : null,
        React.createElement(
          'div',
          { className: 'button', onClick: this._calendarInputClick, style: assign({ width: '100%', whiteSpace: 'nowrap' }, this.props.style) },
          this.state.startValue ? this.state.startValue : name
        )
      )
    );
  }
});

module.exports = DatePicker;