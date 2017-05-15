'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var reqwest = require('reqwest');

module.exports = {
  apiRootPath: 'http://labs.api.act.qq.com/',
  hasInitLibCall: false,
  libCallReady: false,
  tamsId: '',
  isLLogin: false,
  libQueue: [],
  isLibCallReady: function isLibCallReady() {
    return this.libCallReady;
  },
  setLibCallReady: function setLibCallReady() {
    this.libCallReady = true;
  },
  setTamsId: function setTamsId(tamsId) {
    this.tamsId = tamsId;
  },
  setIsLLogin: function setIsLLogin(isLLogin) {
    this.isLLogin = isLLogin;
  },
  trim: function trim(str) {
    return str.replace(/^\s*(.*?)\s*$/, '$1');
  },
  cookie: function cookie(name, value, options) {
    if (typeof value != 'undefined') {
      // name and value given, set cookie
      options = options || {};
      if (value === null) {
        value = '';
        options.expires = -1;
      }
      var expires = '';
      if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        var date;
        if (typeof options.expires == 'number') {
          date = new Date();
          date.setTime(date.getTime() + options.expires * 1000);
        } else {
          date = options.expires;
        }
        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
      }
      var path = options.path ? '; path=' + options.path : '';
      var domain = options.domain ? '; domain=' + options.domain : '';
      var secure = options.secure ? '; secure' : '';
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
      // only name given, get cookie
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = this.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == name + '=') {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  },
  getACSRFToken: function getACSRFToken() {
    var skey = this.cookie('skey');
    if (skey == null || skey == '') {
      skey = this.cookie('lskey');
    }
    if (skey == null) skey = '';
    var hash = 5381;
    for (var i = 0, len = skey.length; i < len; ++i) {
      hash += (hash << 5) + skey.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
  },
  libCall: function libCall(params) {
    var self = this;
    var reg = /^http:\/\/(labs\.)?(api|api2)\.act\.qq\.com\/.*/i;
    if (typeof params != 'undefined' && params.url.substring(0, 4) == 'http' && !reg.test(params.url)) {
      params.data = params.data || {};
      if ('object' == _typeof(params.data)) {
        params.data.g_tk = this.getACSRFToken();
      } else {
        params.data = params.data + '&g_tk=' + this.getACSRFToken();
      }

      reqwest(params);
      return;
    }

    this.initLibCallProxy();
    if (typeof params != 'undefined') {
      // 设置默认访问路径
      if (params.url.substring(0, 4) != 'http') {
        params.url = this.apiRootPath + this.tamsId + '/' + params.url;
      }
      params.data = params.data || {};
      if ('object' == _typeof(params.data)) {
        params.data.g_tk = this.getACSRFToken();
      } else {
        params.data = params.data + '&g_tk=' + this.getACSRFToken();
      }
      this.libQueue.push(params);
    }
    if (!this.isLibCallReady()) {
      setTimeout(function () {
        self.libCall();
      }, 100);
      return;
    }
    for (var i = 0; i < this.libQueue.length; i++) {
      var p = this.libQueue.shift();
      document.getElementById('libCallProxy').contentWindow.apiLibCall(p);
    }
  },
  initLibCallProxy: function initLibCallProxy() {
    if (this.hasInitLibCall) {
      return;
    }
    this.hasInitLibCall = true;
    var libCallProxy = document.createElement('div');
    libCallProxy.id = 'libCallProxyContainer';
    libCallProxy.style.height = '1px';
    libCallProxy.style.width = '1px';
    libCallProxy.style.overflow = 'hidden';
    libCallProxy.style.position = 'absolute';
    libCallProxy.style.top = '1px';
    libCallProxy.style.left = '1px';
    libCallProxy.innerHTML = '<iframe id="libCallProxy" src="' + this.apiRootPath + 'apilibproxy.html" width="1" scrolling="no" height="1" frameborder="0" marginheight="0" framespacing="0" marginwidth="0" border="0"></iframe>';
    document.body.insertBefore(libCallProxy, null);
  }
};