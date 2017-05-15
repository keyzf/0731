'use strict';

var clone = require('clone');

var popupUtil = require('../popup');
var saveUtil = require('../save');

var onRedirect = function onRedirect(url, blank) {
  if (blank) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};

module.exports = {
  cookie: function cookie(name, value, options) {
    // cookie工具
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
          var cookie = cookies[i].replace(/^\s*(.*?)\s*$/, '$1'); // this.trim(cookies[i])
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

  CookieOpera: {
    clearCookies: function clearCookies() {
      //删除所有cookies
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        var domain = location.host.substr(location.host.indexOf('.'));
        document.cookie = name + "=;expires=" + exp.toGMTString();
      }
    }
  },

  formatDate: function formatDate(millionsecond) {
    //时间格式转化
    var date = new Date(millionsecond);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },

  //number 数字
  //places 小数位数
  //symbol ￥或者其它或者空字符串
  formatMoney: function formatMoney(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "￥";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = i.length,
        j = j > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  },

  // 从url上获取数据
  getUrlVars: function getUrlVars(url) {
    var vars = [],
        hash;
    if (typeof url === 'undefined' || url == null) {
      url = window.location.href;
    }

    if (url.indexOf('?') != -1) {
      var param = url.match(/\?[^\#]+/gi);
      if (param) {
        param = param[0];
        param = param.replace(/\?/gi, '');
        param = param.split(/[\&]/);
      }
      for (var i = 0; i < param.length; i++) {
        hash = param[i].split('=');
        vars[hash[0]] = hash[1];
      }
    }

    return vars;
  },

  getUrlVar: function getUrlVar(name, url) {
    return this.getUrlVars(url)[name];
  },

  getUrlVarsObject: function getUrlVarsObject() {
    var vars = this.getUrlVars();
    var varsObject = {};
    for (var key in vars) {
      varsObject[key] = vars[key];
    }
    return varsObject;
  },

  deleteUrlVar: function deleteUrlVar(name, url) {
    if (typeof url === 'undefined' || url == null) {
      url = window.location.href;
    }

    var oldUrl = '';
    while (url != oldUrl) {
      oldUrl = url;
      url = url.replace(new RegExp('\\&' + name + '=[^\\&\\#]*', 'gi'), '');
      url = url.replace(new RegExp('\\?' + name + '=[^\\&\\#]*', 'gi'), '');
      if (url.indexOf('?') == -1) {
        url = url.replace('\\&', '?');
      }
    }

    return url;
  },

  // 重定向
  redirect: function redirect(url, blank) {
    if (blank) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  },

  // 获取随机字符串
  getRandomString: function getRandomString(length) {
    !length ? length = 20 : null;

    var s = [];
    var a = parseInt(Math.random() * 25) + (Math.random() > 0.5 ? 65 : 97);
    for (var i = 0; i < length; i++) {
      s[i] = Math.random() > 0.5 ? parseInt(Math.random() * 9) : String.fromCharCode(parseInt(Math.random() * 25) + (Math.random() > 0.5 ? 65 : 97));
    }
    return s.join('');
  },

  /**
   * 生成唯一的随机id  zee 20160409
   * */
  getRandomId: function getRandomId() {
    var words = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        num1 = Math.floor(Math.random() * words.length),
        num2 = Math.floor(Math.random() * words.length),
        num3 = Math.floor(Math.random() * words.length),
        num4 = Math.floor(Math.random() * words.length),
        timeNum = new Date() * 1;
    return words[num1] + words[num2] + words[num3] + words[num4] + '_' + timeNum;
  },

  /**
   * 数组数据转树型数据
   * arrData  行结构数据
   * opts  属性信息
   {
      idKey: 'id的key值',
      pIdKey: 'parentId的key值',
      childrenKey: 'children的key值',
      rootParentId: '根节点的id'
   }
   zee 20170505
   * */
  arrToTree: function arrToTree(arrDataBase, opts) {
    var keyNodes = {},
        //用来保存每个节点
    arrData = arrDataBase,

    // arrData = clone(arrDataBase),
    parentKeyNodes = {},
        //保存有子节点的数据
    pIdKey = opts.pIdKey || 'parentId',
        idKey = opts.idKey || 'id',
        childrenKey = opts.childrenKey || 'children',
        rootParentId = !opts.rootParentId ? '__rootParentId' : opts.rootParentId,
        children;
    for (var i = 0; i < arrData.length; i++) {
      arrData[i][childrenKey] = [];

      keyNodes[arrData[i][idKey] + ''] = arrData[i];

      //转换根节点为空，0，null,undefined为统一的key值，方便管理
      if (!arrData[i][pIdKey] && rootParentId == '__rootParentId') {
        arrData[i][pIdKey] = rootParentId;
      }

      //获得当前节点的父节点，将当前节点加入到父节点的children中
      var pNode = keyNodes[arrData[i][pIdKey] + ''];
      if (pNode) {
        pNode.isParent = true;
        pNode[childrenKey + ''].push(arrData[i]);
      } else {
        //把当前节点放到以父节点IdKey为key的数组中
        if (parentKeyNodes[arrData[i][pIdKey] + '']) {
          parentKeyNodes[arrData[i][pIdKey] + ''].push(arrData[i]);
        } else {
          parentKeyNodes[arrData[i][pIdKey] + ''] = [arrData[i]];
        }
      }

      //找到当前节点的子节点，并且将其赋值给自己的children
      children = parentKeyNodes[arrData[i][idKey] + ''];
      if (children) {
        arrData[i][childrenKey] = children;
        arrData[i].isParent = true;
      }
    }
    return parentKeyNodes[rootParentId + ''] || [];
  },

  /**
   * 遍历树结构数据并且进行对应操作
   *opts:{
   *   childrenKey:children的key值
   *   callFn:遍历操作
   * }
   * */
  traverseTreeData: function traverseTreeData(treeData, opts) {
    var childrenKey = opts.childrenKey || 'children';
    for (var i in treeData) {
      typeof opts.callFn == "function" && opts.callFn(treeData[i]);
      this.traverseTreeData(treeData[i][childrenKey], opts);
    }
  },

  /** 
   * 数组转树形结构，父节点不存在的均视为根节点 
   *  
   */
  arrayToTree: function arrayToTree(data, options) {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    options = options || {};
    var idKey = options.idKey || 'id';
    var parentKey = options.parentKey || 'parent';
    var childrenKey = options.childrenKey || 'children';

    // 找出所有父子关系 
    var parentMap = {};
    data.forEach(function (item) {
      var parent = item[parentKey];
      if (!parentMap[parent]) {
        parentMap[parent] = [];
      }

      parentMap[parent].push(item);
    });

    // 找出所有根节点(父节点不存在的均视为根节点) 
    var roots = [];
    for (var key in parentMap) {
      var tmp = data.filter(function (item) {
        return String(item[idKey]) === key;
      });
      if (tmp.length === 0) {
        roots = roots.concat(parentMap[key]);
      }
    }

    // 从根节点往下填充children属性 
    var parents = roots.slice(0);
    while (parents.length > 0) {
      var children = [];
      parents.forEach(function (parent) {
        parent[childrenKey] = parentMap[parent[idKey]] || [];
        children = children.concat(parent[childrenKey]);
      });
      parents = children;
    }

    return roots;
  }
};