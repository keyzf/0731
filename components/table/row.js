var React = require('react')
var ReactDom = require('react-dom')

var CheckBox = require('../checkBox')

var Row = React.createClass({
  propTypes: {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]), // 表格数据
    columns: React.PropTypes.array,
    selectRow: React.PropTypes.shape({
      enable: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      isSelected: React.PropTypes.bool
    }),
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },
  getInitialState: function () {
    return {
      checked: !!this.props.selectRow.isSelected
    }
  },
  _onSelect: function (value, checked) {
    this.props.selectRow.onSelect(this.props.id)
  },
_renderExpand: function (i) {
    var expand, icon = null;
    //this.props.data.unExpandAble:可以设置某行数据不显示expand
    if (typeof this.props.onExpand == 'function'&&this.props.isTree&&!this.props.data.unExpandAble) {//zee edit ,add this.props.data.isParent
      if (this.props.expanded) {
          icon = <i className='icon-minus-circle2' onClick={this.props.onExpand}/>;
      }else {
          icon = <i className='icon-plus-circle2'  onClick={this.props.onExpand}/>;
      }
      expand = <div className="table-expand " style={{marginLeft: this.props.level * 20}}>
                 {this.props.expandable ? icon : null}
               </div>;
    }
    return expand
  },
  _renderTableRow: function () {
    var self = this;
    var row = self.props.columns.map(function (column, i) {
      if (column.display !== false)
        return (
          <td key={i + 1} style={column.style}>
            {(i == 0 && self.props.isTree) ? self._renderExpand() : null}
            {self.props.data[column.field]}
          </td>
      )
    });
    if (self.props.selectRow.enable) {
      row.unshift(
        <td key={0}>
          <CheckBox checked={this.props.selectRow.isSelected} onChange={this._onSelect} />
        </td>
      )
    }
    if (self.props.action&&self.props.action.length) {
      var actions = null;
      if (self.props.action.length) {
        actions = self.props.action.map(function (item, i) {
          var callback = function () {
            if (typeof item.action === 'function')
              item.action(self.props.id, self.props.data)
          },actionClassName = 'action ';

          if(typeof item.setClass == 'function'){
            actionClassName += ' ' + item.setClass(self.props.data,item);
          }
          return (
            <a key={i} className={actionClassName} onClick={callback}>
              {item.content}
            </a>
          )
        });


      }
      row.push(
        <td className='tbody-action' key={self.props.columns.length + 1} >
          {actions}
        </td>
      )
    }
    return row
  },
  render: function () {
    return (
      this.props.visible ? <tr>
                           {this._renderTableRow()}
                         </tr> : null
    )
  }
})
module.exports = Row;
