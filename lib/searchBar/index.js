'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Popup = require('../popup');

/**
 * 搜索条支持回车键
 */
var SearchBar = React.createClass({
  displayName: 'SearchBar',

  propTypes: {
    /**
     * 值，例：'aaa'
     */
    value: React.PropTypes.any,
    /**
     * 默认提示信息，例：'输入关键词'
     */
    placeholder: React.PropTypes.string,
    /**
     * 是否圆角，例：false
     */
    round: React.PropTypes.bool,

    /**
     * 输入信息改变时的回调，例：function(value) {}
     */
    onChange: React.PropTypes.func,
    /**
     * 点击搜索按钮的回调，例：function(value) {}
     */
    onSearch: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      placeholder: '输入关键词',
      onChange: null,
      onSearch: null,
      round: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value || ''
    };
  },
  _onChange: function _onChange(event) {
    this.state.value = event.target.value;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value);
    }
    this.forceUpdate();
  },
  _onSearch: function _onSearch() {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.value);
    }
  },
  _onKeyDown: function _onKeyDown(event) {
    if (event.key == 'Enter') {
      this._onSearch();

      ReactDom.findDOMNode(this.refs.search_input).blur();
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ 'search-bar': true }, this.props.className), style: assign({}, this.props.style) },
      React.createElement('input', {
        ref: 'search_input',
        className: 'form-control ' + (this.props.round ? 'input-rounded' : ''),
        placeholder: this.props.placeholder,
        value: this.state.value ? this.state.value : '',
        onChange: this._onChange,
        onKeyDown: this._onKeyDown }),
      React.createElement(
        'div',
        { className: 'form-control-feedback', onClick: this._onSearch },
        React.createElement('i', { className: 'icon-search4 text-size-base' })
      )
    );
  }
});

module.exports = SearchBar;