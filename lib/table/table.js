'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Assign = require('object-assign');
var ClassNames = require('classnames');
var DeepEqual = require('deep-equal');

var TableHeader = require('./header');
var TableBody = require('./body');
var TableToolBar = require('./toolbar');
var TableStore = require('./store');
var Pagination = require('./pagination');

var Table = React.createClass({
  displayName: 'Table',

  propTypes: {
    data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]), // 表格数据
    pagination: React.PropTypes.oneOfType([React.PropTypes.bool, // 是否带分页
    React.PropTypes.object]),
    selectRow: React.PropTypes.shape({
      onSelect: React.PropTypes.func,
      onSelectAll: React.PropTypes.func
    }), // 选择某行
    headerRow: React.PropTypes.object,
    deleteRow: React.PropTypes.bool,
    scroll: React.PropTypes.object
  },
  getDefaultProps: function getDefaultProps() {
    return {
      data: null,
      pagination: false,
      selectRow: null,
      keyField: null,
      columns: [],
      deleteRow: false,
      scroll: {
        x: false,
        y: false
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      data: this.props.data,
      isTree: false,
      selected: [],
      expanded: []
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this._init(nextProps);
  },
  componentWillMount: function componentWillMount() {
    this.store = new TableStore();
    this._init(this.props);
  },
  componentWillUnmount: function componentWillUnmount() {},
  _init: function _init(props) {
    var self = this;
    var Store = {
      pagination: {}
    };
    Store.columns = [];

    if (props.pagination && typeof props.pagination.offset != 'undefined') {
      Store.pagination = props.pagination;
    }

    var children = React.Children.toArray(props.children);
    children.forEach(function (column) {
      if (column && column.props) {
        if (column.props.isKey) {
          Store.keyField = column.props.dataField;
        }
        var style = column.props.style;
        style && typeof style.align == 'undefined' ? style.align = 'left' : null;

        Store.columns.push({
          name: column.props.name,
          field: column.props.dataField,
          style: style,
          display: typeof column.props.display !== 'undefined' ? column.props.display : true
        });
      }
    });
    if ((!Store.keyField || Store.keyField == '_index_') && props.data) {
      Store.data = this._setIndex(props.data, 0);
      Store.keyField = '_index_';
    } else {
      Store.data = props.data ? props.data : [];
    }
    if (props.freshCleanSelected) {
      this.state.selected = [];
    }
    this.store.setProps(Store);
  },
  _setIndex: function _setIndex(data, level, parentIndex) {
    var self = this;
    var items = data.map(function (item, i) {
      item['_index_'] = (!!parentIndex ? parentIndex + '-' : '') + level + '-' + i;
      if (item['isExpanded'] && self.state.expanded.indexOf(item['_index_']) === -1) {
        self.state.expanded.push(item['_index_']);
      }
      if (item.children && item.children.length) {
        //zee edit
        item.children = self._setIndex(item.children, level + 1, item['_index_']);
        self.setState({
          isTree: true
        });
        item.isParent = true;
      }
      return item;
    });
    return items;
  },
  _isSelectAll: function _isSelectAll() {
    var self = this;
    if (this.state.selected === 0) return false;
    var match = 0;
    var data = this.store.get();
    if (!data.length) return false;
    data.forEach(function (item) {
      if (self.state.selected.indexOf(item[self.store.keyField]) !== -1) match++;
    });
    if (match === data.length) return true;
    return false;
  },
  _handleSelectAll: function _handleSelectAll(status) {
    var self = this;
    var selected = [];
    if (status) {
      var data = this.store.get();
      selected = data.map(function (item) {
        return item[self.store.keyField];
      });
    }
    if (this.props.selectRow.onSelected) this.props.selectRow.onSelected(selected);
    this.setState({
      selected: selected
    });
  },
  _handleSelect: function _handleSelect(row) {
    var self = this;
    var index = this.state.selected.indexOf(row);
    if (index != -1) {
      this.state.selected.splice(index, 1);
      if (this.props.selectRow.onSelect) this.props.selectRow.onSelect(row, false);
      if (this.props.selectRow.onSelected) this.props.selectRow.onSelected(this.state.selected);
    } else {
      this.state.selected.push(row);
      if (this.props.selectRow.onSelect) this.props.selectRow.onSelect(row, true);
      if (this.props.selectRow.onSelected) this.props.selectRow.onSelected(this.state.selected);
    }
    this.setState({
      selected: this.state.selected
    });
  },
  _handleExpand: function _handleExpand(row) {
    var self = this;
    var index = this.state.expanded.indexOf(row);
    if (index != -1) {
      this.state.expanded.splice(index, 1);
      // if (this.props.selectRow.onSelect) this.props.selectRow.onSelect(row, false)
      // if (this.props.selectRow.onSelected) this.props.selectRow.onSelected(this.state.selected)
    } else {
      this.state.expanded.push(row);
      // if (this.props.selectRow.onSelect) this.props.selectRow.onSelect(row, true)
      // if (this.props.selectRow.onSelected) this.props.selectRow.onSelected(this.state.selected)
    }
    this.setState({
      expanded: this.state.expanded
    });
  },
  _handleSort: function _handleSort(field, order) {
    this.store.sort(field, order);
    this.forceUpdate();
  },
  _handlePaginationChange: function _handlePaginationChange(offset) {
    this.store.pagination.offset = offset;
    if (this.props.pagination.onPageChange) {
      this.props.pagination.onPageChange(this.store.pagination.limit, this.store.pagination.offset);
    } else {
      this.forceUpdate();
    }
  },
  _handlePaginationLimitChange: function _handlePaginationLimitChange(limit) {
    this.store.pagination = {
      offset: 0,
      limit: limit
    };
    if (this.props.pagination.onPageLimitChange) {
      this.props.pagination.onPageLimitChange(this.store.pagination.limit, 0);
    }
    this.forceUpdate();
  },
  _renderHeaderRow: function _renderHeaderRow() {
    return this.props.headerRow ? this.props.headerRow : null;
  },
  _renderPagination: function _renderPagination() {
    if (!this.props.pagination || !this.store.data.length) {
      return null;
    }
    return React.createElement(Pagination, {
      total: this.store.pagination.total,
      offset: this.store.pagination.offset,
      limit: this.store.pagination.limit,
      onPageChange: this._handlePaginationChange,
      onPageLimitChange: this._handlePaginationLimitChange });
  },
  _renderTableColGroup: function _renderTableColGroup() {
    var col = this.store.columns.map(function (column, i) {
      var style = null;
      if (column.width) style = {
        width: column.width
      };
      if (column.display) return React.createElement('col', { key: i + 1, style: style });
    });
    if (this.props.selectRow) {
      col.unshift(React.createElement('col', { key: 0, style: { width: 40 } }));
    }
    if (this.props.action && this.props.action.length) {
      col.push(React.createElement('col', { key: this.store.columns.length + 1 }));
    }
    return React.createElement(
      'colgroup',
      null,
      col
    );
  },
  _renderTableHeader: function _renderTableHeader() {
    var isSelectAll = this._isSelectAll();
    return React.createElement(
      TableHeader,
      {
        selectRow: { enable: this.props.selectRow ? true : false, onSelectAll: this._handleSelectAll, isSelectAll: isSelectAll },
        onSort: this._handleSort,
        action: this.props.action,
        actionStyle: this.props.actionStyle,
        style: this.props.thStyle },
      this.props.children
    );
  },
  _renderTableBody: function _renderTableBody() {
    var selectRow = {
      enable: this.props.selectRow ? true : false,
      onSelect: this._handleSelect,
      selected: this.state.selected
    },
        expandRow = {
      onExpand: this._handleExpand,
      expanded: this.state.expanded
    };
    return React.createElement(TableBody, {
      columns: this.store.columns,
      data: this.store.get(),
      onRowClick: this._handleRowClick,
      keyField: this.store.keyField,
      selectRow: selectRow,
      expandRow: expandRow,
      isTree: this.state.isTree,
      action: this.props.action,
      empty: this.props.empty });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: ClassNames({ 'table-wrapper': true }, this.props.className), style: Assign({}, this.props.style) },
      this._renderHeaderRow(),
      React.createElement(
        'div',
        { className: ClassNames({ 'table-body': this.props.bordered ? true : false, 'table-scroll-x': this.props.scroll.x ? true : false, 'overPanel': true }) },
        React.createElement(
          'table',
          { className: 'table', style: this.props.scroll.x ? { width: this.props.scroll.x } : null },
          this._renderTableColGroup(),
          this._renderTableHeader(),
          this._renderTableBody()
        )
      ),
      React.createElement(
        'div',
        { className: 'table-footer' },
        this._renderPagination()
      )
    );
  }
});
module.exports = Table;