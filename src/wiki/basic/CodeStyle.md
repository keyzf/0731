#编程风格

Radmin基于ES5标准，但是ES6/ES5均可在项目中使用，这取决于项目开发者的能力。
为了保证代码的可读性和可维护性，Radmin希望开发者遵循如下的代码风格

##命名

* 文件名：文件名使用[Pascal命名法](https://zh.wikipedia.org/wiki/%E5%B8%95%E6%96%AF%E5%8D%A1%E5%91%BD%E5%90%8D%E6%B3%95)。 例如： ReservationCard.js
* 组件命名：组件名称应该和文件名一致，例如：ReservationCard.js 应该有一个ReservationCard的引用名称
* 函数命名：非react原生的自定义函数，用`_`下划线开头来加以区别

## 代码函数和属性排序

  `React.createClass`的属性&函数顺序：

* `propTypes`
* `getDefaultProps`
* `getInitialState`
* `componentWillMount`
* `componentDidMount`
* `componentWillUnmount`
* `componentWillReceiveProps`
* `shouldComponentUpdate`
* `componentWillUpdate`
* `componentDidUpdate`
* *点击回调或者事件回调* 比如 `_onClickSubmit()` 或者 `_onChangeDescription()`
* *`render`函数中的 getter 方法* 比如 `_getSelectReason()` 或者 `_getFooterContent()`
* *可选的 render 方法* 比如 `_renderNavigation()` 或者 `_renderProfilePicture()`
* `render`

## require顺序
```js
// 首先引入react和第三方的npm包
var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

// 第二步引入radmin代码包
var Utils = require('radmin').Utils;

// 第三部引入项目相关内容，比如配置文件,Action类，Store类等等
var RouteConfig = require('./config/RouteConfig');
var FilterConfig = require('./config/FilterConfig');
var ExampleAction = require('../../actions/ExampleAction');
var ExampleStore = require('../../stores/ExampleStore');

// 如果需要less文件，放在最后面
var style = require('../less/app.less');

// 组件内容
module.exports = React.createClass({
...
})
```
