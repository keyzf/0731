'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Item = require('./item');

var Navigation = React.createClass({
  displayName: 'Navigation',

  propTypes: {
    data: React.PropTypes.any,
    mode: React.PropTypes.string
  },
  contextTypes: {
    location: React.PropTypes.any
  },
  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'horizontal',
      data: {}
    };
  },
  _createMenu: function _createMenu() {
    var data = this.props.data;
    var that = this;

    var menuEle = data.map(function (item, i) {
      return React.createElement(Item, {
        mode: that.props.mode,
        isNav: true,
        data: item,
        key: i });
    });
    return menuEle;
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'navigation horizontal clearfix' },
      this._createMenu()
    );
  }
});

module.exports = Navigation;