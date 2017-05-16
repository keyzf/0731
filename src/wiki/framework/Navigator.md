# 导航配置

Radmin框架的左边导航栏是可以配置的，点击导航可以切换页面url，如果url变换也可以映射到导航的相应标签打开

## 配置详解

配置文件是src/js/config/NavigatorConfig.js，每个导航项有如下几个参数

| 参数名		| 值(举例)				|  功能  										|
| :--------:	| :-----:				|  :----  										|
| text 			| UI组件				|  显示在导航标签上的名称   					|
| alias			| ui 					|  导航唯一标示									|
| url			| ['/ui/base', '/']   	|  导航对应的url，字符串(单个)或者数组(多个), 双斜杠“//”开头代表改变非#部分的url（//index.html）  	|
| className		| icon-ui   			|  对应了导航前的图标样式		  				|
| value			| []   					|  二级导航，格式与一级导航一致  				|
| open			| true   				|  页面首次打开时，导航是否打开     			|

```js
module.exports = [{
    text: 'UI组件',
    alias: 'ui',
    url: ['/ui/base', '/'],
    className: 'icon-ui',
    value: [
      {text: '基础组件', alias: 'ui-base', url: ['/ui/base', '/'], value: [{
          text: '基础组件一',
          alias: 'ui-base-1',
          url: ['/ui/base', '/'],
        }, {
          text: '基础组件二',
          alias: 'ui-base-2',
          url: '/ui/base/2',
        }, {
          text: '基础组件三',
          alias: 'ui-base-3',
          url: '/ui/base/3',
        }
      ]},
      {text: '高级组件', alias: 'ui-advance', url: '/ui/advance'},
      {text: '弹窗组件', alias: 'ui-popup', url: '/ui/popup'}
    ],
    open: true
  }, {
    text: '页面示例',
    alias: 'example',
    url: 'example/form',
    className: 'icon-example',
    value: [
      {text: '表单示例', alias: 'example-form', url: '/example/form'},
      {text: '表格示例', alias: 'example-table', url: '/example/table'},
      {text: '图表示例', alias: 'example-chart', url: '/example/chart'},
      {text: '传参示例', alias: 'example-param', url: ['/example/param', '/example/param/:p1', '/example/param/:p1/:p2']}
    ],
    open: false
  }, {
    text: '开发步骤',
    alias: 'guide',
    url: '/guide/main',
    className: 'icon-guide',
    open: false
  }
];
```