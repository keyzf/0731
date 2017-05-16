var React = require('react')

var Utils = require('radmin').Utils
var Form = require('radmin').Form
var FormField = Form.Field
var FormInput = Form.FileInput
var FormUtil = Form.Util
var Slider = require('radmin').Slider

module.exports = React.createClass({
  getInitialState: function () {
    return {
      name: '',
      psw: '',
      labelCol: 2
    }
  },
  _onDrag: function (value) {
    this.setState({
      labelCol: value
    })
  },
  render: function () {
    return (
      <Form
        vertical={false}      
        ref='form3'>
        <FormField label='用户名：' labelCol={this.state.labelCol} contentCol={12 - this.state.labelCol}>
          <input
            type='text'
            value={this.state.name || ''}
            onChange={Form.Util.linkState(this, 'name')}
            className='form-control' />
        </FormField>
        <FormField label='密码：' labelCol={this.state.labelCol} contentCol={12 - this.state.labelCol}>
          <input
            type='text'
            value={this.state.psw || ''}
            onChange={Form.Util.linkState(this, 'psw')}
            className='form-control' />
        </FormField>
        <FormField contentCol={12}>
          <Slider
            style={{width: '100%'}}
            min={1}
            max={11}
            step={1}
            value={this.state.labelCol}
            onChange={this._onDrag} />
        </FormField>
      </Form>
    )
  }
})
