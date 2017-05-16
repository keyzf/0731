# Popup 弹窗

标准弹出框，一般作为自定义弹出框的基础组件


## Props
| Name              | Type    | Default | Required | Description                                 |
| ----------------- | ------- | ------- | -------- | ------------------------------------------- |
| title             | Any     | ''      | false    | 弹窗左上角标题，例：'添加项目'                            |
| showConfirm       | Bool    | true    | false    | 是否显示确定按钮，例：true                             |
| showCancel        | Bool    | true    | false    | 是否显示取消按钮，例：true                             |
| textConfirm       | String  | '确定'    | false    | 确定按钮的文本信息，例：'确定'                            |
| textCancel        | String  | '取消'    | false    | 取消按钮的文本信息，例：'取消'                            |
| maxContentHeight  | Number  |         | false    | 中间内容部分的最大高度，超出最大高度会显示滚动条，例：400              |
| foot              | Element |         | false    | 自定义底部元素内容，例<div></div>                      |
| layout            | Bool    | true    | false    | 弹窗中间内容部分是否使用默认样式，当false时使用children内容，例：true |
| overlayClose      | Bool    | false   | false    | 是否点击空白处关闭，例：false                           |
| onConfirm         | Func    |         | false    | 点击确定按钮回调，例：function() {}                    |
| onCancel          | Func    |         | false    | 点击取消按钮回调，例：function() {}                    |
| onClose           | Func    | null    | false    | 点击关闭按钮回调，例：function() {}                    |
| preventWheelEvent | Bool    | true    | false    | 是否阻止滚轮事件向下传递，例：true                         |
