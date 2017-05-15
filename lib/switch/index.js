'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

/**
 * 开关
 */
var Switch = React.createClass({
  displayName: 'Switch',

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
     * 点击回调，例：function(checked) {}
     */
    onChange: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      value: '',
      checked: false,
      onChange: null
    };
  },
  getInitialState: function getInitialState() {
    return {
      checked: this.props.checked
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.checked != nextProps.checked) {
      this.props = nextProps;
      this.state.checked = this.props.checked;
    }
  },
  _onClick: function _onClick() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(!this.state.checked);
    }
  },
  render: function render() {
    return React.createElement(
      'label',
      { className: classnames({}, this.props.className), style: assign({}, this.props.style) },
      React.createElement(
        'span',
        { className: this.state.checked ? 'switchery switchery-default checked' : 'switchery switchery-default', onClick: this._onClick },
        React.createElement('small', { className: this.state.checked ? 'checked' : '' })
      ),
      this.props.children
    );
  }
});

module.exports = Switch;