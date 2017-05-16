var React = require('react')

var Utils = require('radmin').Utils

var Document = require('../component/Document')

module.exports = React.createClass({
  contextTypes: {
    pathname: React.PropTypes.string
  },
  _onClick1: function () {
    window.location.href = '#/func/layout'
  },
  _onClick2: function () {
    window.location.href = '#/func/layout-new'
  },
  _onClick3: function () {
    window.location.href = '#/func/layout-none'
  },
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>布局切换示例 <small className='display-block'>支持随意切换布局</small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>简介</h5>
              </div>
              <div className='panel-body'>
                <p className='content-group'>
                  方便在多种不同布局（Layout）中切换，比如从首页进入功能页
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
                    在Layout文件夹下新增布局，并在RoutConfig中进行配置
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
                  {this.context.pathname === '/func/layout' ?
                     <div>
                       <p>
                         <a onClick={this._onClick2}>切换到横向导航的新布局</a>
                       </p>
                       <p>
                         <a onClick={this._onClick3}>切换到空布局</a>
                       </p>
                     </div>
                     :
                     <div>
                       <p>
                         <a onClick={this._onClick1}>回到原来的布局</a>
                       </p>
                     </div>}
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='framework/Layout.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
