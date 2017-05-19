'use strict';

var Config = require('../config');
var reqwest = require('reqwest');
var Assign = require('object-assign');
var Loading = require('../loading');
var ajaxConfig = null;

var AjaxUtil = {
  setConfig: function setConfig (config) {
    ajaxConfig = config
  },
  status: {},
  getStatus: function (name) {
    return AjaxUtil.status[name]
  },
  ajax: function (param, disableAjaxConfig) {
    var self = this;
    param.timeout = param.timeout || ajaxConfig.timeout || 10000;
    param.type = param.type || ajaxConfig.type || 'get';
    param.headers = param.headers || ajaxConfig.headers || null;
    param.dataType = param.dataType || ajaxConfig.dataType || 'text';
    param.hasLoading = param.hasLoading||false;
    param.contentType = param.contentType || ajaxConfig.contentType || 'application/x-www-form-urlencoded';

    if(param.url&&param.url.indexOf('mock/') != -1){//mock数据专用 zee 20170324
      param.type = 'get';
    }

    if(param.contentType == 'application/json'){//zee add for application/json
      param.data = param.data?JSON.stringify(param.data):'{}';
    }else{
      param.data = Assign({}, ajaxConfig.data, param.data||{});
    }

    if (param.statusType){
      AjaxUtil.status[param.statusType] = 0; // 未请求
    }
    var success = param.success;
    if (typeof param.url == 'object') {
      // mock数据
      success(param.url);
      return
    }

    var error = param.error || ajaxConfig.error || function (msg) {
      console.info(msg)
    };

    param.error = function (msg) {
      if (param.statusType){
        AjaxUtil.status[param.statusType] = 3; // 请求失败
      }
      error(msg);
      Loading.destroy();
    };

    param.success = function (res) {
      var msg = res;
      if (param.dataType === 'text') {
        msg = res.response
      }

      if (!disableAjaxConfig && ajaxConfig && typeof ajaxConfig.dataFilter === 'function') {
        msg = ajaxConfig.dataFilter(msg, param.dataType);
      }
      if (msg.code) {
        if (param.statusType){
          AjaxUtil.status[param.statusType] = 3; // 请求失败
        }
      } else {
        if (param.statusType){
          AjaxUtil.status[param.statusType] = 2; // 请求成功
        }
        Loading.destroy();
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
    if (param.statusType){
      AjaxUtil.status[param.statusType] = 1; // 请求中
      param.hasLoading&&Loading.show();
    }
    return reqwest.compat(param);
  },

  postFormData: function (param) {
    if (!window.FormData || !param.data instanceof FormData) {
      console.log('该接口仅支持FormData');
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('post', param.url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          typeof param.success === 'function' && param.success(data);
        } catch (e) {
          typeof param.error === 'function' && param.error();
        }
      } else {
        typeof param.error === 'function' && param.error();
      }
    };
  }
};
module.exports = AjaxUtil;
