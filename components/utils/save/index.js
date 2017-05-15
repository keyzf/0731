'use strict'

var popupUtil = require('../../popup')
var clone = require('clone')

window.reactAdminSaveUtilCurrentPage = null

module.exports = {
  // 数据状态保存，用于未保存切换页面的提示
  stateDataObj: null,
  newStateDataObj: null,
  clear: true,
  // 初始状态入栈，刚保存完也要执行此函数
  pushSaveState: function pushSaveState (obj) {
    this.stateDataObj = clone(obj)
    this.newStateDataObj = clone(obj)
    this.clear = false
    reactAdminSaveUtilCurrentPage = this
  },
  // 任何状态变化都要入栈
  pushNewSaveState: function pushNewSaveState (obj) {
    if (!this.clear) {
      this.newStateDataObj = clone(obj)
    }
    reactAdminSaveUtilCurrentPage = this
    return this.hasSaveStateChange()
  },
  // 清除状态
  clearSaveState: function clearSaveState () {
    this.clear = true
    this.stateDataObj = null
    this.newStateDataObj = null
    reactAdminSaveUtilCurrentPage = null
  },
  hasSaveStateChange: function hasSaveStateChange () {
    return !this.eq(this.stateDataObj, this.newStateDataObj)
  },
  currentPageHasSaveChange: function currentPageHasSaveChange () {
    if (reactAdminSaveUtilCurrentPage) {
      return reactAdminSaveUtilCurrentPage.hasSaveStateChange()
    } else {
      return false
    }
  },
  currentPageClearState: function currentPageClearState () {
    if (reactAdminSaveUtilCurrentPage) {
      reactAdminSaveUtilCurrentPage.clearSaveState()
    }
  },
  eq: function eq (x, y) {
    if (x == null && y == null) {
      return true
    }
    if (x === y) {
      return true
    }
    if (!(x instanceof Object) || !(y instanceof Object)) {
      return false
    }
    if (x.constructor !== y.constructor) {
      return false
    }
    for (var p in x) {
      if (x.hasOwnProperty(p)) {
        if (!y.hasOwnProperty(p)) {
          return false
        }
        if (x[p] === y[p]) {
          continue
        }
        if (typeof x[p] !== 'object') {
          return false
        }
        if (!this.eq(x[p], y[p])) {
          return false
        }
      }
    }
    for (p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false
      }
    }
    return true
  }
}
