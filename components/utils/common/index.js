'use strict'

var popupUtil = require('../popup')
var saveUtil = require('../save')

var onRedirect = function onRedirect (url, blank) {
  if (blank) {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}

module.exports = {
  cookie: function cookie (name, value, options) {
    // cookie工具
    if (typeof value != 'undefined') {
      // name and value given, set cookie
      options = options || {}
      if (value === null) {
        value = ''
        options.expires = -1
      }
      var expires = ''
      if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        var date
        if (typeof options.expires == 'number') {
          date = new Date()
          date.setTime(date.getTime() + options.expires * 1000)
        } else {
          date = options.expires
        }
        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
      }
      var path = options.path ? '; path=' + options.path : ''
      var domain = options.domain ? '; domain=' + options.domain : ''
      var secure = options.secure ? '; secure' : ''
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
    } else {
      // only name given, get cookie
      var cookieValue = null
      if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';')
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].replace(/^\s*(.*?)\s*$/, '$1'); // this.trim(cookies[i])
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == name + '=') {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
            break
          }
        }
      }
      return cookieValue
    }
  },
  // 从url上获取数据
  getUrlVars: function getUrlVars (url) {
    var vars = [],
      hash
    if (typeof url === 'undefined' || url == null) {
      url = window.location.href
    }

    if (url.indexOf('?') != -1) {
      var param = url.match(/\?[^\#]+/gi)
      if (param) {
        param = param[0]
        param = param.replace(/\?/gi, '')
        param = param.split(/[\&]/)
      }
      for (var i = 0; i < param.length; i++) {
        hash = param[i].split('=')
        vars[hash[0]] = hash[1]
      }
    }

    return vars
  },
  getUrlVar: function getUrlVar (name, url) {
    return this.getUrlVars(url)[name]
  },
  getUrlVarsObject: function getUrlVarsObject () {
    var vars = this.getUrlVars()
    var varsObject = {}
    for (var key in vars) {
      varsObject[key] = vars[key]
    }
    return varsObject
  },
  deleteUrlVar: function deleteUrlVar (name, url) {
    if (typeof url === 'undefined' || url == null) {
      url = window.location.href
    }

    var oldUrl = ''
    while (url != oldUrl) {
      oldUrl = url
      url = url.replace(new RegExp('\\&' + name + '=[^\\&\\#]*', 'gi'), '')
      url = url.replace(new RegExp('\\?' + name + '=[^\\&\\#]*', 'gi'), '')
      if (url.indexOf('?') == -1) {
        url = url.replace('\\&', '?')
      }
    }

    return url
  },
  // 重定向
  redirect: function (url, blank) {
    if (blank) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  },
  // 获取随机字符串
  getRandomString: function (length) {
    !length ? length = 20 : null

    var s = []
    var a = parseInt(Math.random() * 25) + (Math.random() > 0.5 ? 65 : 97)
    for (var i = 0; i < length; i++) {
      s[i] = Math.random() > 0.5 ? parseInt(Math.random() * 9) : String.fromCharCode(parseInt(Math.random() * 25) + (Math.random() > 0.5 ? 65 : 97))
    }
    return s.join('')
  }
}
