var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Popup = require('../popup')

/**
 * 搜索条支持回车键
 */
var SearchBar = React.createClass({
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
    onSearch: React.PropTypes.func,
  },
  getDefaultProps: function () {
    return {
      value: null,
      placeholder: '输入关键词',
      onChange: null,
      onSearch: null,
      round: false
    }
  },
  getInitialState: function () {
    return {
      value: this.props.value || ''
    }
  },
  _onChange: function (event) {
    this.state.value = event.target.value

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value)
    }
    this.forceUpdate()
  },
  _onSearch: function () {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.value)
    }
  },
  _onKeyDown: function (event) {
    if (event.key == 'Enter') {
      this._onSearch()

      ReactDom.findDOMNode(this.refs.search_input).blur()
    }
  },
  render: function () {
    return (
      <div className={classnames({'search-bar': true}, this.props.className)} style={assign({}, this.props.style)}>
        <input
          ref='search_input'
          className={'form-control ' + (this.props.round ? 'input-rounded' : '')}
          placeholder={this.props.placeholder}
          value={this.state.value ? this.state.value : ''}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown} />
        <div className='form-control-feedback' onClick={this._onSearch}>
          <i className='icon-search4 text-size-base'></i>
        </div>
      </div>
    )
  }
})

module.exports = SearchBar
