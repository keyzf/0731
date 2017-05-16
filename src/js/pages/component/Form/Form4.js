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
        vertical={true}
        onSubmit={function(){
          Utils.prompt('带验证表单提交成功')
        }}
        onCancel={function(){
          Utils.prompt('带验证表单取消')
        }}
        ref='form4'>
        <FormField label={<span className="required-star">用户名：</span>} validation={[{ type: 'required', message: '用户名不能为空', value: this.state.name }]}>
          <input
            type='text'
            value={this.state.name || ''}
            onChange={Form.Util.linkState(this, 'name')}
            className='form-control' />
        </FormField>
        <FormField label={<span className="required-star">密码：</span>} desc='密码是至少6位的数字和字母' validation={[{ type: 'minlength', params: 6, message: '密码是至少6位的数字和字母', value: this.state.psw }]}>
          <input
            type='password'
            value={this.state.psw || ''}
            onChange={Form.Util.linkState(this, 'psw')}
            className='form-control' />
        </FormField>
        <FormField className='text-right' contentCol={12}>
          <a className='btn btn-default' onClick={function(){this.refs.form4.cancel()}.bind(this)} style={{marginRight: 10}}>
            取消
          </a>
          <a className='btn btn-primary' onClick={function(){this.refs.form4.submit()}.bind(this)}>
            提交
          </a>
        </FormField>
      </Form>
    )
  }
})
