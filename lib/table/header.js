'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Assign = require('object-assign');

var CheckBox = require('../checkBox');
// var Store = require('./store')

var Header = React.createClass({
  displayName: 'Header',

  propTypes: {
    selectRow: React.PropTypes.shape({
      enable: React.PropTypes.bool,
      onSelectAll: React.PropTypes.func,
      isSelectAll: React.PropTypes.bool
    }),
    action: React.PropTypes.array,
    onSort: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      style: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      checked: false
    };
  },
  _onSelectAll: function _onSelectAll(value, checked) {
    /*var self = this
    this.setState({
      checked: checked
    }, function() {
      self.props.selectRow.onSelectAll(checked)
    })*/
    this.props.selectRow.onSelectAll(checked);
  },
  _renderTableHeader: function _renderTableHeader() {
    var self = this;
    var row = null,
        select = null,
        action = null;
    if (self.props.selectRow.enable) {
      select = React.createElement(
        'th',
        { style: this.props.style },
        React.createElement(CheckBox, { checked: this.props.selectRow.isSelectAll, onChange: this._onSelectAll })
      );
    }
    if (self.props.action && self.props.action.length) {
      action = React.createElement(
        'th',
        { className: 'thead-action', style: Assign({}, this.props.style, this.props.actionStyle) },
        '\u64CD\u4F5C'
      );
    }
    row = React.Children.toArray(this.props.children).map(function (child, i) {
      if (child && child.props && child.props.display !== false) {
        return React.cloneElement(child, {
          selectRow: self.props.selectRow,
          onSort: self.props.onSort,
          key: i,
          align: child.props.align,
          bold: child.props.bold,
          style: Assign({}, child.props.style, self.props.style)
        });
      }
    });

    return React.createElement(
      'tr',
      null,
      select,
      row,
      action
    );
  },
  render: function render() {
    var header = this._renderTableHeader();
    return React.createElement(
      'thead',
      null,
      header
    );
  }
});
module.exports = Header;