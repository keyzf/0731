# RadioGroup 单选框组

一组单选框


## Props
| Name        | Type   | Default                 | Required | Description                                                                                                                      |
| ----------- | ------ | ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| data        | Array  | []                      | true     | 数据，例：[{name: string, value: any, checked: bool, disabled: bool}, ...]，其中name是显示文字，value是保存的值，checked是选中状态，同时有且只有一项的checked值为true |
| value       | Any    | null                    | false    | 当value有值时，data中value相同的项checked值自动为true，其它项自动为false，例：1                                                                          |
| labelMargin | Number | 5                       | false    | 每个Radio之间的距离，例：5                                                                                                                 |
| labelWidth  | Number |                         | false    | 设置Radio为固定宽度，例：200                                                                                                               |
| vertical    | Bool   | false                   | false    | 是否每条单独一行，例：true                                                                                                                  |
| name        | String | Utils.getRandomString() | false    | 组件包含的所有input的name值，而不是data中的name。默认值为随机字符串                                                                                       |
| onChange    | Func   | null                    | true     | 当数据变化时的回调，例：function(data) {}                                                                                                    |
