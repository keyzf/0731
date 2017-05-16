var React = require('react')

var Spin = require('radmin').Spin

var StoreConfig = require('../../../config/StoreConfig');
var AjaxDemoAction = require('../../../actions/AjaxDemoAction')
var AjaxDemoStore = require('../../../stores/AjaxDemoStore')

module.exports = React.createClass({
  _getQqCom: function() {
    AjaxDemoAction.getQqCom();
  },
  render: function () {
    return (
      <Spin statusType={StoreConfig.STORE_QQ_COM_DATA} style={{minHeight: 20}}>
        <a onClick={this._getQqCom}>发送对QQ.COM的数据请求</a>
        <div className='text-muted'>
          因为跨域问题无法请求成功，这里只是展示请求过程中的菊花效果
        </div>
      </Spin>
    )
  }
})
