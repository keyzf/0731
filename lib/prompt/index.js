'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

/**
 * 浮动提示，2秒后消失
 */
var Prompt = React.createClass({
  displayName: 'Prompt',

  propTypes: {
    /**
     * 提示内容，例：'成功'
     */
    text: React.PropTypes.any
  },
  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      onClose: null
    };
  },
  componentDidMount: function componentDidMount() {
    var that = this;
    window.setTimeout(function () {
      if (typeof that.props.onClose === 'function') {
        that.props.onClose();
      }
    }, 2000);
  },
  componentWillUnmount: function componentWillUnmount() {},
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ prompt: true }, this.props.className), style: assign({}, this.props.style) },
      React.createElement(
        'div',
        { className: 'prompt-text' },
        this.props.text
      )
    );
  }
});

module.exports = Prompt;