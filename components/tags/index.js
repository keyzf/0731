var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

/**
 * 标签
 */
var Tags = React.createClass({
  propTypes: {
    /**
     * 数据
     */
    data: React.PropTypes.array,
    /**
     * data中要使用的属性名
     */
    displayKey: React.PropTypes.string,

    /**
     * 变化回调
     */
    onChange: React.PropTypes.func,
    /**
     * 删除回调
     */
    onDelete: React.PropTypes.func,
  },
  getDefaultProps: function () {
    return {
      'data': [],
      'displayKey': 'name'
    }
  },
  getInitialState: function () {
    return {
      enableClick: this.props.onChange ? true : false,
      enableDelete: this.props.onDelete ? true : false
    }
  },
  _itemClick: function (index) {
    var onChange = this.props.onChange
    onChange && onChange(index)
  },
  _deleteClick: function (index, ev) {
    ev.stopPropagation()
    var onDelete = this.props.onDelete
    onDelete && onDelete(index)
  },
  render: function () {
    var displayKey = this.props.displayKey
    var self = this
    return (
      <ul className={classnames({}, this.props.className, `tags-group ${this.props.className || ''} ${this.state.enableClick ? '' : 'display'}`)} style={assign({}, this.props.style)}>
        {this.props.data.map(function (item, index) {
           return (
             <li key={index} title={item[displayKey]} onClick={self._itemClick.bind(self, index)}>
               <a href='javascript:void(0)'>
                 {item[displayKey]}
               </a>
               {self.state.enableDelete ?
                  <i title='删除' onClick={self._deleteClick.bind(self, index)}></i>
                  :
                  null}
             </li>
           )
         })}
      </ul>
    )
  }
})

module.exports = Tags
