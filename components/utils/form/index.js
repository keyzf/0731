'use strict'

var clone = require('clone')

module.exports = {
  // 从Model到View或从View到Model数据结构的转换，一是深拷贝防止View数据被更改，二是Model和View数据结构往往不一致需要进行处理
  valueTransform: function valueTransform (infoStruct, name, transformCallback) {
    var infoStruct = clone(infoStruct)
    if (typeof transformCallback === 'function') {
      infoStruct[name] = transformCallback(infoStruct[name])
    }
    return infoStruct
  },
  // 对input[text]等生成能够自动绑定属性的onChange函数
  createInputHandler: function createInputHandler (infoStruct, name, eventProp) {
    var that = this
    return function (e) {
      if (typeof eventProp === 'undefined') {
        infoStruct[name] = e.target.value
      } else {
        infoStruct[name] = e.target[eventProp]
      }
      that.forceUpdate()
    }
  },
  // 将to包含的属性从from赋值
  passValue: function passValue (from, to) {
    var from = clone(from)
    for (var key in from) {
      if (typeof from[key] !== 'undefined' && typeof to[key] !== 'undefined') {
        to[key] = from[key]
      }
    }
  },
  // 删除数组中空项
  replaceEmptyItem: function replaceEmptyItem (arr) {
    return arr
  }
}
