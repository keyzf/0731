'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Utils = require('../utils');

var Radio = require('../radio');

/**
 * 一组单选框
 */
var RadioGroup = React.createClass({
  displayName: 'RadioGroup',

  propTypes: {
    /**
     * 数据，例：[{name: string, value: any, checked: bool, disabled: bool}, ...]，其中name是显示文字，value是保存的值，checked是选中状态，同时有且只有一项的checked值为true
     */
    data: React.PropTypes.array.isRequired,
    /**
     * 当value有值时，data中value相同的项checked值自动为true，其它项自动为false，例：1
     */
    value: React.PropTypes.any,
    /**
     * 每个Radio之间的距离，例：5
     */
    labelMargin: React.PropTypes.number,
    /**
     * 设置Radio为固定宽度，例：200
     */
    labelWidth: React.PropTypes.number,
    /**
     * 是否每条单独一行，例：true
     */
    vertical: React.PropTypes.bool,
    /**
     * 组件包含的所有input的name值，而不是data中的name。默认值为随机字符串
     */
    name: React.PropTypes.string,

    /**
     * 当数据变化时的回调，例：function(data) {}
     */
    onChange: React.PropTypes.func.isRequired
  },
  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      onChange: null,
      value: null,
      name: Utils.getRandomString(),
      labelMargin: 5,
      vertical: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      currentValue: this.props.value || this.props.defaultValue
    };
  },
  componentWillMount: function componentWillMount() {
    this._setValue();
  },
  componentWillUnmount: function componentWillUnmount() {},
  _setValue: function _setValue() {
    if (!this.state.currentValue) {
      for (var key in this.props.data) {
        var data = this.props.data[key];
        if (data.checked) {
          this.state.currentValue = data.value;
        }
      }
    }
    if (!this.state.currentValue && this.props.data && this.props.data.length > 0) {
      this.state.currentValue = this.props.data[0].value;
    }
  },
  _onChange: function _onChange() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.data, this.state.currentValue);
    }
  },
  _radioChange: function _radioChange(value, checked) {
    for (var key in this.props.data) {
      var data = this.props.data[key];
      if (data.value === value) {
        this.state.currentValue = data.value;
        data.checked = true;
      } else {
        data.checked = false;
      }
    }
    this._onChange();
    this.forceUpdate();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.props = nextProps;

      // 重新使用value值
      this.state.currentValue = this.props.value;
      this._setValue();
    }
  },
  render: function render() {
    var that = this;

    var radioGroup = this.props.data.map(function (data, i) {
      return React.createElement(
        Radio,
        {
          key: i,
          name: that.props.name,
          value: data.value,
          checked: that.state.currentValue === data.value,
          disabled: data.disabled,
          onChange: that._radioChange,
          vertical: that.props.vertical,
          style: { marginRight: that.props.labelMargin, width: that.props.labelWidth, display: that.props.vertical ? 'block' : 'inline-block' } },
        data.name
      );
    });

    return React.createElement(
      'div',
      { className: classnames({ 'radio-group': true }, this.props.className), style: assign({}, this.props.style) },
      radioGroup
    );
  }
});

module.exports = RadioGroup;