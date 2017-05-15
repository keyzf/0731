'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = (0, _react.createClass)({
  displayName: 'Content',

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
    return _react2.default.createElement(
      'ul',
      { className: 'dropdown-menu dropdown-menu-right' },
      this.props.children
    );
  }
});

exports.default = Content;