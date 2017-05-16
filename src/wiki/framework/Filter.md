# 过滤器(filter)相关功能介绍

Radmin框架提供过滤器(filter)来满足在页面加载过程中不同时段执行自定义操作，以实现诸如在页面加载前鉴权，在页面加载后统计页面信息等功能

## 默认filter
框架自带了三个filter，这三个filter是必须存在的

* **LoginFilter** 负责在用户打开页面或跳转时鉴定用户权限
* **CoreFilter** 负责将路由对应的页面片取出
* **LayoutFilter** 负责根据layout参数套用不同的layout模板

## 自定义filter
假如我们有一个需求，想在所有页面打开以后，记录页面当前的路径并上报数据，我们该怎么操作？

1 首先在filters文件夹中增加一个TrackFilter.js的文件

```js
var React = require('react');

//此filter负责数据上报
module.exports = function(context) {
  // context参数代表了链式调用的上下文环境，_filterUtil对象
  // 在此处编写数据上报的代码

  context.execute();       //继续执行其它filter
};
```
2 然后再config/FiterConfig.js中增加一个配置，进入filter的数据从上到下执行，出fitler的顺序是从下到上执行，具体顺序依赖于context.execute()在filter中的位置

```js
var CoreFilter = require('../filters/CoreFilter');
var LoginFilter = require('../filters/LoginFilter');
var LayoutFilter = require('../filters/LayoutFilter');
var TrackFilter = require('../filters/TrackFilter');

module.exports = [
	LoginFilter,
	CoreFilter,
	TrackFilter,    //新加入的Filter
	LayoutFilter,     
];

```

此时打开页面TrackFilter就会执行