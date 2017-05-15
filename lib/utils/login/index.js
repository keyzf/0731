'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var CommonUtil = require('../common');
var AjaxUtil = require('../ajax');
var ApiCallUtil = require('./apiCall');
var LoginChooser = require('../../loginChooser');

module.exports = {
  oa: {
    appKey: '38e6140edf2a43c5b258dd6ec6ae1034',
    sysId: '23781',
    tamsId: '11111',
    devTamsId: '11111', // 如果tamsId等于此值，则使用OA测试环境
    proTamsId: '631007129', // OA正式环境tamsId
    loginUrl: 'http://login.oa.com/modules/passport/signin.ashx',
    logoutUrl: 'http://login.oa.com/modules/passport/signout.ashx',
    // 测试环境要配host：10.123.9.28 passtest.oa.com
    loginUrlTest: 'http://passtest.oa.com/modules/passport/signin.ashx',
    logoutUrlTest: 'http://passtest.oa.com/modules/passport/signout.ashx',
    // 测试环境要配host：10.123.8.25 labs.api.act.qq.com
    getAuth: 'http://labs.api.act.qq.com/'
  },
  qq: {
    appId: 4007203,
    daid: ''
  },
  qc: {
    appId: '',
    redirectUri: ''
  },
  // ***************这几个方法放在工具中只是为了方便外部调用****************************
  loginMode: null,
  currentLoginMode: null,
  redirectNotLoginPage: false,
  // 设置登录方式
  setLoginMode: function setLoginMode(mode) {
    this.loginMode = mode ? mode.toLowerCase() : mode;
  },
  getLoginMode: function getLoginMode() {
    return this.loginMode;
  },
  // 当前使用的登录方式（如果已经登录）
  setCurrentLoginMode: function setCurrentLoginMode(mode) {
    this.currentLoginMode = mode;
  },
  getCurrentLoginMode: function getCurrentLoginMode() {
    return this.currentLoginMode;
  },
  // OA登录配置，调用此方法后将使用OA正式环境
  setOAConfig: function setOAConfig(config) {
    for (var key in config) {
      this.oa[key] = config[key];
    }
    this.oa.tamsId = this.oa.proTamsId;
  },
  setQQConfig: function setQQConfig(config) {
    for (var key in config) {
      this.qq[key] = config[key];
    }
  },
  setQCConfig: function setQCConfig(config) {
    for (var key in config) {
      this.qc[key] = config[key];
    }
  },
  setRedirectNotLoginPage: function setRedirectNotLoginPage(redirect) {
    this.redirectNotLoginPage = redirect;
  },
  getRedirectNotLoginPage: function getRedirectNotLoginPage() {
    return this.redirectNotLoginPage;
  },
  // ***********************************************************************************
  isOALogin: function isOALogin() {
    if (CommonUtil.cookie('TCOA_TICKET')) {
      // 验证oa登录，cookie里拿ticket
      return true;
    } else if (CommonUtil.getUrlVar('ticket')) {
      // 验证oa登录，url上拿ticket
      CommonUtil.cookie('TCOA_TICKET', CommonUtil.getUrlVar('ticket'));
      var url = window.location.href;

      url = CommonUtil.deleteUrlVar('ticket', url);
      url = CommonUtil.deleteUrlVar('lengh', url);
      url = CommonUtil.deleteUrlVar('length', url);
      url = CommonUtil.deleteUrlVar('loginParam', url);
      url = CommonUtil.deleteUrlVar('sessionKey', url);

      window.location.href = url;
      return true;
    }
    return false;
  },
  isQQLogin: function isQQLogin() {
    var uin = CommonUtil.cookie('uin');
    var skey = CommonUtil.cookie('skey');
    return uin && uin.length > 4 && skey && skey.length > 0;
  },
  isQCLogin: function isQCLogin(callback) {
    return QC.Login.check();
  },
  getOALoginData: function getOALoginData(callback) {
    if (typeof this.oa.userInfoUrl === 'undefined' || this.oa.userInfoUrl == null || this.oa.userInfoUrl === '') {
      var that = this;
      window.ApiCall = ApiCallUtil;
      var host = window.location.host;
      var ticket = CommonUtil.cookie('TCOA_TICKET');
      ApiCallUtil.setTamsId(that.oa.tamsId);
      ApiCallUtil.libCall({
        type: 'GET', // 调用方式：GET/POST
        url: that.oa.getAuth + that.oa.tamsId + '/oa/auth',
        data: {
          ticket: ticket,
          appkey: this.oa.appKey,
          sysid: this.oa.sysId
        }, // 接口参数
        dataType: 'json', // 返回格式：xml，json
        error: function error() {},
        success: function success(r) {
          if (r.code != 0) {
            // oa验证未通过
          } else {
            // oa验证通过
            CommonUtil.cookie('TCOA_COMPLETE', 1);
          }

          if (typeof callback === 'function') {
            callback(r);
          }
        }
      });
    } else {
      AjaxUtil.ajax({
        url: this.oa.userInfoUrl,
        type: 'get',
        dataType: 'json',
        success: function success(r) {
          if (r.code != 0) {
            // oa验证未通过
          } else {
            // oa验证通过
            CommonUtil.cookie('TCOA_COMPLETE', 1);
          }

          if (typeof callback === 'function') {
            callback(r);
          }
        },
        error: function error(msg) {}
      });
    }
  },
  getQQLoginData: function getQQLoginData(callback) {
    if (typeof this.qq.userInfoUrl === 'undefined' || this.qq.userInfoUrl == null || this.qq.userInfoUrl === '') {
      var that = this;
      window.ApiCall = ApiCallUtil;
      var host = window.location.host;
      ApiCallUtil.setTamsId(that.oa.tamsId);
      ApiCallUtil.libCall({
        type: 'GET', // 调用方式：GET/POST
        url: that.oa.getAuth + that.oa.tamsId + '/user/get_info?attrs=qq|nickname|head',
        dataType: 'json', // 返回格式：xml，json
        error: function error() {},
        success: function success(r) {
          if (r.code != 0) {
            // qq验证未通过
          } else {
              // qq验证通过
            }

          if (typeof callback === 'function') {
            callback(r);
          }
        }
      });
    } else {
      AjaxUtil.ajax({
        url: this.qq.userInfoUrl,
        type: 'get',
        dataType: 'json',
        success: function success(r) {
          if (typeof callback === 'function') {
            callback(r);
          }
        },
        error: function error(msg) {}
      });
    }
  },
  getQCLoginData: function getQCLoginData(callback) {
    QC.api('get_user_info', {}).success(function (r) {
      if (typeof callback === 'function') {
        callback(r);
      }
    });
  },
  getQCAccessTokenAndOpenId: function getQCAccessTokenAndOpenId(callback) {
    QC.Login.getMe(function (openId, accessToken) {
      if (typeof callback === 'function') {
        callback(openId, accessToken);
      }
    });
  },
  normalLogin: function normalLogin(url) {
    this.deleteNormalTicket();

    url = url || window.location.href || 'http://' + window.location.host;
    url = url.replace(/(\?|&)_k=.*$/i, '');

    window.location.href = '/#/login';
  },
  deleteNormalTicket: function deleteNormalTicket() {
    CommonUtil.cookie('normal_login', '', -1);
  },
  isNormalLogin: function isNormalLogin() {
    if (CommonUtil.cookie('normal_login')) {
      // 验证oa登录，cookie里拿ticket
      return true;
    }
    return false;
  },
  normalLogout: function normalLogout(callback, url) {
    CommonUtil.cookie('normal_login', '', -1);
    typeof callback === 'function' && callback();
  },
  oaLogin: function oaLogin(url) {
    this.deleteOATicket();

    url = url || window.location.href || 'http://' + window.location.host;
    url = url.replace(/(\?|&)_k=.*$/i, '');

    window.location.href = (this.oa.tamsId == this.oa.devTamsId ? this.oa.loginUrlTest + '?' : this.oa.loginUrl + '?appKey=' + this.oa.appKey + '&') + 'url=' + encodeURIComponent(url);
  },
  oaLogout: function oaLogout(callback, url) {
    this.deleteOATicket();

    if (typeof callback === 'function') {
      callback();
    }

    url = url || window.location.href || 'http://' + window.location.host;
    url = url.replace(/(\?|&)_k=.*$/i, '');

    try {
      var logoutUrl = (this.oa.tamsId == this.oa.devTamsId ? this.oa.logoutUrlTest + '?' : this.oa.logoutUrl + '?appKey=' + this.oa.appKey + '&') + 'url=' + encodeURIComponent(url);
      AjaxUtil.ajax({
        url: logoutUrl,
        type: 'get',
        dataType: 'jsonp',
        success: function success(msg) {
          console.info('oa logout complete');
        },
        error: function error(msg) {
          console.info('oa logout complete');
        }
      });
    } catch (e) {}
  },
  deleteOATicket: function deleteOATicket() {
    CommonUtil.cookie('TCOA_TICKET', '', -1);
  },
  qqLogin: function qqLogin(url) {
    var that = this;
    var fromUrl = window.location.href;
    console.info(fromUrl);
    var onScriptLoad = function onScriptLoad() {
      window.pt.setParams({
        'appid': that.qq.appId,
        'daid': that.qq.daid,
        's_url': url || fromUrl,
        'style': that.qq.style || 20,
        'protocol': that.qq.protocol || 'http:',
        'domain': that.qq.domain || 'qq.com',
        'border_radius': that.qq.border_radius || 1,
        'target': that.qq.target || 'top',
        'maskOpacity': that.qq.maskOpacity || 40
      });
      window.pt.showPtui();
    };
    if (window.pt) {
      onScriptLoad();
      return;
    }
    var node = document.createElement('script');
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    node.src = 'http://xui.ptlogin2.qq.com/js/ptlogin_v1.js';
    node.addEventListener('load', onScriptLoad, false);
    // node.addEventListener('load', onScriptError, false)
    document.getElementsByTagName('head')[0].appendChild(node);
  },
  qqLogout: function qqLogout(callback, url) {
    var that = this;
    var onScriptLoad = function onScriptLoad() {
      window.pt.setParams({
        'appid': that.qq.appId,
        'daid': that.qq.daid,
        's_url': url || 'http://' + window.location.host,
        'style': 20,
        'protocol': 'http:',
        'domain': 'qq.com',
        'border_radius': 1,
        'target': 'top',
        'maskOpacity': 40
      });
      window.pt.logout(callback);
    };
    if (window.pt) {
      onScriptLoad();
      return;
    }
    var node = document.createElement('script');
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    node.src = 'http://xui.ptlogin2.qq.com/js/ptlogin_v1.js';
    node.addEventListener('load', onScriptLoad, false);
    // node.addEventListener('load', onScriptError, false)
    document.getElementsByTagName('head')[0].appendChild(node);
  },
  selectLoginMode: function selectLoginMode(oaLoginCallback, qqLoginCallback) {
    var that = this;
    var div = document.createElement('div');
    document.body.appendChild(div);
    var close = function close() {
      ReactDom.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    };
    var oaLogin = function oaLogin() {
      close();
      if (typeof oaLoginCallback === 'function') {
        oaLoginCallback();
      }
    };
    var qqLogin = function qqLogin() {
      close();
      if (typeof qqLoginCallback === 'function') {
        qqLoginCallback();
      }
    };

    ReactDom.render(React.createElement(LoginChooser, { onOA: oaLogin, onQQ: qqLogin, onClose: close }), div);
  },
  qcLogin: function qcLogin(callback, url) {
    QC.Login({}, function (reqData, opts) {
      if (typeof callback === 'function') {
        callback();
      } else {
        if (!url) {
          window.location.reload();
        }
      }
    });

    var url = 'https://graph.qq.com/oauth/show?which=Login&display=pc&client_id=' + this.qc.appId + '&response_type=token&scope=get_user_info&redirect_uri=http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html';
    return window.open(url, 'qc_window', 'left=100, top=100, height=470, width=740, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');

    // QC.Login.showPopup(param)
  },
  qcLogout: function qcLogout(callback, url) {
    QC.Login.signOut();
    if (typeof callback === 'function') {
      callback();
    }
  },
  initQC: function initQC(callback) {
    if (typeof QC != 'undefined') {
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      if (typeof this.qc.appId === 'undefined' || this.qc.appId == null || this.qc.appId === '' || typeof this.qc.redirectUri === 'undefined' || this.qc.redirectUri == null || this.qc.redirectUri === '') {
        console.info('未设置appid和redirecturi');
      }
      window.qcJsLoadedByRadmin = function () {
        if (typeof QC != 'undefined') {
          if (typeof callback === 'function') {
            callback();
          }
        }
      };

      document.write("<script type='text/javascript' onload='qcJsLoadedByRadmin()' src='http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js' data-appid='" + this.qc.appId + "' data-redirecturi='" + this.qc.redirectUri + "' charset='utf-8'></script>");
    }
  }
};