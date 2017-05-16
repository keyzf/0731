# CheckBoxGroup 复选框组

一组复选框


## Props
| Name        | Type   | Default                 | Required | Description                                                                                               |
| ----------- | ------ | ----------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| data        | Array  | []                      | true     | 数据，例：[{name: string, value: any, checked: bool, disabled: bool}, ...]，其中name是显示文字，value是保存的值，checked是选中状态 |
| labelMargin | Number | 5                       | false    | 每个CheckBox之间的距离，例：5                                                                                       |
| labelWidth  | Number |                         | false    | 设置CheckBox为固定宽度，例：200                                                                                     |
| vertical    | Bool   | false                   | false    | 是否每条单独一行，例：true                                                                                           |
| name        | String | Utils.getRandomString() | false    | 组件包含的所有input的name值，而不是data中的name，默认值为随机字符串，一般不建议填写。                                                       |
| onChange    | Func   | null                    | true     | 当数据变化时的回调，例：function(data) {}                                                                             |
