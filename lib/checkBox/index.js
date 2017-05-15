'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

/**
 * 单个复选框，多个复选框推荐直接使用CheckBoxGroup
 */
var CheckBox = React.createClass({
  displayName: 'CheckBox',

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
     * class，例：checkbox
     */
    className: React.PropTypes.any,
    /**
     * 是否选中，例：true
     */
    checked: React.PropTypes.bool,
    /**
     * 是否只读，例：true
     */
    disabled: React.PropTypes.bool,

    /**
     * 点击回调，例：function(value, checked) {}
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
  getInitialState: function getInitialState() {
    return {
      checked: this.props.checked
    };
  },
  _onChange: function _onChange(e) {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      checked: e.target.checked
    });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.value, e.target.checked);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.checked != nextProps.checked) {
      this.state.checked = nextProps.checked;
    }

    this.props = nextProps;
    this.forceUpdate();
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ checkbox: true, disabled: this.props.disabled }, this.props.className), style: assign({}, this.props.style) },
      React.createElement(
        'label',
        { style: { verticalAlign: 'top' } },
        React.createElement(
          'div',
          { className: classnames({ disabled: this.props.disabled }, 'checker') },
          React.createElement(
            'span',
            { className: this.state.checked ? 'checked' : null },
            React.createElement('input', {
              type: 'checkbox',
              name: this.props.name,
              value: this.props.value,
              checked: this.state.checked,
              onChange: this._onChange
            })
          )
        ),
        this.props.children
      )
    );
  }
});

module.exports = CheckBox;