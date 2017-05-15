var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')

var CheckBox = require('../checkBox')
// var Store = require('./store')

var Header = React.createClass({
  propTypes: {
    selectRow: React.PropTypes.shape({
      enable: React.PropTypes.bool,
      onSelectAll: React.PropTypes.func,
      isSelectAll: React.PropTypes.bool
    }),
    action: React.PropTypes.array,
    onSort: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      checked: false
    }
  },
  _onSelectAll: function (value, checked) {
    /*var self = this
    this.setState({
      checked: checked
    }, function() {
      self.props.selectRow.onSelectAll(checked)
    })*/
    this.props.selectRow.onSelectAll(checked)
  },
  _renderTableHeader: function () {
    var self = this
    var row = null,
      select = null,
      action = null
    if (self.props.selectRow.enable) {
      select = (
        <th style={this.props.style}>
          <CheckBox checked={this.props.selectRow.isSelectAll} onChange={this._onSelectAll} />
        </th>
      )
    }
    if (self.props.action) {
      action = (
        <th style={assign({textAlign: 'center'}, this.props.style)}>
          操作
        </th>
      )
    }
    row = this.props.children.map(function (child, i) {
      if (child && child.props && child.props.display !== false)
        return React.cloneElement(child, {
          selectRow: self.props.selectRow,
          onSort: self.props.onSort,
          key: i,
          align: child.props.align,
          bold: child.props.bold,
          style: self.props.style
        })
    })

    return (
      <tr>
        {select}
        {row}
        {action}
      </tr>
    )
  },
  render: function () {
    var header = this._renderTableHeader()
    return (
      <thead>
        {header}
      </thead>
    )
  }
})
module.exports = Header
