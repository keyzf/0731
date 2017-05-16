# 弹窗工具

- [popup](#popup)
- [alert](#alert)
- [prompt](#prompt)
- [confirm](#confirm)
- [image](#image)
- [qrcode](#qrcode)
- [nosave](#nosave)

### popup()

**popup([options])**

弹窗的基类，可以通过传type参数来指定弹窗类型.

Options:
- type (string): 弹窗类型(alert/prompt/confirm/image/qrcode/nosave，默认prompt)
- text (string): 弹窗正文显示的提示信息
- onConfirm (function): 确认按钮点击后调用函数
- onCancel (function): 取消按钮点击后调用函数
- onClose (function): 关闭按钮点击后调用函数

举例:

```js
var Utils = require('radmin').Utils;

Utils.popup({
	type: "alert",
	text: "您还没有登录",
	onConfirm: function(){
		//点击确定按钮的事件
	}
})

```

### alert()

**alert([options])**

弹窗工具.

`options`参数为可选的，如果是string类型就直接显示到text上，如果是object类型，就参照popup的option，其中type字段自动是alert


举例:

```js
var Utils = require('radmin').Utils;

Utils.alert("我是一个弹窗");
Utils.alert({
	text: "我是第二个弹窗",
	onConfirm: function(){
		//点击确定按钮的事件
	}
})
//以上两种用法等效

```

### prompt()

**prompt([options])**

提示框工具，2秒钟自动消失.

`options`参数为可选的，如果是string类型就直接显示到text上，如果是object类型，就参照popup的option，其中type字段自动是prompt


举例:

```js
var Utils = require('radmin').Utils;

Utils.prompt("我是一个提示");
Utils.prompt({
	text: "我是第二个提示",
	onConfirm: function(){
		//点击确定按钮的事件
	}
})
//以上两种用法等效

```

### confirm()

**confirm([options])**

确认弹窗工具，2秒钟自动消失.

`options`参数为可选的，如果是string类型就直接显示到text上，如果是object类型，就参照popup的option，其中type字段自动是confirm


举例:

```js
var Utils = require('radmin').Utils;

Utils.confirm("确认删除吗？");
Utils.confirm({
	text: "确认删除吗？",
	onConfirm: function(){
		//点击确定按钮的事件
	},
	onCancel: function(){
		//点击取消按钮事件
	}
})
//以上两种用法等效

```

### image()

**image([options])**

显示图片的弹层.

`options`参数为可选的，参数参照popup的option，其中type字段自动是image

Options:
- src (string): 图片地址
- onConfirm (function): 确认按钮点击后调用函数
- onCancel (function): 取消按钮点击后调用函数
- onClose (function): 关闭按钮点击后调用函数

举例:

```js
var Utils = require('radmin').Utils;

Utils.image({
	src: "http://appmedia.qq.com/media/h5e/loading/logo.png",
	onConfirm: function(){
		//点击确定按钮的事件
	},
	onCancel: function(){
		//点击取消按钮事件
	}
})

```

### qrcode()

**qrcode([options])**

二维码弹层

`options`参数为可选的，参数参照popup的option，其中type字段自动是qrcode

Options:
- value (string): 扫描二维码所对应的链接
- text (string): 显示在二维码下方的文字
- onConfirm (function): 确认按钮点击后调用函数
- onCancel (function): 取消按钮点击后调用函数
- onClose (function): 关闭按钮点击后调用函数

举例:

```js
var Utils = require('radmin').Utils;

Utils.qrcode({
	value: "http://www.qq.com",
	text: "扫描二维码打开QQ官网"
	onConfirm: function(){
		//点击确定按钮的事件
	},
	onCancel: function(){
		//点击取消按钮事件
	}
})

```

### nosave()

**nosave([options])**

页面编辑后，没保存信息弹出的提示

`options`参数为可选的，参数参照popup的option，其中type字段自动是nosave


举例:

```js
var Utils = require('radmin').Utils;

Utils.nosave("编辑的内容尚未保存，确定跳转吗");
Utils.nosave({
	text: "编辑的内容尚未保存，确定跳转吗？",
	onConfirm: function(){
		//点击确定按钮的事件
	},
	onCancel: function(){
		//点击取消按钮事件
	}
})
//以上两种用法等效

```
