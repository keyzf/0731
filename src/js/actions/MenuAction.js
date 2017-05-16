var Utils = require('radmin').Utils
var UrlConfig = require('../config/UrlConfig')
var StoreConfig = require('../config/StoreConfig')

module.exports = {
  // 这里可以从接口读取权限，再存入store中，MenuStore的存储过程是自定义的，详见MenuStore
  getMenu: function (callback) {
    Utils.ajax({
      url: UrlConfig.getMenu,
      data: {},
      success: function (msg) {
        Utils.saveToStore({
          type: StoreConfig.STORE_MENU_DATA,
          data: msg.data
        })
        if (typeof callback === 'function') {
          callback()
        }
      },
      error: function (msg) {}
    })
  }
}
