'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Vertical = require('./vertical');
var Horizontal = require('./horizontal');

var Navigation = React.createClass({
  displayName: 'Navigation',

  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'vertical'
    };
  },
  render: function render() {
    return this.props.mode == 'vertical' ? React.createElement(Vertical, this.props) : React.createElement(Horizontal, this.props);
  }
});

module.exports = Navigation;