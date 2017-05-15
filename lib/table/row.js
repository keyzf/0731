'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var CheckBox = require('../checkBox');

var Row = React.createClass({
  displayName: 'Row',

  propTypes: {
    data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]), // 表格数据
    columns: React.PropTypes.array,
    selectRow: React.PropTypes.shape({
      enable: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      isSelected: React.PropTypes.bool
    }),
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
  },
  getInitialState: function getInitialState() {
    return {
      checked: !!this.props.selectRow.isSelected
    };
  },
  _onSelect: function _onSelect(value, checked) {
    this.props.selectRow.onSelect(this.props.id);
  },
  _renderExpand: function _renderExpand(i) {
    var expand,
        icon = null;
    if (typeof this.props.onExpand == 'function') {
      if (this.props.expanded) {
        icon = React.createElement('i', { className: 'icon-minus-circle2', onClick: this.props.onExpand });
      } else {
        icon = React.createElement('i', { className: 'icon-plus-circle2', onClick: this.props.onExpand });
      }
      expand = React.createElement(
        'div',
        { className: 'table-expand', style: { marginLeft: this.props.level * 20 } },
        this.props.expandable ? icon : null
      );
    }
    return expand;
  },
  _renderTableRow: function _renderTableRow() {
    var self = this;
    var row = self.props.columns.map(function (column, i) {
      if (column.display !== false) return React.createElement(
        'td',
        { key: i + 1, style: column.style },
        i == 1 ? self._renderExpand() : null,
        self.props.data[column.field]
      );
    });
    if (self.props.selectRow.enable) {
      row.unshift(React.createElement(
        'td',
        { key: 0 },
        React.createElement(CheckBox, { checked: this.props.selectRow.isSelected, onChange: this._onSelect })
      ));
    }
    if (self.props.action) {
      var actions = null;
      if (self.props.action.length) {
        actions = self.props.action.map(function (item, i) {
          var callback = function callback() {
            if (typeof item.action === 'function') item.action(self.props.id, self.props.data);
          };
          return React.createElement(
            'a',
            { key: i, className: 'action', onClick: callback },
            item.content
          );
        });
      }
      row.push(React.createElement(
        'td',
        { key: self.props.columns.length + 1, style: { textAlign: 'center' } },
        actions
      ));
    }
    return row;
  },
  render: function render() {
    return this.props.visible ? React.createElement(
      'tr',
      null,
      this._renderTableRow()
    ) : null;
  }
});
module.exports = Row;