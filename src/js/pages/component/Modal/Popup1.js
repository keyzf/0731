var React = require('react')

var Utils = require('radmin').Utils

var Popup = require('radmin').Popup
var Form = require('radmin').Form
var FormField = require('radmin').Form.Field

var EditName = React.createClass({
  getDefaultProps: function () {
    return {
      id: null
    }
  },
  getInitialState: function () {
    return {
      info: { // 要验证的表单数据
        name: ''
      }
    }
  },
  componentDidMount: function () {
    if (this.props.id != 'undefined' && this.props.id != null) {
      // 一般从Store里或从接口中，根据id获取名称
      this.state.info.name = '张三'
      this.forceUpdate()
    }
  },

  _onSave: function () {
    // 发送保存请求，请求成功执行回调
    var that = this
    Utils.prompt({
      text: '发送请求',
      onClose: function () {
        if (typeof that.props.onConfirm === 'function') {
          // 执行确认回调，在回调中关闭此Popup
          that.props.onConfirm()
        }
      }
    })
  },
  _onCancel: function () {
    if (typeof this.props.onCancel === 'function') {
      // 执行取消回调，在回调中关闭此Popup
      this.props.onCancel()
    }
  },
  render: function () {
    var that = this

    return (
      <Popup
        footer={null}
        onClose={this._onCancel}
        name={typeof this.props.id != 'undefined' && this.props.id != null ? '编辑名称' : '新增名称'}
        width={400}
        overlayClose={true}>
        <Form
          data={this.state.info}
          vertical={true}
          buttonAlign='center'
          labelCol={25}
          contentCol={50}
          submit={{ button: <a className='btn bg-blue-300 btn-rounded' style={{ fontSize: 18, lineHeight: 1.8, width: 250 }}>保存</a>, onClick: this._onSave }}>
          <FormField label={<span className="required-star">名称：</span>} validation={[{ type: 'required', message: '名称不能为空。', value: this.state.info.name }]}>
            <input
              type='text'
              placeholder=''
              value={this.state.info.name ? this.state.info.name : ''}
              onChange={Form.Util.linkState(this, 'info.name')}
              className='form-control' />
          </FormField>
        </Form>
      </Popup>
    )
  }
})

module.exports = React.createClass({
  getInitialState: function () {
    return {
      showEditNamePopup: false,
      id: null
    }
  },
  _custom: function () {
    this.setState({id: 1, showEditNamePopup: true})
  },
  _onEditNamePopupConfirm: function () {
    this.setState({id: null, showEditNamePopup: false})
  },
  _onEditNamePopupCancel: function () {
    this.setState({id: null, showEditNamePopup: false})
  },
  render: function () {
    return (
      <div>
        <button type='button' className='btn btn-default' onClick={this._custom}>
          Custom
        </button>
        {this.state.showEditNamePopup ?
          <EditName id={this.state.id} onConfirm={this._onEditNamePopupConfirm} onCancel={this._onEditNamePopupCancel} />
          : null}
      </div>
    )
  }
})
