// 工具类对外接口
'use strict';

var Utils = {
  // 类
  CommonUtil: require('./common'),
  ConfigUtil: require('./config'),
  FormUtil: require('./form'),
  LoginUtil: require('./login'),
  PopupUtil: require('./popup'),
  SaveUtil: require('./save'),
  StoreUtil: require('./store'),
  AjaxUtil: require('./ajax'),
  // 快捷方法
  ajax: require('./ajax').ajax,
  getLoginFlag: require('./ajax').getLoginFlag,
  initLogin: require('./ajax').initLogin,
  setLoginConfig: require('./config').setLoginConfig,
  setAjaxConfig: require('./config').setAjaxConfig,
  combineConfig: require('./config').combineConfig,
  redirect: require('./common').redirect,
  getRandomString: require('./common').getRandomString,
  alert: require('./popup').alert,
  prompt: require('./popup').prompt,
  confirm: require('./popup').confirm,
  createStore: require('./store').create,
  saveToStore: require('./store').dispatch,
  registerStore: require('./store').register
};

module.exports = Utils;