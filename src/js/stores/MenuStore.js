var Utils = require('radmin').Utils
var StoreConfig = require('../config/StoreConfig')
var NavigatorConfig = require('../config/NavigatorConfig')
var MenuStore = Utils.createStore()

// 由于有复杂逻辑要处理，这里自定义此存储数据的存储过程，没有使用store自带的通用方法addDataName
// MenuStore.addDataName()

Utils.registerStore(function (event) {
  switch (event.type) {
    case StoreConfig.STORE_MENU_DATA:
      // 客户端全部功能配置表
      var navigatorConfig = NavigatorConfig

      // 服务器返回的权限数据，使用serverAuthorization对navigatorConfig进行过滤
      var serverAuthorization = event.data

      // TODO:根据serverAuthorization去更改navigatorConfig的值，看哪些页面是开放的

      // 权限过滤后的客户端功能配置表，存入store
      MenuStore.setData(StoreConfig.STORE_MENU_DATA, navigatorConfig)
      // 通知store已变化
      MenuStore.emitChange()
      break
    default:
      break
  }
})

module.exports = MenuStore
