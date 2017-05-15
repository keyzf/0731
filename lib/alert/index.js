'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Popup = require('../popup');

/**
 * 提示框
 */
var Alert = React.createClass({
  displayName: 'Alert',

  propTypes: {
    /**
     * 中间显示的内容，例：'已成功发送'
     */
    text: React.PropTypes.any,
    /**
     * 确定按钮的文本内容，例：'确定'
     */
    textConfirm: React.PropTypes.string,
    /**
     * 左上角标题，例：'温馨提示'
     */
    title: React.PropTypes.string,

    /**
     * 点击确定按钮的回调，例：function() {}
     */
    onConfirm: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      textConfirm: '确定',
      onConfirm: null
    };
  },
  render: function render() {
    return React.createElement(
      Popup,
      {
        title: this.props.title || '温馨提示',
        onConfirm: this.props.onConfirm,
        onCancel: this.props.onCancel,
        textConfirm: this.props.textConfirm,
        showCancel: false,
        maxContentHeight: 200,
        className: classnames({}, this.props.className),
        style: assign({ width: 300 }, this.props.style) },
      React.createElement(
        'div',
        { style: { textAlign: 'center', padding: '20px 0' } },
        this.props.text,
        this.props.children
      )
    );
  }
});

module.exports = Alert;