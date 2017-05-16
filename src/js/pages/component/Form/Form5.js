var React = require('react')

var Utils = require('radmin').Utils
var Form = require('radmin').Form
var FormField = Form.Field
var FormInput = Form.FileInput
var FormUtil = Form.Util
var Popup = require('radmin').Popup

module.exports = React.createClass({
  getInitialState: function () {
    return {
      name: '',
      psw: '',
      popup: false
    }
  },
  _onPopup: function () {
    this.setState({
      popup: true
    })
  },
  _onPopupConfirm: function () {
    this.refs.form.submit()
  },
  _onPopupClose: function () {
    this.refs.form.cancel()
  },
  _onSave: function () {
    Utils.prompt('form submit success')
    this.setState({
      popup: false
    })
  },
  _onCancel: function () {
    Utils.prompt('cancel success')
    this.setState({
      popup: false
    })
  },
  render: function () {
    return (
      <div>
        <a className='btn btn-default' onClick={this._onPopup}>弹窗表单提交</a>
        {this.state.popup ?
           <Popup title='用户登录' width={400} footer={(
                       <div className='modal-footer'>
                         <a type='a' className='btn btn-link' onClick={this._onPopupClose}>取消</a>
                         <a type='a' className='btn btn-primary' onClick={this._onPopupConfirm}>确认</a>
                       </div>
                      )}>
             <Form
               onSubmit={this._onSave}
               onCancel={this._onCancel}
               ref='form'>
               <FormField label='用户名：' desc='请填写用户名' validation={[{ type: 'required', message: '用户名不能为空', value: this.state.name }, { type: 'number', message: '用户名只能填数字', value: this.state.name }]}>
                 <input
                   type='text'
                   value={this.state.name || ''}
                   onChange={Form.Util.linkState(this, 'name')}
                   className='form-control' />
               </FormField>
               <FormField label='密码：' desc='仅支持字母和数字' validation={[{ type: 'required', message: '密码不能为空', value: this.state.psw }]}>
                 <input
                   type='password'
                   value={this.state.psw || ''}
                   onChange={Form.Util.linkState(this, 'psw')}
                   className='form-control' />
               </FormField>
             </Form>
           </Popup>
           : null}
      </div>
    )
  }
})
