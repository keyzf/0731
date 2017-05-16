# Navigator 导航

支持横向和纵向导航，支持完全自定义导航样式，支持多导航组件组合使用（分别对应导航配置的任意级别）


## Props
| Name               | Type   | Default | Required | Description                                                                                                           |
| ------------------ | ------ | ------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| data               | Any    |         | false    | 导航数据配置，例[{text: '第一项', alias: '1', url: ['/page1', '/page1/1'], value: [{text: '子项', alias: '1-1', url: 'page1/1'}]}] |
| cellHeight         | Number |         | false    | 每个第二级属性高度，例：40                                                                                                        |
| dataLayerIndex     | Number |         | false    | 从data中的哪级导航开始                                                                                                         |
| dataLayerRange     | Number |         | false    | 支持data中的几级导航，值为1或2，例：2                                                                                                |
| onlyOneUrl         | Bool   | false   | false    | 当有多个项的url均符合当前浏览器地址的时候，只显示其中一个，优先根据当前alias, 如：false                                                                   |
| alwaysOpen         | Bool   | false   | false    | 是否所有项始终打开，覆盖data中的值                                                                                                   |
| navigatorRender    | Any    |         | false    | navigator处理器，以便支持自定义处理器，已提供默认处理器，不建议修改，如：'horizontal'                                                                 |
| onRedirect         | Func   |         | false    | 自定义重定向回调，例：function(url, alias) {}                                                                                    |
| onNotFoundCallback | Func   |         | false    | 当前url没有匹配项回调，例：function(url) {}                                                                                       |
