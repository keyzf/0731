'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Utils = require('../utils');

var ClipBoard = require('clipboard');

/**
 * 点击完成指定字符串的复制操作
 */
var Clipboard = React.createClass({
  displayName: 'Clipboard',

  propTypes: {
    /**
     * 要复制的文本内容，例：'http://www.qq.com'
     */
    text: React.PropTypes.string
  },
  getInitialState: function getInitialState() {
    return {
      text: this.props.text
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.state.data, nextProps)) {
      this.state.text = nextProps.text;
    }
  },
  componentDidMount: function componentDidMount() {
    var self = this;
    var clipboard = new ClipBoard(ReactDom.findDOMNode(this.refs.clipboard), {
      text: function text() {
        return self.state.text || '';
      }
    });
    clipboard.on('success', function (e) {
      Utils.prompt('已复制到剪贴板');
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { ref: 'clipboard', className: classnames({}, this.props.className), style: assign({}, this.props.style) },
      this.props.children
    );
  }
});

module.exports = Clipboard;