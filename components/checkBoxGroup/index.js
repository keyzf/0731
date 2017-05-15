var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Utils = require('../utils')

var CheckBox = require('../checkBox')

/**
 * 一组复选框
 */
var CheckBoxGroup = React.createClass({
  propTypes: {
    /**
     * 数据，例：[{name: string, value: any, checked: bool, disabled: bool}, ...]，其中name是显示文字，value是保存的值，checked是选中状态
     */
    data: React.PropTypes.array.isRequired,
    /**
     * 每个CheckBox之间的距离，例：5
     */
    labelMargin: React.PropTypes.number,
    /**
     * 设置CheckBox为固定宽度，例：200
     */
    labelWidth: React.PropTypes.number,
    /**
     * 是否每条单独一行，例：true
     */
    vertical: React.PropTypes.bool,
    /**
     * 组件包含的所有input的name值，而不是data中的name，默认值为随机字符串，一般不建议填写。
     */
    name: React.PropTypes.string,

    /**
     * 当数据变化时的回调，例：function(data) {}
     */
    onChange: React.PropTypes.func.isRequired,
  },
  getDefaultProps: function () {
    return {
      data: [],
      onChange: null,
      name: Utils.getRandomString(),
      labelMargin: 5,
      vertical: false
    }
  },
  getInitialState: function () {
    return {
      data: this.props.data
    }
  },
  _onChange: function () {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.data)
    }
  },
  _checkBoxCheck: function (value, checked) {
    for (var key in this.state.data) {
      var data = this.state.data[key]
      if (data.value === value) {
        data.checked = checked
      }
    }
    this._onChange()
    this.forceUpdate()
  },
  componentWillReceiveProps: function (nextProps) {
    if (!deepEqual(this.state.data, nextProps)) {
      this.props = nextProps
      this.state.data = this.props.data
    }
  },
  render: function () {
    var that = this

    var checkBoxGroup = this.state.data.map(function (data, i) {
      return (
        <CheckBox
          key={i}
          name={that.props.name}
          value={data.value}
          checked={data.checked}
          disabled={data.disabled}
          onChange={that._checkBoxCheck}
          style={{marginRight: that.props.labelMargin, width: that.props.labelWidth, display: that.props.vertical ? 'block' : 'inline-block'}}>
          {data.name}
        </CheckBox>
      )
    })

    return (
      <div className={classnames({'checkbox-group': true}, this.props.className)} style={assign({}, this.props.style)}>
        {checkBoxGroup}
      </div>
    )
  }
})

module.exports = CheckBoxGroup
