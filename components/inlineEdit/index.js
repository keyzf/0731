var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

function selectInputText (element) {
  element.setSelectionRange(0, element.value.length)
}

/**
 * 点击产生输入框
 */
var InlineEdit = React.createClass({
  propTypes: {
    /**
     * 组件值
     */
    value: React.PropTypes.string,

    /**
     * 输入完成的回调
     */
    onBlur: React.PropTypes.func,

    /**
     * 无值时显示的内容
     */
    placeholder: React.PropTypes.any
  },
  getDefaultProps: function () {
    return {
      onBlur: null,
      placeholder: ""
    }
  },
  getInitialState: function () {
    return {
      value: this.props.children,
      editing: false
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.state.value != nextProps.children) {
      // this.props = nextProps
      this.state.value = nextProps.children
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      var inputElem = ReactDom.findDOMNode(this.refs.input)
      inputElem.focus()
      selectInputText(inputElem)
    }
  },
  _handleInputChange: function (e) {
    this.setState({
      value: e.target.value
    })
  },
  _handleInputKeyDown: function (e) {
    if (e.keyCode == 13) {
      var inputElem = ReactDom.findDOMNode(this.refs.input)
      inputElem.blur()
    // this.props.onBlur ? this.props.onBlur(this.state.value) : null
    }
  },
  _handleClick: function () {
    this.setState({
      editing: !this.state.editing
    })
  },
  _handleBlur: function () {
    this.setState({
      editing: !this.state.editing
    })
    this.props.onBlur ? this.props.onBlur(this.state.value) : null
  },
  render: function () {
    if (this.state.editing) {
      return (
        <input
          type='text'
          value={this.state.value}
          ref='input'
          onChange={this._handleInputChange}
          onKeyDown={this._handleInputKeyDown}
          onBlur={this._handleBlur}
          className={classnames({'form-control': true}, this.props.className)}
          style={assign({maxWidth: 'auto', minWidth: 100, minHeight: 30, display: 'inline-block'}, this.props.style)}/>
      )
    } else {
      return (
        <div
          onClick={this._handleClick}
          className={classnames({}, this.props.className)}
          style={assign({maxWidth: 'auto', minWidth: 100, minHeight: 30}, this.props.style)}>
            {this.state.value ? this.state.value : this.props.placeholder}
          </div>
      )
    }
  }
})

module.exports = InlineEdit
