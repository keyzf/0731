# Time 时间选择器

用于选择日期


## Props
| Name        | Type   | Default | Required | Description                         |
| ----------- | ------ | ------- | -------- | ----------------------------------- |
| value       | String | null    | false    | 时间值，例：'09:10:10'                    |
| fixedHour   | Bool   | false   | false    | 是否固定小时，例：false                      |
| fixedMinute | Bool   | false   | false    | 是否固定分钟，例：false                      |
| fixedSecond | Bool   | false   | false    | 是否固定秒，例：false                       |
| readonly    | Bool   | false   | false    | 只读，例：true                           |
| onChange    | Func   |         | false    | 时间改变的回调函数，例：function(timeString) {} |
