# Select 下拉框

多种功能的下拉框组件，包含单选、多选、搜索、自动完成等模式


## Props
| Name         | Type   | Default | Required | Description                           |
| ------------ | ------ | ------- | -------- | ------------------------------------- |
| name         | String | ''      | false    | 显示的内容                                 |
| options      | Array  | []      | false    | 下拉选项源数据                               |
| defaultValue | Any    |         | false    | 初始值                                   |
| searchable   | Bool   | false   | false    | 是否支持筛选                                |
| autocomplete | Bool   | false   | false    | autocomplete模式                        |
| noResultText | String | '没有结果'  | false    | 数据源为空时显示                              |
| multiselect  | Bool   | false   | false    | 是否支持多选                                |
| displayKey   | String | 'name'  | false    | 下拉选项的显示内容                             |
| displayValue | String | 'value' | false    | 下拉选项显示内容的值                            |
| onChange     | Func   |         | false    | 点击选项的回调函数                             |
| onUpdate     | Func   |         | false    | 支持筛选时，通知父组件更新下拉选项数据源的回调函数             |
| onBlur       | Func   |         | false    | 支持autocomplete blur时，通知父组件用户输入的值的回调函数 |
