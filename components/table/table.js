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
  propTypes: {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]), // 表格数据
    pagination: React.PropTypes.oneOfType([
      React.PropTypes.bool, // 是否带分页
      React.PropTypes.object
    ]),
    selectRow: React.PropTypes.shape({
      onSelect: React.PropTypes.func,
      onSelectAll: React.PropTypes.func
    }), // 选择某行
    headerRow: React.PropTypes.object,
    deleteRow: React.PropTypes.bool,
    scroll: React.PropTypes.object
  },
  getDefaultProps: function () {
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
    }
  },
  getInitialState: function () {
    return {
      data: this.props.data,
      isTree: false,
      selected: [],
      expanded: []
    }
  },
  componentWillReceiveProps: function (nextProps) {
    this._init(nextProps)
  },
  componentWillMount: function () {
    this.store = new TableStore();
    this._init(this.props);
  },
  componentWillUnmount: function () {

  },
  _init: function (props) {
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
          Store.keyField = column.props.dataField
        }
        var style = column.props.style;
        style && typeof style.align == 'undefined' ? style.align = 'left' : null;

        Store.columns.push({
          name: column.props.name,
          field: column.props.dataField,
          style: style,
          display: typeof column.props.display !== 'undefined' ? column.props.display : true,
          fixed: !!column.props.fixed
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
      this.state.selected = []
    }
    this.store.setProps(Store)
  },
  _setIndex: function (data, level, parentIndex) {
    var self = this;
    var items = data.map(function (item, i) {
      item['_index_'] = (!!parentIndex ? (parentIndex + '-') : '') + level + '-' + i;
      if (item['isExpanded'] && self.state.expanded.indexOf(item['_index_']) === -1) {
        self.state.expanded.push(item['_index_']);
      }
      if (item.children && item.children.length) {//zee edit
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
  _isSelectAll: function () {
    var self = this;
    if (this.state.selected === 0) return false;
    var match = 0;
    var data = this.store.get();
    if (!data.length) return false;
    data.forEach(function (item) {
      if (self.state.selected.indexOf(item[self.store.keyField]) !== -1) match++;
    });
    if (match === data.length) return true;
    return false
  },
  _handleSelectAll: function (status) {
    var self = this;
    var selected = [];
    if (status) {
      var data = this.store.get();
      selected = data.map(function (item) {
        return item[self.store.keyField];
      })
    }
    if (this.props.selectRow.onSelected) this.props.selectRow.onSelected(selected);
    this.setState({
      selected: selected
    });
  },
  _handleSelect: function (row) {
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
  _handleExpand: function (row) {
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
  _handleSort: function (field, order) {
    this.store.sort(field, order);
    this.forceUpdate();
  },
  _handlePaginationChange: function (offset) {
    this.store.pagination.offset = offset;
    if (this.props.pagination.onPageChange) {
      this.props.pagination.onPageChange(this.store.pagination.limit, this.store.pagination.offset);
    } else {
      this.forceUpdate();
    }
  },
  _handlePaginationLimitChange: function (limit) {
    this.store.pagination = {
      offset: 0,
      limit: limit
    };
    if (this.props.pagination.onPageLimitChange) {
      this.props.pagination.onPageLimitChange(this.store.pagination.limit, 0);
    }
    this.forceUpdate();
  },
  _renderHeaderRow: function () {
    return this.props.headerRow ? this.props.headerRow : null
  },
  _renderPagination: function () {
    if (!this.props.pagination || !this.store.data.length) {
      return null
    }
    return (
      <Pagination
        total={this.store.pagination.total}
        offset={this.store.pagination.offset}
        limit={this.store.pagination.limit}
        onPageChange={this._handlePaginationChange}
        onPageLimitChange={this._handlePaginationLimitChange}>
      </Pagination>
    )
  },
  _renderTableColGroup: function () {
    var col = this.store.columns.map(function (column, i) {
      var style = null;
      if (column.width) style = {
        width: column.width
      };
      if (column.display)
        return (<col key={i + 1} style={style} />);
    });
    if (this.props.selectRow) {
      col.unshift((<col key={0} style={{ width: 40 }}></col>))
    }
    if (this.props.action && this.props.action.length) {
      col.push((<col key={this.store.columns.length + 1}></col>))
    }
    return (<colgroup>
      {col}
    </colgroup>)
  },
  _renderTableHeader: function () {
    var isSelectAll = this._isSelectAll();
    return (<TableHeader
      selectRow={{ enable: this.props.selectRow ? true : false, onSelectAll: this._handleSelectAll, isSelectAll: isSelectAll }}
      onSort={this._handleSort}
      action={this.props.action}
      actionStyle={this.props.actionStyle}
      style={this.props.thStyle}>
      {this.props.children}
    </TableHeader>)
  },

  _renderFixedTableHeader: function (rightFlag) {
    var rightFlag = !!rightFlag;
    var children = React.Children.toArray(this.props.children);
    var isSelectAll = this._isSelectAll();

    var columns = [];
    var action;

    if (rightFlag) {
      // 尾列
      action = this.props.action;

      for (var index = children.length - 1; index > -1; index--) {
        var element = children[index];
        if (element.props.display === false) {
          continue;
        }
        if (element.props.fixed) {
          columns.unshift(element);
        } else {
          break;
        }
      }
    } else {
      // 首列
      for (var index = 0; index < children.length; index++) {
        var element = children[index];
        if (element.props.display === false) {
          continue;
        }

        if (element.props.fixed) {
          columns.push(element);
        } else {
          break;
        }
      }
    }

    return (
      <TableHeader
        selectRow={{ enable: (this.props.selectRow && !rightFlag) ? true : false, onSelectAll: this._handleSelectAll, isSelectAll: isSelectAll }}
        onSort={this._handleSort}
        action={action}
        actionStyle={this.props.actionStyle}
        style={this.props.thStyle}>
        {columns}
      </TableHeader>
    )
  },

  _renderTableBody: function () {
    var selectRow = {
      enable: this.props.selectRow ? true : false,
      onSelect: this._handleSelect,
      selected: this.state.selected
    }, expandRow = {
      onExpand: this._handleExpand,
      expanded: this.state.expanded
    };
    return (
      <TableBody
        columns={this.store.columns}
        data={this.store.get()}
        onRowClick={this._handleRowClick}
        keyField={this.store.keyField}
        selectRow={selectRow}
        expandRow={expandRow}
        isTree={this.state.isTree}
        action={this.props.action}
        empty={this.props.empty} />
    )
  },

  _renderFixedTableBody: function (rightFlag) {
    var selectRow = {
      enable: (this.props.selectRow && !rightFlag) ? true : false,
      onSelect: this._handleSelect,
      selected: this.state.selected
    }, expandRow = {
      onExpand: this._handleExpand,
      expanded: this.state.expanded
    };

    var children = this.store.columns;
    var columns = [];
    var isTree = false;
    var action;
    if (rightFlag) {
      // 尾列
      action = this.props.action;

      for (var index = children.length - 1; index > -1; index--) {
        var element = children[index];
        if (!element.display) {
          continue;
        }
        if (element.fixed) {
          columns.unshift(element);
        } else {
          break;
        }
      }
    } else {
      // 首列
      isTree = this.state.isTree;

      for (var index = 0; index < children.length; index++) {
        var element = children[index];
        if (!element.display) {
          continue;
        }
        if (element.fixed) {
          columns.push(element);
        } else {
          break;
        }
      }
    }

    return (
      <TableBody
        columns={columns}
        data={this.store.get()}
        onRowClick={this._handleRowClick}
        keyField={this.store.keyField}
        selectRow={selectRow}
        expandRow={expandRow}
        isTree={isTree}
        action={action}
        empty={this.props.empty} />
    )
  },

  render: function () {
    var renderLeftFixed = false;
    var renderRightFixed = false;
    var columns = this.store.columns.filter(function (column) {
      return column.display === true;
    });

    if (columns.length > 1) {
      if (columns[0].fixed) {
        renderLeftFixed = true;
      }
      if (columns[columns.length - 1].fixed) {
        renderRightFixed = true;
      }
    }

    return (
      <div className={ClassNames({ 'table-wrapper': true }, this.props.className)} style={Assign({}, this.props.style)}>
        {this._renderHeaderRow()}
        <div className="table-fixed-wrapper">
          <div className={ClassNames({ 'table-body': this.props.bordered ? true : false, 'table-scroll-x': this.props.scroll.x ? true : false, 'overPanel': true })}>
            <table className='table' style={this.props.scroll.x ? { width: this.props.scroll.x } : null}>
              {this._renderTableColGroup()}
              {this._renderTableHeader()}
              {this._renderTableBody()}
            </table>
          </div>
          {
            renderLeftFixed &&
            <div className="table-body table-fixed table-fixed-left">
              <table className="table">
                {this._renderFixedTableHeader(false)}
                {this._renderFixedTableBody(false)}
              </table>
            </div>
          }
          {
            renderRightFixed &&
            <div className="table-body table-fixed table-fixed-right">
              <table className="table">
                {this._renderFixedTableHeader(true)}
                {this._renderFixedTableBody(true)}
              </table>
            </div>
          }
        </div>
        <div className='table-footer'>
          {this._renderPagination()}
        </div>
      </div>)
  }
});
module.exports = Table;
