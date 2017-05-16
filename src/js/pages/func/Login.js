var React = require('react')

var Utils = require('radmin').Utils

var Document = require('../component/Document')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>多种登录示例 <small className='display-block'>内置多种登录方式</small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>简介</h5>
              </div>
              <div className='panel-body'>
                <p className='content-group'>
                  包含的登录方式如下：
                </p>
                <p className='content-group'>
                  <code>*</code>OA登录，公司内网登录方式
                </p>
                <p className='content-group'>
                  <code>*</code>QQ登录，QQ域名下的登录方式
                </p>
                <p className='content-group'>
                  <code>*</code>QC登录，支持所有域名的QQ互联登录方式
                </p>
                <p className='content-group'>
                  <code>*</code>both登录，QQ域名下使用，用户可选择OA登录还是QQ登录
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
                  <p className='content-group'>
                    在LoginConfig中进行配置
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
                  页面右上角登录按钮
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='framework/Login.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
