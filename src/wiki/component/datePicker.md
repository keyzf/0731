# DatePicker 日期选择器

用于选择日期


## Props
| Name           | Type   | Default    | Required | Description                                                                 |
| -------------- | ------ | ---------- | -------- | --------------------------------------------------------------------------- |
| name           | Any    |            | false    | 默认显示的提示文字，例：'请选择'                                                           |
| date           | Any    |            | false    | 默认选中的日期，例：'2016-01-01'                                                      |
| minDate        | Any    |            | false    | 可选日期最小值，例：new Date(date.getFullYear() - 1, date.getMonth(), date.getDate()) |
| maxDate        | Any    |            | false    | 可选日期最大值，例：new Date()                                                        |
| format         | String |            | false    | 日期格式，例：'YYYY-MM-DD'                                                         |
| view           | String | 'day'      | false    | 显示界面，默认为'day'，只显示月为'month'，只显示年为'year'，例：'day'                              |
| showClose      | Bool   | true       | false    | 显示清除按钮，例：true                                                               |
| showTime       | Bool   | false      | false    | 是否显示时间(时、分、秒）控制器，例：true                                                     |
| fixedHour      | Bool   | false      | false    | 是否固定小时，例：false                                                              |
| fixedMinute    | Bool   | false      | false    | 是否固定分钟，例：false                                                              |
| fixedSecond    | Bool   | false      | false    | 是否固定秒，例：false                                                               |
| left           | Number | 0          | false    | 横坐标位置偏移                                                                     |
| calendarWidth  | Number | 273        | false    | 日历样式宽度，不建议修改                                                                |
| calendarHeight | Number | 370        | false    | 日历样式高度，不建议修改                                                                |
| showTimeHeight | Number | 175        | false    | 时间组件样式高度，不建议修改                                                              |
| defaultTime    | String | '00:00:00' | false    | 默认显示的时间                                                                     |
| onChange       | Func   |            | false    | 选中回调，例：funciton(date) {}                                                    |
