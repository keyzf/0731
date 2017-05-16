var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <div className='panel panel-flat'>
          <div className='panel-heading'>
            <h5 className='panel-title'>Radmin概述</h5>
          </div>
          <div className='panel-body' style={{whiteSpace: 'pre-wrap'}}>
            Radmin是为企业级管理后台产品的前端开发量身设计的一套react解决方案，由OMG商业产品中心前端团队开发维护，通过多个管理后台项目端开发实践，实现了一套基于react的<code>框架/组件库</code>。 
            整站和组件的样式基于bootstrap并进行了多项扩展，响应式布局兼容移动端访问体验。
            Radmin组件包含多级导航、弹窗、日期选择器、表格分页、表单提交、面包屑导航、图表、Tab页切换等各式组件，通过简单的工具和丰富的组件可以让前端和非前端同学快速上手。
          </div>
        </div>
      </div>
    )
  }
})
