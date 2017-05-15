'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Config = require('../config');
var reqwest = require('reqwest');
var assign = require('object-assign');

var ajaxConfig = null;

var AjaxUtil = {
  setConfig: function setConfig(config) {
    ajaxConfig = config;
  },
  status: {},
  getStatus: function getStatus(name) {
    return AjaxUtil.status[name];
  },
  ajax: function ajax(param, disableAjaxConfig) {
    var self = this;
    param.timeout = param.timeout || ajaxConfig.timeout || 10000;
    param.type = param.type || ajaxConfig.type || 'get';
    param.headers = param.headers || ajaxConfig.headers || null;
    param.dataType = param.dataType || ajaxConfig.dataType || 'text';

    param.data = param.data || {};
    param.data = assign({}, ajaxConfig.data, param.data);
    if (param.statusType) AjaxUtil.status[param.statusType] = 0; // 未请求
    var success = param.success;
    if (_typeof(param.url) == 'object') {
      // mock数据
      success(param.url);
      return;
    }

    var error = param.error || ajaxConfig.error || function (msg) {
      console.info(msg);
    };

    param.error = function () {
      if (param.statusType) AjaxUtil.status[param.statusType] = 3; // 请求失败
      error();
    };

    param.success = function (res) {
      var msg = res;
      if (param.dataType === 'text') {
        msg = res.response;
      }

      if (!disableAjaxConfig && ajaxConfig && typeof ajaxConfig.dataFilter === 'function') {
        msg = ajaxConfig.dataFilter(msg, param.dataType);
      }
      if (msg.code) {
        if (param.statusType) AjaxUtil.status[param.statusType] = 3; // 请求失败
      } else {
        if (param.statusType) AjaxUtil.status[param.statusType] = 2; // 请求成功
      }
      if (!disableAjaxConfig && ajaxConfig && typeof ajaxConfig.beforeSuccess === 'function') {
        msg = ajaxConfig.beforeSuccess(msg, param.beforeSuccess);
        if (typeof msg != 'undefined') {
          if (typeof success === 'function') {
            success(msg);
          }
        }
      } else {
        if (typeof success === 'function') {
          success(msg);
        }
      }
    };
    if (param.statusType) AjaxUtil.status[param.statusType] = 1; // 请求中
    return reqwest.compat(param);
  }
};
module.exports = AjaxUtil;