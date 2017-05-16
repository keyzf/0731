var React = require('react')

// 此filter负责将路由对应的页面取出
module.exports = function (context) {
  var route = context.route
  var Page = route.page
  if (route['clone']) {
    Page = React.createFactory(Page)
  }

  var props = {}
  var hasProps = false
  for (var key in route) {
    if (key != 'component' && key != 'page' && key != 'path' && key != 'layout' && key != 'clone') {
      props[key] = route[key]
      hasProps = true
    }
  }

  context.element = hasProps ? (<Page {...props} />) : <Page />
  context.execute(); // 继续执行其它filter
}
