# SearchBar 搜索框

搜索条支持回车键


## Props
| Name        | Type   | Default | Required | Description                     |
| ----------- | ------ | ------- | -------- | ------------------------------- |
| value       | Any    | null    | false    | 值，例：'aaa'                       |
| placeholder | String | '输入关键词' | false    | 默认提示信息，例：'输入关键词'                |
| round       | Bool   | false   | false    | 是否圆角，例：false                    |
| onChange    | Func   | null    | false    | 输入信息改变时的回调，例：function(value) {} |
| onSearch    | Func   | null    | false    | 点击搜索按钮的回调，例：function(value) {}  |
