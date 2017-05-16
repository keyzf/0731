var React = require('react')

var Utils = require('radmin').Utils
var Form = require('radmin').Form
var FormField = Form.Field
var FormInput = Form.FileInput
var FormUtil = Form.Util

module.exports = React.createClass({
  getInitialState: function () {
    return {
      name: '',
      psw: ''
    }
  },
  render: function () {
    return (
      <Form
        onSubmit={function(){
          Utils.prompt('垂直排列表单提交成功')
        }}
        onCancel={function(){
          Utils.prompt('垂直排列表单取消')
        }}
        ref='form2'>
        <FormField label='用户名：' vertical={true}>
          <input
            type='text'
            value={this.state.name || ''}
            onChange={Form.Util.linkState(this, 'name')}
            className='form-control' />
        </FormField>
        <FormField label='密码：' vertical={true}>
          <input
            type='text'
            value={this.state.psw || ''}
            onChange={Form.Util.linkState(this, 'psw')}
            className='form-control' />
        </FormField>
        <FormField className='text-right' contentCol={12}>
          <a className='btn btn-default' onClick={function(){this.refs.form2.cancel()}.bind(this)} style={{marginRight: 10}}>
            取消
          </a>
          <a className='btn btn-primary' onClick={function(){this.refs.form2.submit()}.bind(this)}>
            提交
          </a>
        </FormField>
      </Form>
    )
  }
})
