var React = require('react')

var Utils = require('radmin').Utils

var StoreConfig = require('../../config/StoreConfig');
var AjaxDemoAction = require('../../actions/AjaxDemoAction')
var AjaxDemoStore = require('../../stores/AjaxDemoStore')

var Document = require('../component/Document')

module.exports = React.createClass({
  getInitialState: function () {
    var date = new Date()
    return {
      info: null
    }
  },
  componentDidMount: function () {
    AjaxDemoStore.addChangeListener(this._update)
  },
  componentWillUnmount: function () {
    AjaxDemoStore.removeChangeListener(this._update)
  },
  _update: function () {
    var data = AjaxDemoStore.getData(StoreConfig.STORE_INFO_DATA)

    this.setState({info: data.info})
  },
  _getInfo: function () {
    AjaxDemoAction.getInfo()
  },
  _setInfo: function () {
    AjaxDemoAction.setInfo(function () {
      Utils.prompt('提交成功')
    })
  },
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>Ajax请求示例 <small className='display-block'>对原始ajax请求进行封装，更易于使用</small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>简介</h5>
              </div>
              <div className='panel-body'>
                <p className='content-group'>
                  这里介绍最常用的两种Ajax请求方式，细节可直接参看代码
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>使用方法</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <p>
                    读数据步骤：
                  </p>
                  <p className='content-group'>
                    <code>*</code>在UrlConfig中配置后端接口地址
                  </p>
                  <p className='content-group'>
                    <code>*</code>在StoreConfig中创建此数据名称
                  </p>
                  <p className='content-group'>
                    <code>*</code>创建接口（数据）对应的的Action和Store
                  </p>
                  <p className='content-group'>
                    <code>*</code>页面中调用Action发出请求，Action请求成功后将返回数据存入Store
                  </p>
                  <p className='content-group'>
                    <code>*</code>页面中监听Store变化执行页面数据更新操作
                  </p>
                </div>
                <div className='form-group'>
                  <p>
                    写数据步骤：
                  </p>
                  <p className='content-group'>
                    <code>*</code>在UrlConfig中配置后端接口地址
                  </p>
                  <p className='content-group'>
                    <code>*</code>创建接口（数据）相对应的的Action
                  </p>
                  <p className='content-group'>
                    <code>*</code>页面中调用Action发出请求，成功后执行回调
                  </p>
                  <p className='content-group'>
                    <code>*</code>页面中的回调函数被执行
                  </p>
                </div>
                <div className='form-group'>
                  <p>
                    其他：
                  </p>
                  <p className='content-group'>
                    <code>*</code>通用错误处理可在AjaxConfig中完成，在没有自定义Ajax请求属性的情况下，默认请求都会使用AjaxConfig
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>测试</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <p>
                    <a onClick={this._setInfo}>提交数据</a>
                  </p>
                  <p>
                    <a onClick={this._getInfo}>获取数据</a><span style={{marginLeft: 10}}>{this.state.info}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='framework/Ajax.md' />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
})
