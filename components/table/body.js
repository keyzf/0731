var React = require('react');
var ReactDom = require('react-dom');

var CheckBox = require('../checkBox');
var TableRow = require('./row');
var Utils = require('../utils');
// var Store = require('./store')
var Guid = require('./guid')

var Body = React.createClass({
  propTypes: {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]), // 表格数据
    columns: React.PropTypes.array,
    keyField: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]), // 表格数据,
    selectRow: React.PropTypes.shape({
      enable: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      selected: React.PropTypes.array
    }),
    expandRow: React.PropTypes.shape({
      onExpand: React.PropTypes.func,
      expanded: React.PropTypes.array
    }),
    action: React.PropTypes.array,
    empty: React.PropTypes.any
  },
  getInitialState: function () {
    return {
      lineNum: 0
    }
  },
  _isSelected: function (value) {
    return this.props.selectRow.selected.indexOf(value) !== -1
  },
 _isExpanded: function (value) {
    return this.props.expandRow.expanded.indexOf(value) !== -1
  },
  _onExpanded: function (value) {
    this.props.expandRow.onExpand(value)
  },
  /*_onSelect: function(row) {
    this.props.selectRow.onSelect(row)
  },*/
  _renderTableBody: function () {
    var self = this;
    if (!this.props.data.length) {
      var length = 0;
      self.props.columns.map(function (column, i) {
        if (column.display !== false){
          length++
        }

      });
      if (this.props.selectRow && this.props.selectRow.enable) {
        length++
      }
      if (this.props.action instanceof Array && this.props.action.length > 0) {
        length++
      }
      return (
        <tr>
          <td colSpan={length} style={{textAlign: 'center'}}>
            {this.props.empty ? this.props.empty : '暂无数据'}
          </td>
        </tr>
      )
    } else {
      // return this.props.data.map(function (item, i) {
      //   var isSelected = self._isSelected(item[self.props.keyField])
      //   return (
      //     <TableRow
      //       selectRow={{enable: self.props.selectRow.enable, onSelect: self.props.selectRow.onSelect, isSelected: isSelected}}
      //       columns={self.props.columns}
      //       data={item}
      //       id={item[self.props.keyField]}
      //       action={self.props.action}
      //       key={i} />
      //   )
      // })
      this.state.lineNum = 0;
      return this._renderRows(this.props.data)
    }
  },
  _renderRows: function (data, level, visible) {
    var self = this;
    var result = [];
    level = level || 0;
    if (level == 0) visible = true;
    data.forEach(function (item, i) {
      var isSelected = self._isSelected(item[self.props.keyField]);
      var isRowExpanded = self._isExpanded(item[self.props.keyField]);
      var onExpanded = function () {
        self._onExpanded(item[self.props.keyField]);
      };
      //var guid = Guid.NewGuid().ToString();
      var key = self.state.lineNum;
      self.state.lineNum += 1;
      result.push(<TableRow
                    selectRow={{enable: self.props.selectRow.enable, onSelect: self.props.selectRow.onSelect, isSelected: isSelected}}
                    columns={self.props.columns}
                    data={item}
                    id={item[self.props.keyField]}
                    action={self.props.action}
                    //key={level + '' + i}
                    //key={guid}
                    key={key}
                    level={level}
                    visible={visible}
                    isTree={self.props.isTree}
                    expandable={item.children&&item.children.length  ? true : false}
                    onExpand={onExpanded}
                    expanded={isRowExpanded} />);
      if (item.children) {
        var subVisible = visible && isRowExpanded;
        result = result.concat(self._renderRows(item.children, level + 1, subVisible));
      }
    });
    return result
  },
  render: function () {
    var rows = this._renderTableBody();
    return (
      <tbody>
        {this._renderTableBody()}
      </tbody>
    );
  }
});
module.exports = Body;
