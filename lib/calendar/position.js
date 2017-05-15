'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var CalendarPosition = React.createClass({
  displayName: 'CalendarPosition',

  getInitialState: function getInitialState() {
    return {};
  },
  componentWillMount: function componentWillMount() {
    this._onWindowScroll();
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('scroll', this._onWindowScroll);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('scroll', this._onWindowScroll);
  },
  _onWindowScroll: function _onWindowScroll() {
    if (this.props.calendarInputRef && this.state) {
      var boundingClientRect = ReactDom.findDOMNode(this.props.calendarInputRef).getBoundingClientRect();
      this.state.top = boundingClientRect.top;
      this.state.left = boundingClientRect.left;
      this.state.width = boundingClientRect.width;
      this.state.height = boundingClientRect.height;

      var screenWidth = document.documentElement.clientWidth;
      var screenHeight = document.documentElement.clientHeight;

      if (boundingClientRect.top > 0 && boundingClientRect.top < screenHeight && boundingClientRect.left > 0 && boundingClientRect.left < screenWidth) {
        this._restrict();
      } else if (boundingClientRect.top + boundingClientRect.height > 0 && boundingClientRect.top + boundingClientRect.height < screenHeight && boundingClientRect.left + boundingClientRect.width > 0 && boundingClientRect.left + boundingClientRect.width < screenWidth) {
        this._restrict();
      }
      this.forceUpdate();
    }
  },
  _restrict: function _restrict() {
    var left = this.state.left;
    var top = this.state.top;
    var width = this.props.calendarWidth;
    var height = this.props.calendarHeight + (this.props.showTime ? this.props.showTimeHeight : 0) + (this.props.fixedHour ? -28 : 0) + (this.props.fixedMinute ? -28 : 0) + (this.props.fixedSecond ? -28 : 0);

    var screenWidth = document.documentElement.clientWidth;
    var screenHeight = document.documentElement.clientHeight;

    // 屏幕到边约束
    left + width > screenWidth ? left = screenWidth - width : null;
    top + height > screenHeight ? top = screenHeight - height : null;

    this.state.left = left;
    this.state.top = top;
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.props = nextProps;
    }
  },
  render: function render() {
    var that = this;
    var position = this.state && typeof this.state.top != 'undefined' && this.state.top != null ? { top: this.state.top + this.state.height, left: this.state.left + this.props.left } : null;
    return React.createElement(
      'div',
      { className: classnames({ radio: true }, this.props.className), style: assign({ display: 'inline-block' }, this.props.style, position) },
      this.props.children
    );
  }
});

module.exports = CalendarPosition;