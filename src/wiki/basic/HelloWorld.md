#添加一个页面

Radmin在易用性方便做了大量工作，非前端开发人员不需要深入了解前端知识体系，也可以用简单几行code的创建页面、维护代码，下面我们来看增加一个空白页面的示例。
如果在项目中快速增加一个空页面，通过路由可以访问到，并且在导航菜单中看到它，你要做的就是如下几步：

*	首先在src/js/page/路径下面增加一个页面的示例文件Test.js

```js
var React = require('react');

//创建一个react页面
module.exports = React.createClass({
  render: function () {
    return <div>Hello Radmin</div>
  }
});
```

*	在src/js/config/RouteConfig.js中配置路由

```js
var React = require('react');

// 在此引入第一步增加的文件，可以复制page下其他的页面
var Test = require('../pages/Test');

// 在此配置路由
module.exports = [
 {path: '/test', page: Test}
];
```

完成之后访问[http://127.0.0.1/#test](http://127.0.0.1/#test)，刚添加的页面会显示出来

*	接下来我们需要将页面加入导航。打开src/js/config/NavigatorConfig.js

```js
// 将以下数据加入到配置数组的最后一项
{
  text: '测试页面',
  alias: 'test',
  url: '/test',
  className: 'icon-guide',
  open: false
}
```

可以看到导航菜单中增加了测试页面的导航项，至此增加一个空页面工作就完成了
