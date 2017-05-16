var React = require('react')

var Utils = require('radmin').Utils

module.exports = React.createClass({
  contextTypes: {
    pathname: React.PropTypes.string,
    params: React.PropTypes.object,
    query: React.PropTypes.object
  },
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>Url参数传递示例 <small className='display-block'>前端页面切换时的url参数传递方法</small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>简介</h5>
              </div>
              <div className='panel-body'>
                <p className='content-group'>
                  这里支持两种页面跳转时url传参方式
                </p>
                <p className='content-group'>
                  <code>*</code>传统的QueryString方式（“?”后包含的参数）
                </p>
                <p className='content-group'>
                  <code>*</code>从url的hash部分获取参数（“#”后包含的参数）
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
                    <code>*</code>第一种传参方式可直接使用
                  </p>
                  <p className='content-group'>
                    <code>*</code>第二种传参方式需要在RoutConfig和NavigatorConfig中进行配置
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
                  <p className='content-group'>
                    当前url为：
                    {window.location.href}，页面内置对象如下：
                  </p>
                  <p className='content-group'>
                    <code>*</code>pathname对象内容：
                    {JSON.stringify(this.context.pathname)}
                  </p>
                  <p className='content-group'>
                    <code>*</code>query对象内容：
                    {JSON.stringify(this.context.query)}
                  </p>
                  <p className='content-group'>
                    <code>*</code>params对象内容：
                    {JSON.stringify(this.context.params)}
                  </p>
                </div>
                <div className='form-group'>
                  <a href={'#/func/param/' + parseInt(Math.random() * 10000) + '/' + parseInt(Math.random() * 10000)}>点击跳转（url带随机参数）</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
