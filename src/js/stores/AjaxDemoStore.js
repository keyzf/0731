var Utils = require('radmin').Utils;
var StoreConfig = require('../config/StoreConfig');

// 创建store并设置要存储的数据名称
// 创建store
var AjaxDemoStore = Utils.createStore();

// 设置要存储的数据名称
AjaxDemoStore.register(StoreConfig.STORE_TABLE_AJAX_DATA);
AjaxDemoStore.register(StoreConfig.STORE_TABLE_STATIC_DATA);

AjaxDemoStore.register(StoreConfig.STORE_INFO_DATA);

module.exports = AjaxDemoStore;
