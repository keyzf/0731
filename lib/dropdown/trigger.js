'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trigger = (0, _react.createClass)({
  displayName: 'Trigger',

  propTypes: {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: ''
    };
  },
  render: function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className;


    return _react2.default.createElement(
      'a',
      this.props,
      children
    );
  }
});

exports.default = Trigger;