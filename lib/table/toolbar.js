'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var classnames = require('classnames');

var Toolbar = React.createClass({
  displayName: 'Toolbar',

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

  _renderSearch: function _renderSearch() {
    var self = this;
  },
  _renderButtons: function _renderButtons() {
    var self = this;
    var buttons = this.props.buttons.map(function (item, i) {
      var classes = classnames({
        main: item.type == 'add' ? true : false
      });
      return React.createElement(
        'button',
        { className: classes, onClick: item.onClick },
        item.text
      );
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'datatable-header' },
      React.createElement(
        'div',
        { className: 'dataTables_filter' },
        React.createElement(
          'label',
          null,
          React.createElement(
            'span',
            null,
            'Filter:'
          ),
          React.createElement('input', { type: 'search', placeholder: 'Type to filter...' })
        )
      )
    );
  }
});
module.exports = Toolbar;