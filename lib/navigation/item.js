'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var classnames = require('classnames');

var Item = React.createClass({
  displayName: 'Item',

  propTypes: {
    mode: React.PropTypes.string,
    isNav: React.PropTypes.bool,
    data: React.PropTypes.object
  },
  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'vertical',
      isNav: false,
      data: {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      show: false
    };
  },
  _handleMouseOver: function _handleMouseOver() {
    this.setState({
      show: true
    });
  },
  _handleMouseOut: function _handleMouseOut() {
    this.setState({
      show: false
    });
  },
  _handleClick: function _handleClick() {},
  render: function render() {
    var itemClass = classnames({
      'navigation-nav': this.props.isNav,
      'navigation-item': !this.props.isNav
    });
    var wrapClass = classnames({
      'navigation-wrap': true,
      'nav': this.props.isNav,
      'show': this.state.show
    });
    return React.createElement(
      'div',
      { className: wrapClass, onMouseEnter: this._handleMouseOver, onMouseLeave: this._handleMouseOut },
      React.createElement(
        'div',
        { className: itemClass, onClick: this._handleClick },
        this.props.data.text
      ),
      this.props.data.value && this.props.data.value.length ? React.createElement(Group, {
        show: this.state.show,
        isNav: this.props.isNav,
        mode: this.props.mode,
        data: this.props.data.value }) : null
    );
  }
});

var Group = React.createClass({
  displayName: 'Group',

  propTypes: {
    mode: React.PropTypes.string,
    isNav: React.PropTypes.bool,
    data: React.PropTypes.array
  },
  getDefaultProps: function getDefaultProps() {
    return {
      mode: 'vertical',
      isNav: false,
      data: []
    };
  },
  getInitialState: function getInitialState() {
    return {};
  },
  _renderItems: function _renderItems() {
    var self = this;
    var group = this.props.data.map(function (item) {
      return React.createElement(Item, { mode: self.props.mode, isNav: false, data: item });
    });
    return group;
  },
  render: function render() {
    var groupClass = classnames({
      'navigation-group': true,
      'nav': this.props.isNav
    });
    return React.createElement(
      'div',
      { className: groupClass },
      this._renderItems()
    );
  }
});

module.exports = Item;