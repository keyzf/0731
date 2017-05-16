# 基础工具

- [cookie](#cookie)
- [getUrlVar](#getUrlVar)
- [deleteUrlVar](#deleteUrlVar)
- [jump](#jump)

### cookie()

**cookie(name, [value], [options])**


读取或者写入Cookie.

`value`参数为可选的，如果是空就是读某项Cookie值，非空就是写入该项Cookie值

Options:
- expires (number): Cookie的过期时间

举例:

```js
var Utils = require('radmin').Utils;

Utils.cookie("name", "123")
var value = Utils.cookie("name"); //123

```

### getUrlVar()

**getUrlVar(name, [url])**


用url上读取给定的参数值.

`url`参数为可选的，如果是null则默认获取当前页面的url


举例:

```js
var Utils = require('radmin').Utils;

var value = Utils.getUrlVar("name") //返回url上面参数name的值

```

### deleteUrlVar()

**deleteUrlVar(name, [url])**


删除url上对应擦参数的key-value值.

`url`参数为可选的，如果是null则默认获取当前页面的url


举例:

```js
var Utils = require('radmin').Utils;

Utils.deleteUrlVar("name") // 将url上name参数删除

```

### jump()

**jump(url)**


跳转到`url`链接对应的页面，可以是hash参数对应的相对路径也可以是绝对路径

举例:

```js
var Utils = require('radmin').Utils;

Utils.jump("#admin") // 页面跳转到admin页面上

```