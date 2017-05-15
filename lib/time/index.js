'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Slider = require('../slider');

/**
 * 用于选择日期
 */
var Time = React.createClass({
  displayName: 'Time',

  propTypes: {
    /**
     * 时间值，例：'09:10:10'
     */
    value: React.PropTypes.string,
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
     * 只读，例：true
     */
    readonly: React.PropTypes.bool,

    /**
     * 时间改变的回调函数，例：function(timeString) {}
     */
    onChange: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      fixedHour: false,
      fixedMinute: false,
      fixedSecond: false,
      readonly: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      time: '00:00:00'
    };
  },
  componentWillMount: function componentWillMount() {
    this._propsTransferToState();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.props = nextProps;
      this._propsTransferToState();
    }
  },
  _propsTransferToState: function _propsTransferToState() {
    this.state.hour = 0;
    this.state.minute = 0;
    this.state.second = 0;

    if (typeof this.props.value != 'undefined' && this.props.value != null) {
      var array = this.props.value.split(':');
      if (typeof array[0] !== 'undefined' && array[0] != null && typeof array[1] != 'undefined' && array[1] != null && typeof array[2] != 'undefined' && array[2] != null) {
        this.state.hour = parseInt(array[0].toString().replace(/(^\s*)|(\s*$)/g, ''));
        this.state.minute = parseInt(array[1].toString().replace(/(^\s*)|(\s*$)/g, ''));
        this.state.second = parseInt(array[2].toString().replace(/(^\s*)|(\s*$)/g, ''));
      }
    }
    this.forceUpdate();
  },
  _timeToString: function _timeToString() {
    var hour = (this.state.hour.toString().length <= 1 ? '0' : '') + this.state.hour;
    var minute = (this.state.minute.toString().length <= 1 ? '0' : '') + this.state.minute;
    var second = (this.state.second.toString().length <= 1 ? '0' : '') + this.state.second;
    return hour + ':' + minute + ':' + second;
  },
  _hourChange: function _hourChange(value) {
    this.state.hour = value;

    this.forceUpdate();
    this._onChange();
  },
  _minuteChange: function _minuteChange(value) {
    this.state.minute = value;

    this.forceUpdate();
    this._onChange();
  },
  _secondChange: function _secondChange(value) {
    this.state.second = value;

    this.forceUpdate();
    this._onChange();
  },
  _onChange: function _onChange() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this._timeToString());
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ time: true }, this.props.className), style: assign({}, this.props.style) },
      this.props.fixedHour ? null : React.createElement(
        'div',
        { className: 'time-line' },
        React.createElement(
          'div',
          { style: { width: '15%', display: 'inline-block' } },
          '\u65F6\uFF1A'
        ),
        React.createElement(
          'div',
          { style: { width: '85%', display: 'inline-block' } },
          React.createElement(Slider, {
            min: 0,
            max: 23,
            step: 1,
            readonly: this.props.readonly,
            value: this.state.hour,
            onChange: this._hourChange })
        )
      ),
      this.props.fixedMinute ? null : React.createElement(
        'div',
        { className: 'time-line' },
        React.createElement(
          'div',
          { style: { width: '15%', display: 'inline-block' } },
          '\u5206\uFF1A'
        ),
        React.createElement(
          'div',
          { style: { width: '85%', display: 'inline-block' } },
          React.createElement(Slider, {
            min: 0,
            max: 59,
            step: 1,
            readonly: this.props.readonly,
            value: this.state.minute,
            onChange: this._minuteChange })
        )
      ),
      this.props.fixedSecond ? null : React.createElement(
        'div',
        { className: 'time-line' },
        React.createElement(
          'div',
          { style: { width: '15%', display: 'inline-block' } },
          '\u79D2\uFF1A'
        ),
        React.createElement(
          'div',
          { style: { width: '85%', display: 'inline-block' } },
          React.createElement(Slider, {
            min: 0,
            max: 59,
            step: 1,
            readonly: this.props.readonly,
            value: this.state.second,
            onChange: this._secondChange })
        )
      ),
      React.createElement(
        'div',
        null,
        '\u65F6\u95F4\uFF1A',
        React.createElement(
          'span',
          { style: { paddingLeft: 8 } },
          this._timeToString()
        )
      )
    );
  }
});

module.exports = Time;