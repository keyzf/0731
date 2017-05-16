# Tabs 页签

用于切换不同显示内容


## Props
| Name     | Type   | Default | Required | Description               |
| -------- | ------ | ------- | -------- | ------------------------- |
| active   | Number | 0       | false    | 激活页签索引，例：1                |
| vertical | Bool   | false   | false    | 是否竖向，例：false              |
| autoplay | Number |         | false    | 自动播放间隔，不设置为不自动播放，例：3000   |
| onChange | Func   |         | false    | 切换回调，例：function(index) {} |
| onAdd    | Func   |         | false    | 新增页签，例：function(index) {} |
| onDelete | Func   |         | false    | 删除页签，例：function(index) {} |
