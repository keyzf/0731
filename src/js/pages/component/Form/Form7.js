var React = require('react')

var Utils = require('radmin').Utils
var Select = require('radmin').Select
var Form = require('radmin').Form
var FormField = Form.Field
var FormInput = Form.FileInput
var FormUtil = Form.Util

module.exports = React.createClass({
  getInitialState: function () {
    return {
      name: '',
      url: '',
      rd: '',
      admin: '',
      desc: '',
      approval_1:'',
      approval_2:'',
      approval_3:'',
      approval_3_person:''
    }
  },
  _onChange1: function(value){

  },
  _onChange2: function(value){

  },
  _onChange3: function(value){

  },
  render: function () {
    return (
      <Form onSubmit={function(){
            Utils.prompt('复杂表单提交成功')
          }} onCancel={function(){
            Utils.prompt('复杂表单取消提交')
          }} ref='form1'>
        <legend className='text-bold'>
          基本信息
        </legend>
        <div className='row'>
          <FormField label='系统名称：' className='col-xs-4' labelCol={4} contentCol={8} validation={[{ type: 'required', message: '系统名不能为空', value: this.state.name }]}>
            <input
              type='text'
              value={this.state.name || ''}
              onChange={Form.Util.linkState(this, 'name')}
              className='form-control' />
          </FormField>
          <FormField label='系统地址：' className='col-xs-4' labelCol={4} contentCol={8} validation={[{ type: 'required', message: '系统地址不能为空', value: this.state.url }]}>
            <input
              type='text'
              value={this.state.url || ''}
              onChange={Form.Util.linkState(this, 'url')}
              className='form-control' />
          </FormField>
        </div>
        <div className='row'>
          <FormField label='开发负责人：' className='col-xs-4' labelCol={4} contentCol={8} >
            <input
              type='text'
              value={this.state.rd || ''}
              onChange={Form.Util.linkState(this, 'rd')}
              className='form-control' />
          </FormField>
          <FormField label='系统管理员：' className='col-xs-4' labelCol={4} contentCol={8} >
            <input
              type='text'
              value={this.state.admin || ''}
              onChange={Form.Util.linkState(this, 'admin')}
              className='form-control' />
          </FormField>
          <FormField label='系统描述：' className='col-xs-4' labelCol={4} contentCol={8} >
            <input
              type='text'
              value={this.state.desc || ''}
              onChange={Form.Util.linkState(this, 'desc')}
              className='form-control' />
          </FormField>
        </div>
        <legend className='text-bold'>
          审批信息
        </legend>
        <div className='row'>
          <FormField label='一级审批：' className='col-xs-4' labelCol={4} contentCol={8} >
            <Select name='请选择' onChange={this._onChange1} defaultValue={0} options={[{ name: '直接上级', value: 0 }, { name: '系统管理员', value: 1 }, { name: '指定审批人', value: 2 }]} />
          </FormField>
        </div>
        <div className='row'>
          <FormField label='二级审批：' className='col-xs-4' labelCol={4} contentCol={8} >
            <Select name='请选择' onChange={this._onChange2} defaultValue={1} options={[{ name: '直接上级', value: 0 }, { name: '系统管理员', value: 1 }, { name: '指定审批人', value: 2 }]} />
          </FormField>
        </div>
        <div className='row'>
          <FormField label='三级审批：' className='col-xs-4' labelCol={4} contentCol={8} >
            <Select name='请选择' onChange={this._onChange3} defaultValue={3} options={[{ name: '直接上级', value: 0 }, { name: '系统管理员', value: 1 }, { name: '指定审批人', value: 2 }]} />
          </FormField>
          <FormField className='col-xs-4'>
            <input
              type='text'
              value={this.state.approval_3_person || ''}
              onChange={Form.Util.linkState(this, 'approval_3_person')}
              className='form-control' />
          </FormField>
        </div>
        <FormField className='text-right' contentCol={12}>
          <a className='btn btn-default' onClick={function(){this.refs.form1.cancel()}.bind(this)} style={{marginRight: 10}}>取消</a>
          <a className='btn btn-primary' onClick={function(){this.refs.form1.submit()}.bind(this)}>提交</a>
        </FormField>
      </Form>
    )
  }
})
