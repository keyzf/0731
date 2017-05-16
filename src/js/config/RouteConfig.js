var React = require('react')

var App = require('../layout/default/App')
var AppNew = require('../layout/new/App')

var BaseIndex = require('../pages/base/Index')

var Button = require('../pages/component/Button/Index')
var Input = require('../pages/component/Input/Index')
var Select = require('../pages/component/Select/Index')
var Radio = require('../pages/component/Radio/Index')
var CheckBox = require('../pages/component/CheckBox/Index')
var Switch = require('../pages/component/Switch/Index')
var Slider = require('../pages/component/Slider/Index')
var Swiper = require('../pages/component/Swiper/Index')
var Form = require('../pages/component/Form/Index')
var Table = require('../pages/component/Table/Index')
var Chart = require('../pages/component/Chart/Index')
var Modal = require('../pages/component/Modal/Index')
var Prompt = require('../pages/component/Prompt/Index')
var ToolTip = require('../pages/component/ToolTip/Index')
var DatePicker = require('../pages/component/DatePicker/Index')
var ClipBoard = require('../pages/component/ClipBoard/Index')
var Tabs = require('../pages/component/Tabs/Index')
var Tags = require('../pages/component/Tags/Index')
var TreeSelect = require('../pages/component/TreeSelect/Index')
var Navigator = require('../pages/component/Navigator/Index')
var Spin = require('../pages/component/Spin/Index')
var Iconfont = require('../pages/component/Iconfont/Index')
var RichEditor = require('../pages/component/RichEditor/Index')
var VerificationCode = require('../pages/component/VerificationCode/Index')

var Ajax = require('../pages/func/Ajax')
var Login = require('../pages/func/Login')
var Param = require('../pages/func/Param')
var Layout = require('../pages/func/Layout')
var Style = require('../pages/func/Style')
var Route = require('../pages/func/Route')
var Filter = require('../pages/func/Filter')
var Multipage = require('../pages/func/Multipage')
var Tool = require('../pages/func/Tool')

var Error404 = require('../layout/default/404')

/**路由地址和对应的页面
 *
 * 当多个path指向同一个page的相同实例时，希望在这几种path切换时页面不会重新加载，尤其适用于同一页面不同路由参数的情况，写法如下：
 * {path: '/', page: UiBase},
 * {path: '/ui/base', page: UiBase},
 * {path: '/ui/base/:pid', page: UiBase},

 * 当多个path指向同一个page的不同实例时，虽然两个页面内容相同但逻辑上认为是不同页面，切换时内容会被重置，写法如下：
 * {path: '/', page: UiBase},
 * {path: '/ui/base', page: UiBase, clone: true},
 */
module.exports = [
  {path: '/', page: BaseIndex, layout: App},

  {path: '/component', page: Button, layout: App},
  {path: '/component/button', page: Button, layout: App},
  {path: '/component/input', page: Input, layout: App},
  {path: '/component/select', page: Select, layout: App},
  {path: '/component/radio', page: Radio, layout: App},
  {path: '/component/checkbox', page: CheckBox, layout: App},
  {path: '/component/switch', page: Switch, layout: App},
  {path: '/component/slider', page: Slider, layout: App},
  {path: '/component/form', page: Form, layout: App},
  {path: '/component/table', page: Table, layout: App},
  {path: '/component/chart', page: Chart, layout: App},
  {path: '/component/modal', page: Modal, layout: App},
  {path: '/component/prompt', page: Prompt, layout: App},
  {path: '/component/tooltip', page: ToolTip, layout: App},
  {path: '/component/datepicker', page: DatePicker, layout: App},
  {path: '/component/clipboard', page: ClipBoard, layout: App},
  {path: '/component/tabs', page: Tabs, layout: App},
  {path: '/component/tags', page: Tags, layout: App},
  {path: '/component/treeselect', page: TreeSelect, layout: App},
  {path: '/component/navigator', page: Navigator, layout: App},
  {path: '/component/navigator/2', page: Navigator, layout: App},
  {path: '/component/navigator/3', page: Navigator, layout: App},
  {path: '/component/spin', page: Spin, layout: App},
  {path: '/component/swiper', page: Swiper, layout: App},
  {path: '/component/iconfont', page: Iconfont, layout: App},
  {path: '/component/richeditor', page: RichEditor, layout: App},
  {path: '/component/verificationcode', page: VerificationCode, layout: App},

  {path: '/func', page: Ajax, layout: App},
  {path: '/func/ajax', page: Ajax, layout: App},
  {path: '/func/login', page: Login, layout: App},
  {path: '/func/param', page: Param, layout: App},
  {path: '/func/param/:p1', page: Param, layout: App},
  {path: '/func/param/:p1/:p2', page: Param, layout: App},
  {path: '/func/layout', page: Layout, layout: App},
  {path: '/func/layout-new', page: Layout, layout: AppNew},
  {path: '/func/layout-none', page: Layout, layout: null},
  {path: '/func/style', page: Style, layout: App},
  {path: '/func/route', page: Route, layout: App},
  {path: '/func/filter', page: Filter, layout: App},
  {path: '/func/multipage', page: Multipage, layout: App},
  {path: '/func/tool', page: Tool, layout: App},

  {path: '*', page: null, layout: Error404}
]

module.exports.defaultLayout = App
