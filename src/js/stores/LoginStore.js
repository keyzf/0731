var Utils = require('radmin').Utils;
var StoreConfig = require('../config/StoreConfig');

// 创建store并设置要存储的数据名称
module.exports = Utils.createStore().register(StoreConfig.STORE_LOGIN_DATA);
