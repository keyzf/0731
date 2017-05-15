'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Assign = require('object-assign');
var ClassNames = require('classnames');
var DeepEqual = require('deep-equal');

var Popup = require('../popup');

/**
 * 如果使用OA或QQ两种登录方式则显示此弹层
 */
var LoginChooser = React.createClass({
  displayName: 'LoginChooser',

  propTypes: {
    /**
     * 关闭按钮的文字，例：'关闭'
     */
    textConfirm: React.PropTypes.string,

    /**
     * 点击OA登录按钮的回调，例：function() {}
     */
    onOA: React.PropTypes.func,
    /**
     * 点击QQ登录按钮的回调，例：function() {}
     */
    onQQ: React.PropTypes.func,
    /**
     * 点击关闭按钮的回调，例：function() {}
     */
    onClose: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      textConfirm: '关闭'
    };
  },
  render: function render() {
    return React.createElement(
      Popup,
      {
        name: '\u767B\u5F55',
        textConfirm: this.props.textConfirm,
        onConfirm: this.props.onClose,
        showCancel: false,
        className: ClassNames({}, this.props.className), style: Assign({ width: 582 }, this.props.style) },
      React.createElement(
        'div',
        { className: 'login-chooser' },
        React.createElement(
          'div',
          { className: 'item oa' },
          React.createElement(
            'div',
            { className: 'bg' },
            React.createElement(
              'button',
              { className: 'btn btn-default', onClick: this.props.onOA },
              'OA\u767B\u5F55'
            ),
            React.createElement(
              'span',
              null,
              '(\u9002\u7528\u4E8E\u817E\u8BAF\u5185\u90E8\u76F8\u5173\u4EBA\u5458)'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'item qq' },
          React.createElement(
            'div',
            { className: 'bg' },
            React.createElement(
              'button',
              { className: 'btn btn-default', onClick: this.props.onQQ },
              'QQ\u767B\u5F55'
            ),
            React.createElement(
              'span',
              null,
              '(\u9002\u7528\u4E8E\u5916\u5305\u548C\u7B2C\u4E09\u65B9\u5F00\u53D1\u8005)'
            )
          )
        )
      )
    );
  }
});

module.exports = LoginChooser;