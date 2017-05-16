#数据存储工具

- [createStore](#createStore)
- [registerStore](#registerStore)
- [saveToStore](#saveToStore)


### createStore()

**createStore()**

创建一个store对象


举例:

```js
var Utils = require('radmin').Utils;

var ExampleStore = Utils.createStore();

```

### registerStore

**registerStore(func)**

设置要存储的数据名称


举例:

```js
var Utils = require('radmin').Utils;

Utils.registerStore(function(event) {
  switch(event.type) {
    case StoreConfig.STORE_MENU_DATA:
      var navigatorConfig = NavigatorConfig;
     
      MenuStore.setData(StoreConfig.STORE_MENU_DATA, navigatorConfig);
      MenuStore.emitChange();
      break;
    default:
      break;
  }
});

```

### saveToStore()

**saveToStore(option)**

把数据保存到对应的store中，调用saveToStore以后自动触发view中注册数据的改变

Options:
- type (string): 已经定义好的数据名
- data (obj): 需要保存的数据

举例:

```js
var Utils = require('radmin').Utils;

Utils.saveToStore({
	type: StoreConfig.STORE_EXAMPLE_FORM_DATA,
	data: msg.data
})

```
