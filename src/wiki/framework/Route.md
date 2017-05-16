# 路由配置相关功能介绍

Radmin框架使用了[react-router](https://github.com/reactjs/react-router)路由组件，在此基础上扩展了对于切换layout布局的支持

## 使用方法

路由配置在src/js/config/RouteConfig.js文件中，参数如下：

| 参数名      | 值(举例) 			|  功能  							|
| :--------:  | :-----:  			| :----  							|
| path        | /example/form 		|   路由     						|
| page        | ExampleForm  		|   对应的react页面片   			|
| layout      | Error404   			|  指定当前页面片的layout(可选)  	|

使用示例：

```js
module.exports = [
  {path: '/', page: UiBase},
  {path: '/ui/base', page: UiBase, layout: App2},
  {path: '/ui/base/2', page: UiBase2},
  {path: '/ui/base/3', page: UiBase3},
  {path: '/ui/advance', page: UiAdvance},
  {path: '/ui/popup', page: UiPopup},
  {path: '/example/form', page: ExampleForm},
  {path: '/example/table', page: ExampleTable},
  {path: '/example/chart', page: ExampleChart},
  {path: '/example/param', page: ExampleParam},
  {path: '/example/param/:p1', page: ExampleParam},
  {path: '/example/param/:p1/:p2', page: ExampleParam},
  {path: '/guide/main', page: Guide},
  {path: '/notlogin', page: NotLogin, layout: null},
  {path: '*', page: null, layout: Error404},
];
module.exports.defaultLayout = App
```

如果没有显式设置layout值则使用defaultLayout
