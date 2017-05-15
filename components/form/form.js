var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var FormField = require('./field')
var Util = require('./util')

var Form = React.createClass({
  propTypes: {
    /**
     * 标签宽度，根据栅格化的样式填写比例，例如2
     */
    labelCol: React.PropTypes.number,
    /**
     * 内容宽度，根据栅格化的样式填写比例，；例如10
     */
    contentCol: React.PropTypes.number,
    /**
     * 文字和标签是上下结构还是左右结构
     */
    vertical: React.PropTypes.bool,
    /**
     * 表单提交
     */
    onSubmit: React.PropTypes.func,
    /**
     * 表单取消提交
     */
    onCancel: React.PropTypes.func
  },
  childContextTypes: {
    form_id: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      validator: null
    }
  },
  getChildContext: function () {
    this.uuid = Util.generateGuuId()
    return {form_id: this.uuid}
  },
  componentWillMount: function () {
    var self = this
    this.fields = []
    Util.EventEmitter.subscribe('addField', function (info) {
      if (info.uuid == self.uuid) {
        self.fields.push(info.field)
      }
    })
  },
  componentWillUnmount: function () {
    Util.EventEmitter.unSubscribe('addField')
  },
  // 对外提供表单提交的API
  submit: function (event) {
    event && event.preventDefault()
    var self = this
    var pass = true
    this.fields.forEach(function (child) {
      if (child && child.props.validation) {
        if (!child.doValidate()) {
          pass = false
        }
      }
    })
    if (pass) {
      // alert('you pass')
      this.props.onSubmit && this.props.onSubmit()
    } else {
      // alert('you can not pass')
    }
    return false
  },
  // 对外提供表单取消的API
  cancel: function (event) {
    event && event.preventDefault()
    this.props.onCancel && this.props.onCancel()
  },

  render: function () {
    var props = {
      vertical: this.props.vertical,
      labelCol: this.props.labelCol,
      contentCol: this.props.contentCol,
      doValidate: this.state.validate
    }
    // var fields = React.Children.map(this.props.children, function (child, i) {
    //   if (child) {
    //     props.contentCol = child.props.contentCol ? child.props.contentCol : props.contentCol
    //     return React.cloneElement(child, props)
    //   }
    // })
    var legend = this.props.name ? (
      <legend className='text-bold'>
        {this.props.name}
      </legend>
      )
      : null

    return (
      <form className={classnames({'form-horizontal': true}, this.props.className)} style={assign({}, this.props.style)}>
        {legend}
        {this.props.children}
      </form>
    )
  }
})

module.exports = Form
