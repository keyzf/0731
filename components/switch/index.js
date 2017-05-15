var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

/**
 * 开关
 */
var Switch = React.createClass({
  propTypes: {
    /**
     * 组名，例：'group1'
     */
    name: React.PropTypes.string,
    /**
     * 值，例：1
     */
    value: React.PropTypes.any,
    /**
     * 是否选中，例：true
     */
    checked: React.PropTypes.bool,

    /**
     * 点击回调，例：function(checked) {}
     */
    onChange: React.PropTypes.func,
  },
  getDefaultProps: function () {
    return {
      name: '',
      value: '',
      checked: false,
      onChange: null
    }
  },
  getInitialState: function () {
    return {
      checked: this.props.checked
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.checked != nextProps.checked) {
      this.props = nextProps
      this.state.checked = this.props.checked
    }
  },
  _onClick: function () {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(!this.state.checked)
    }
  },
  render: function () {
    return (
      <label className={classnames({}, this.props.className)} style={assign({}, this.props.style)}>
        <span className={this.state.checked ? 'switchery switchery-default checked' : 'switchery switchery-default'} onClick={this._onClick}><small className={this.state.checked ? 'checked' : ''}></small></span>
        {this.props.children}
      </label>
    )
  }
})

module.exports = Switch
