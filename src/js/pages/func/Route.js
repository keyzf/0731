var React = require('react')

var Utils = require('radmin').Utils
var Document = require('../component/Document')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>路由方式选择 <small className='display-block'>两种方式</small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>简介</h5>
              </div>
              <div className='panel-body'>
                <p className='content-group'>
                  单页面路由方案有两种：
                </p>
                <p className='content-group'>
                  <code>*</code>纯前端路由，即在url中使用锚点#方式，好处是完全由前端控制不需后端配置，推荐使用，框架默认使用纯前端路由
                </p>
                <p className='content-group'>
                  <code>*</code>
                  传统路由方式，即在url使用／，需要服务器配置将页面内路由的不同url都指向此页面，一般要设置url的前缀规则来判定哪些前缀指向哪个页面，以及哪些前缀属于接口。
                  这里要解释一点，当此单页面被加载以后，页面内的路由跳转和纯前端路由一样是不需要向后端发请求的，但是为了保证页面在任意时刻浏览器强制刷新也能正常显示，才需要后端配合，因为浏览器强制刷新一定是要从服务器读取的
                </p>
              </div>
            </div>
          </div>
          
          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='framework/Route.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
