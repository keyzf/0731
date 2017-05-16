var CoreFilter = require('../filters/CoreFilter')
// var LoginFilter = require('../filters/LoginFilter')
var LayoutFilter = require('../filters/LayoutFilter')

// 设置要执行的filter及执行顺序
// 从上到下执行，再从下到上执行，具体顺序依赖于context.execute()在filter中的位置
module.exports = [
  // LoginFilter,
  CoreFilter,
  LayoutFilter // 负责将当前要渲染的page放入layout中
]
