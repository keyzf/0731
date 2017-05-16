var React = require('react')
var RouteConfig = require('../config/RouteConfig')

module.exports = function (context) {
  // 未配置layout使用默认layout
  var Layout = context.route.layout
  if (typeof Layout === 'undefined') {
    Layout = RouteConfig.defaultLayout
  }
  var Page = context.element

  if (!Layout) {
    if (!Page) {
      context.element = (<div />)
    } else {
      context.element = Page
    }
  } else {
    if (!Page) {
      context.element = (<Layout />)
    } else {
      context.element = (
        <Layout>
          {Page}
        </Layout>
      )
    }
  }

  context.execute(); // 继续执行其它filter
}
