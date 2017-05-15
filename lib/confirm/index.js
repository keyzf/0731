'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Popup = require('../popup');

/**
 * 确认框
 */
var Confirm = React.createClass({
  displayName: 'Confirm',

  propTypes: {
    /**
     * 中间显示的内容，例：'是否删除？'
     */
    text: React.PropTypes.any,
    /**
     * 确定按钮的文本内容，例：'确定'
     */
    textConfirm: React.PropTypes.string,
    /**
     * 取消按钮的文本内容，例：'取消'
     */
    textCancel: React.PropTypes.string,
    /**
     * 左上角标题，例：'温馨提示'
     */
    title: React.PropTypes.string,

    /**
     * 点击确定按钮回调，例：function() {}
     */
    onConfirm: React.PropTypes.func,
    /**
     * 点击取消按钮回调，例：function() {}
     */
    onCancel: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      textConfirm: '确定',
      textCancel: '取消'
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
        textCancel: this.props.textCancel,
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

module.exports = Confirm;