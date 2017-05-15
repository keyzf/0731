var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Column = React.createClass({
  propTypes: {
    sort: React.PropTypes.any // true或回调函数
  },
  getInitialState: function () {
    return {
      order: null
    }
  },
  _handleOrder: function () {
    if (!this.props.sort) return
    if (this.state.order === 'dropdown') {
      this.props.onSort(this.props.dataField, 'ASC')
      this.setState({
        order: 'dropup'
      }, function() {
        if (typeof this.props.sort === 'function') {
          this.props.sort(this.props.dataField, this.state.order);
        }
      })
    } else {
      this.props.onSort(this.props.dataField, 'DESC')
      this.setState({
        order: 'dropdown'
      }, function() {
        if (typeof this.props.sort === 'function') {
          this.props.sort(this.props.dataField, this.state.order);
        }
      })
    }
  },
  _renderIcon: function () {
    var icon = null
    if (!this.props.sort) return icon
    if (this.state.order === 'dropdown') {
      icon = (<div className='table-order'>
                <span className='caret dropdown'></span>
              </div>)
    } else if (this.state.order === 'dropup') {
      icon = (<div className='table-order'>
                <span className='caret dropup'></span>
              </div>)
    } else {
      icon = (<div className='table-order no-order'>
                <span className='caret dropdown'></span><span className='caret dropup'></span>
              </div>)
    }
    return icon
  },
  render: function () {
    var classes = null
    if (this.props.sort) {
      if (this.state.order == 'dropdown') {
        classes = 'sorting_desc'
      }else if (this.state.order === 'dropup') {
        classes = 'sorting_asc'
      }else {
        classes = 'sorting'
      }
    }

    return (
      <th onClick={this._handleOrder} className={classnames({}, this.props.className, classes)} style={assign({}, this.props.style)}>
        {this.props.children}
      </th>
    )
  }
})
module.exports = Column
