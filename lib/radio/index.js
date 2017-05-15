'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

/**
 * 单个单选框，多个单选框推荐直接使用RadioGroup
 */
var Radio = React.createClass({
  displayName: 'Radio',

  propTypes: {
    /**
     * 组名，例：'group1'
     */
    name: React.PropTypes.string,
    /**
     * 值，例：1
     */
    value: React.PropTypes.any,
    /**
     * 是否选中，例：true
     */
    checked: React.PropTypes.bool,
    /**
     * 是否只读，例：true
     */
    disabled: React.PropTypes.bool,

    /**
     * 点击回调，例：function(value) {}
     */
    onChange: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      value: '',
      checked: false,
      onChange: null,
      disabled: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.forceUpdate();
  },
  _onChange: function _onChange(e) {
    if (this.props.disabled) {
      return;
    }
    if (e.target.value == this.props.value) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.props.value);
      }
    } else {}
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ radio: true, disabled: this.props.disabled }, this.props.className), style: assign({}, this.props.style) },
      React.createElement(
        'label',
        { style: { verticalAlign: 'top' } },
        React.createElement(
          'div',
          { className: classnames({ disabled: this.props.disabled }, 'choice') },
          React.createElement(
            'span',
            { className: this.props.checked ? 'checked' : null },
            React.createElement('input', {
              type: 'radio',
              name: this.props.name,
              value: this.props.value,
              checked: this.props.checked,
              onChange: this._onChange })
          )
        ),
        this.props.children
      )
    );
  }
});

module.exports = Radio;