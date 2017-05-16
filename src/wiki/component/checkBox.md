# CheckBox 复选框

单个复选框，多个复选框推荐直接使用CheckBoxGroup


## Props
| Name      | Type   | Default | Required | Description                        |
| --------- | ------ | ------- | -------- | ---------------------------------- |
| name      | String | ''      | false    | 组名，例：'group1'                      |
| value     | Any    | ''      | false    | 值，例：1                              |
| className | Any    |         | false    | class，例：checkbox                   |
| checked   | Bool   | false   | false    | 是否选中，例：true                        |
| disabled  | Bool   | false   | false    | 是否只读，例：true                        |
| onChange  | Func   | null    | false    | 点击回调，例：function(value, checked) {} |
