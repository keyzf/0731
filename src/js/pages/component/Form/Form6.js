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
      psw: '',
      files: []
    }
  },
  _onSelectFile: function (e) {
    if (!e.target.files.length) return
    this.state.files = []
    for (var i = 0; i < e.target.files.length; i++) {
      this.state.files.push(e.target.files[i])
    }
    this.forceUpdate()
  },
  _onChange: function (ev) {
    Utils.prompt('select success')
    console.log(ev)
  },
  _onUpload: function () {
    var self = this
    FormUtil.submitDataWithFile({
      url: '/default/default',
      files: self.state.files,
      data: {
        name: self.state.name,
        psw: self.state.psw
      },
      onSuccess: function (response) {
        alert('数据提交成功')
      }
    })
  },
  render: function () {
    return (
      <Form
        onSubmit={function(){
          Utils.prompt('带文件上传表单提交成功')
        }}>
        <FormField label={<span className="required-star">上传文件：</span>}>
          <FormInput name='点击上传' onChange={this._onSelectFile} />
        </FormField>
        <FormField className='text-right' contentCol={12}>
          <a className='btn btn-primary' onClick={this._onUpload}>
            提交
          </a>
        </FormField>
      </Form>
    )
  }
})
