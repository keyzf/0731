'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var FileUpload = require('./FileUpload');
function Validator(rule, value) {
  var _regulars = {
    mobile: /^((13[0-9])|(15[0-3,5-9])|(18[0-3,5-9]))\d{8}$/,
    phone: /^(\d{3,4}[-|——|_|\s]+)?\d{7,8}([-|——|_|\s]+\d{2,6})?$/,
    zipCode: /^[1-9]\d{5}(?!\d)$/,
    QQ: /^[1-9][0-9]{4,9}$/,
    IP: /^((?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
    email: /^([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    certificate: /^\d{6}((\d{2}((0[1-9])|(1[0-2]))[0-3]\d{4})|((19|20)\d{2}((0[1-9])|(1[0-2]))[0-3]\d{4}[0-9xX]?))$/,
    chinese: /^[\u4e00-\u9fa5]+$/,
    letter: /^[a-zA-Z]+$/,
    number: /^[-]?\d+((\.\d+)|(\d*))$/,
    int: /^[-]?\d+$/,
    float: /^[-]?\d+\.\d+$/,
    url: /^(https|http):\/\/(((?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))|(([\w-]+).)+[a-zA-Z]{2,6}|localhost)(:[0-9]{1,6})?(\/[\w-]+)*((\/([\w-]+\.)+[\w-]{1,5})|\/)?$/,
    link: /^(https|http):\/\/(((?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))|(([\w-]+).)+[a-zA-Z]{2,6}|localhost)(:[0-9]{1,6})?(\/[\w-]+)*((\/([\w-]+\.)+[\w-]{1,5})|\/)?((\?|\#)\S*)?$/
  };

  this.type = rule.type;
  this.value = value;
  this.params = rule.params;
  this.message = rule.message;

  this.getMessage = function () {
    return this.message;
  };

  this._required = function (val) {
    if (val == '' || typeof val == 'undefined') {
      return false;
    }
    return true;
  };

  this._minLength = function (val, minlength) {
    if (val.length < minlength) {
      return false;
    }
    return true;
  };

  this._maxLength = function (val, maxlength) {
    if (val.length > maxlength) {
      return false;
    }
    return true;
  };

  this._test = function (type, value) {
    if (_regulars[type]) {
      return _regulars[type].test(value);
    }
    return false;
  };

  this.validate = function () {
    var type = this.type;
    var val = this.value;
    var result = false;
    switch (type) {
      case 'required':
        result = this._required(val);
        break;
      case 'minlength':
        var minlength = this.params;
        result = this._minLength(val, minlength);
        break;
      case 'maxlength':
        var maxlength = this.params;
        result = this._maxLength(val, maxlength);
        break;
      case 'mobile':
      case 'phone':
      case 'zipCode':
      case 'QQ':
      case 'IP':
      case 'email':
      case 'certificate':
      case 'chinese':
      case 'letter':
      case 'number':
      case 'int':
      case 'url':
      case 'link':
        var result = this._test(type, val);
        break;
      case 'custom':
        var func = this.params;
        result = func(val);
        break;
      default:
        result = true;
    }

    return result;
  };
}
var EventEmitter = {
  _events: {},
  dispatch: function dispatch(event, data) {
    if (!this._events[event]) return; // no one is listening to this event
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i](data);
    }
  },
  subscribe: function subscribe(event, callback) {
    if (!this._events[event]) this._events[event] = []; // new event
    this._events[event].push(callback);
  },
  unSubscribe: function unSubscribe(event) {
    if (this._events && this._events[event]) {
      delete this._events[event];
    }
  }
};
module.exports = {
  EventEmitter: EventEmitter,
  generateGuuId: function generateGuuId() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  },

  validate: function validate(rules, value) {
    var desc = null;
    for (var i = 0; i < rules.length; i++) {
      var val = typeof value === 'undefined' ? rules[i].value : value;
      var validator = new Validator(rules[i], val);
      if (!validator.validate()) {
        desc = validator.getMessage();
        break;
      }
    }
    return desc;
  },
  linkState: function linkState(ctx, path, eventProp) {
    var updateIn = function updateIn(obj, path, value) {
      var current = obj;
      var stack = path.split('.');

      while (stack.length > 1) {
        current = current[stack.shift()];
      }
      current[stack.shift()] = value;

      return obj;
    };
    var value = null;
    return function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof eventProp === 'undefined') {
        value = e.target.value;
      } else {
        value = e.target[eventProp];
      }
      ctx.setState(updateIn(ctx.state, path, value));
    };
  },
  submitDataWithFile: function submitDataWithFile(params) {
    var self = this;
    var div = document.createElement('div');
    document.body.appendChild(div);
    var options = {
      baseUrl: params.url,
      dataType: 'json',
      multiple: true,
      numberLimit: 9,
      chooseAndUpload: false,
      paramAddToField: params.data,
      fileFieldName: params.filename || 'file',
      filesToUpload: params.files,
      beforeUpload: function beforeUpload(files, mill) {
        if (typeof files == 'string') return true;
        if (files[0].size < 1024 * 1024 * 20) {
          files[0].mill = mill;
          return true;
        }
        return false;
      },
      doUpload: function doUpload(files, mill) {
        var isFile = !(typeof files == 'string');
        var name = isFile ? files[0].name : files;
        var tmpFile = {
          name: name,
          mill: isFile ? files[0].mill : mill
        };
        /*存入暂存空间*/
        // tempSave.push(tmpFile)
        console.log('uploading', name);
      },
      uploading: function uploading(progress) {
        if (progress.total) console.log('loading...', parseInt(progress.loaded / progress.total * 100) + '%');
      },
      uploadSuccess: function uploadSuccess(resp) {
        /*Find the file with mill, and delete the tmpFile.*/
        // popTmpSave(resp.mill)
        // ReactDom.unmountComponentAtNode(div)
        div.parentNode.removeChild(div);
        if (params.onSuccess) params.onSuccess(resp);
        // console.log('upload success', resp.data)
      },
      uploadError: function uploadError(err) {
        alert(err.message);
      },
      uploadFail: function uploadFail(resp) {
        alert(resp);
      }
    };

    var fileUpload = ReactDom.render(React.createElement(FileUpload, { options: options }), div);
    // fileUpload.filesToUpload([params.file])
  }
};