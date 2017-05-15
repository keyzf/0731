var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Utils = require('../utils')

var CheckBox = require('../checkBox')

/**
 * 树形选择器
 */
var TreeSelect = React.createClass({
  propTypes: {
    /**
     * 树的相关数据
     */
    data: React.PropTypes.array,
    /**
     * 是否显示选择框
     */
    showCheckBox: React.PropTypes.bool,
    /**
     * 每层缩进宽度
     */
    marginLeft: React.PropTypes.number,

    /**
     * 被选中回调函数
     */
    onChange: React.PropTypes.func,
  },
  getDefaultProps: function () {
    return {
      data: [],
      marginLeft: 12,
      onChange: function () {},
      showCheckBox: true
    }
  },
  getInitialState: function () {
    return {
      data: this.props.data
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.data != this.props.data) {
      this.state.data = nextProps.data

      this.props = nextProps
    }
  },
  _getSelected: function (data) {
    var selected = []
    for (var key in data) {
      if (data[key].children) {
        selected = selected.concat(this._getSelected(data[key].children))
      } else if (data[key].checked) {
        selected.push(data[key].value)
      }
    }
    return selected
  },
  _changeParentState: function () {
    this.state.data.map(function (item) {
      if (item.children) {
        var selected = 0
        var unselected = 0
        item.children.map(function (sub_item) {
          if (sub_item.className == 'middle-status') {
            selected++
            unselected++
          } else {
            sub_item.checked ? selected++ : unselected++
          }
        })

        item.checked = unselected > 0 ? false : true
        item.className = (selected > 0 && unselected > 0) ? 'middle-status' : ''
      }
    })
    this.forceUpdate()
  },
  _onSelectChange: function () {
    var data = this.state.data
    var selected = this._getSelected(data)
    this.props.onChange(selected)
  },
  _onChildrenChange: function () {
    this._changeParentState()
    this._onSelectChange()
  },
  _toggleChildren: function (item) {
    var show = item.expand || false
    item.expand = !show
    this.forceUpdate()
  },
  _itemOnChange: function (item) {
    if (item.children instanceof Array && item.children.length > 0) {
      this._checkAllChildren(item, !item.checked)
    }
    item.className = ''
    item.checked = !item.checked
    this.forceUpdate()

    this._onSelectChange()
  },
  _checkAllChildren: function (item, checked) {
    var that = this
    item.children.map(function (item) {
      if (item.children instanceof Array && item.children.length > 0) {
        that._checkAllChildren(item, checked)
      }
      item.checked = checked
      item.className = ''
    })
  },
  _createTree: function (data) {
    var t = []
    var that = this
    if (!(data instanceof Array)) {
      return null
    }
    data.map(function (item) {
      var key = Utils.getRandomString()

      var _toggleChildren = function (event) {
        event.stopPropagation()
        that._toggleChildren(item)
      }
      var _itemOnChange = function () {
        that._itemOnChange(item)
      }
      t.push((
        <div key={'i' + key} style={{marginLeft: that.props.marginLeft}}>
          <div style={{top: item.checked ? 1 : 2}}>
            {item.children ? <i onClick={_toggleChildren} className={item.expand ? 'text-info expand  icon-minus2' : 'text-info expand  icon-plus2'} style={{fontSize: '14px'}}></i> : <i className='expand'></i>}
            {that.props.showCheckBox ?
               <CheckBox
                 key={'cb' + key}
                 value={item.value}
                 checked={item.checked}
                 className={item.className}
                 style={{display: 'inline-block', marginLeft: 2}}
                 onChange={_itemOnChange}>
                 {item.name}
               </CheckBox>
               :
               <div style={{display: 'inline-block'}}>
                 {item.children ? <i className={item.expand ? 'icon-folder-open' : 'icon-folder2'} style={{marginLeft: 2, marginRight: 1}}></i> : <div style={{display: 'inline-block', width: 18}}></div>}
                 {item.name}
               </div>}
          </div>
          {item.children ?
            <TreeSelect
              onChange={that._onChildrenChange}
              data={item.children}
              marginLeft={that.props.marginLeft}
              style={{display: item.expand ? 'block' : 'none'}}
              showCheckBox={that.props.showCheckBox} />
          :
            null}
        </div>
        ))
    })
    return t
  },
  render: function () {
    var tree = this._createTree(this.state.data)
    return (
      <div className={classnames({'tree-select': true}, this.props.className)} style={assign({}, this.props.style)}>
        {tree}
      </div>
    )
  }
})

module.exports = TreeSelect
