# Ajax工具

- [ajax](#ajax)
- [setAjaxConfig](#setAjaxConfig)

### ajax()

**ajax([options])**


ajax请求工具.

为了方便jQuery的老用户使用Radmin框架，ajax工具的`options`参数跟[jQuery.ajax](http://api.jquery.com/jquery.ajax/)的参数一致。


举例:

```js
var Utils = require('radmin').Utils;

Utils.ajax({
	
})


```

### setAjaxConfig()

**setAjaxConfig([options])**

为ajax请求设置一些默认参数，这样就不用每次调用时候都写这些参数了.

Options:
- timeout (number): Ajax请求的最长时间(毫秒)
- type (string): 请求方式 get/post
- error (function) 出错处理
- beforeSuccess (function) 在success函数之前被调用，可以用来处理返回值，比如code值是101时候跳转登录

举例:

```js
var Utils = require('radmin').Utils;

Utils.setAjaxConfig({
	timeout: 30000,
	type：get,
	beforeSuccess: function(msg){
		if (msg.code != 0) {
			switch (msg.code) {
				case 101: {
				  // 服务器返回未登录code，则跳转登录
				  return;
				}
				default: {
				  Utils.prompt('msg.message');
				  return;
				}
			}
		}
		return msg;
	}
})
```