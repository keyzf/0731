# Slider 滑动条

通过滑动方式选择值


## Props
| Name        | Type   | Default | Required | Description                  |
| ----------- | ------ | ------- | -------- | ---------------------------- |
| min         | Number | 0       | false    | 最小值，例：0                      |
| max         | Number | 100     | false    | 最大值，例：100                    |
| step        | Number | 1       | false    | 间隔，例：1                       |
| value       | Number |         | false    | 当前值，例：50                     |
| readonly    | Bool   | false   | false    | 只读，例：true                    |
| onChange    | Func   |         | false    | 值变化时回调，例：function(value) {}  |
| onStartDrag | Func   |         | false    | 开始拖拽时回调，例：function(value) {} |
| onEndDrag   | Func   |         | false    | 结束拖拽时回调，例：function(value) {} |
