var Utils = require('radmin').Utils
var UrlConfig = require('../config/UrlConfig')
var StoreConfig = require('../config/StoreConfig')

module.exports = {
  getQqCom: function() {
    Utils.ajax({
      url: UrlConfig.QqCom,
      data: {},
      statusType: StoreConfig.STORE_QQ_COM_DATA,
      success: function(msg) {
        var data = msg.data;
        
        //将数据存入Store
        Utils.saveToStore({
          type: StoreConfig.STORE_QQ_COM_DATA,
          data: {
            count: data.length,
            list: data
          }
        });
      },
      error: function(msg) {
      }
    });
  },
  getTableAjax: function(limit, index) {
    Utils.ajax({
      url: UrlConfig.getTable,
      data: {limit: limit, index: index},
      success: function(msg) {
        //一般情况下使用后端分页比较方便，这里为了便于展示，使用了前端分页

        //因为使用假数据时数据是固定的，所以这里模拟了后端分页的代码
        var data = msg.data;
        var list = [];
        for (var i = index; i < Math.min(index + limit, data.length); i++) {
          list.push(data[i]);
        }
        //将数据存入Store
        Utils.saveToStore({
          type: StoreConfig.STORE_TABLE_AJAX_DATA,
          data: {
            count: data.length,
            list: list
          }
        });
      },
      error: function(msg) {
      }
    });
  },
  getTableStatic: function() {
    Utils.ajax({
      url: UrlConfig.getTable,
      data: {},
      success: function(msg) {
        var data = msg.data;
        
        //将数据存入Store
        Utils.saveToStore({
          type: StoreConfig.STORE_TABLE_STATIC_DATA,
          data: {
            count: data.length,
            list: data
          }
        });
      },
      error: function(msg) {
      }
    });
  },
  getInfo: function() {
    Utils.ajax({
      url: UrlConfig.getInfo,
      data: {},
      success: function (msg) {
        Utils.saveToStore({
          type: StoreConfig.STORE_INFO_DATA,
          data: msg.data
        })
      },
      error: function (msg) {}
    })
  },
  setInfo: function(callback) {
    Utils.ajax({
      url: UrlConfig.setInfo,
      data: {},
      success: function (msg) {
        if (typeof callback === 'function') {
          callback()
        }
      },
      error: function (msg) {}
    })
  }
}
