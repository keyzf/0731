'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Assign = require('object-assign');
var ClassNames = require('classnames');
var DeepEqual = require('deep-equal');

var Column = React.createClass({
  displayName: 'Column',

  propTypes: {
    sort: React.PropTypes.any // true或回调函数
  },
  getInitialState: function getInitialState() {
    return {
      order: null
    };
  },
  _handleOrder: function _handleOrder() {
    if (!this.props.sort) return;
    if (this.state.order === 'dropdown') {
      this.props.onSort(this.props.dataField, 'ASC');
      this.setState({
        order: 'dropup'
      }, function () {
        if (typeof this.props.sort === 'function') {
          this.props.sort(this.props.dataField, this.state.order);
        }
      });
    } else {
      this.props.onSort(this.props.dataField, 'DESC');
      this.setState({
        order: 'dropdown'
      }, function () {
        if (typeof this.props.sort === 'function') {
          this.props.sort(this.props.dataField, this.state.order);
        }
      });
    }
  },
  _renderIcon: function _renderIcon() {
    var icon = null;
    if (!this.props.sort) return icon;
    if (this.state.order === 'dropdown') {
      icon = React.createElement(
        'div',
        { className: 'table-order' },
        React.createElement('span', { className: 'caret dropdown' })
      );
    } else if (this.state.order === 'dropup') {
      icon = React.createElement(
        'div',
        { className: 'table-order' },
        React.createElement('span', { className: 'caret dropup' })
      );
    } else {
      icon = React.createElement(
        'div',
        { className: 'table-order no-order' },
        React.createElement('span', { className: 'caret dropdown' }),
        React.createElement('span', { className: 'caret dropup' })
      );
    }
    return icon;
  },
  componentWillMount: function componentWillMount() {},
  render: function render() {
    var classes = null;
    if (this.props.sort) {
      if (this.state.order == 'dropdown') {
        classes = 'sorting_desc';
      } else if (this.state.order === 'dropup') {
        classes = 'sorting_asc';
      } else {
        classes = 'sorting';
      }
    }
    return React.createElement(
      'th',
      { onClick: this._handleOrder, className: ClassNames({}, this.props.className, classes), style: Assign({}, this.props.style) },
      this.props.children
    );
  }
});
module.exports = Column;