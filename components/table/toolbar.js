var React = require('react')
var ReactDom = require('react-dom')
var classnames = require('classnames')

var Toolbar = React.createClass({
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

  _renderSearch: function () {
    var self = this
  },
  _renderButtons: function () {
    var self = this
    var buttons = this.props.buttons.map(function (item, i) {
      var classes = classnames({
        main: item.type == 'add' ? true : false
      })
      return <button className={classes} onClick={item.onClick}>
               {item.text}
             </button>
    })
  },
  render: function () {
    return (
      <div className='datatable-header'>
        <div className='dataTables_filter'>
          <label>
            <span>Filter:</span>
            <input type='search' placeholder='Type to filter...' />
          </label>
        </div>
      </div>
    )
  }
})
module.exports = Toolbar
