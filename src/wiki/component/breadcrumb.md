# Breadcrumb 面包屑

提供面包屑功能


## Props
| Name                | Type | Default | Required | Description                                                                                                    |
| ------------------- | ---- | ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| data                | Any  | {}      | false    | 数据，例：[{text: '主页', alias: 'home-page', url: '/'}, {text: '项目列表', alias: 'project-list', url: '/project/list'}] |
| tag                 | Any  | null    | false    | 每个链接项之间的间隔符，例：'>'                                                                                              |
| defaultItem         | Any  | null    | false    | 一些固定项放置在最前，例：[{text: '主页', alias: 'home-page', url: '/'}]                                                      |
| lastItemWithoutLink | Bool | true    | false    | 最后一项不要链接（一般最后一项为当前页面），例：true                                                                                   |
| onRedirect          | Func | null    | false    | 自定义点击回调，设置此项后点击不会自动跳转url，例：function(url, alias, text) {}                                                       |
