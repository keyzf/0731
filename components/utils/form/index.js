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
  },
  //密码强度
  //pwdLvClass: ["empty", "rankLow", "rankMiddle", "rankHigh"],
  //pwdLvTips: [__("pwd_lv_tips_limit", "6-16个字符，不可以为9位以下纯数字"), __("pwd_lv_tips_weak", "弱：试试字母、数字、标点混搭"), __("pwd_lv_tips_medium", "中强：试试字母、数字、标点混搭"), __("pwd_lv_tips_strong", "强：请牢记您的密码"), __("pwd_lv_tips_weak_too_short", "弱：试试加长您的密码")],
  //pwdLvWording: ["", __("pwd_lv_wording_weak", "弱"), __("pwd_lv_wording_medium", "中强"), __("pwd_lv_wording_strong", "强")],
  getPasswordRank: function(value) {
    var n = 0;
    return value.match(/[a-z]/g) && n++,
    value.match(/[A-Z]/g) && n++,
    value.match(/[0-9]/g) && n++,
    value.match(/[^a-zA-Z0-9]/g) && n++,
        n = n > 3 ? 3 : n,
    (value.length < 6 || /^\d{1,8}$/.test(value)) && (n = 0),
    value.length < 8 && n > 1 && (n = 1),
        n
  },
}
