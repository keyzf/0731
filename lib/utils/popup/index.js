'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var React = require('react');
var ReactDom = require('react-dom');
var Prompt = require('../../prompt');
var Alert = require('../../alert');
var Confirm = require('../../confirm');

var popup = function popup(param) {
  var div = document.createElement('div');
  document.body.appendChild(div);
  param.type = param.type || 'prompt';
  var close = function close() {
    ReactDom.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };
  var onConfirm = function onConfirm() {
    if (typeof param.onConfirm === 'function') {
      param.onConfirm();
    }
    close();
  };
  var onCancel = function onCancel() {
    if (typeof param.onCancel === 'function') {
      param.onCancel();
    }
    close();
  };
  var onClose = function onClose() {
    if (typeof param.onClose === 'function') {
      param.onClose();
    }
    close();
  };
  switch (param.type) {
    case 'alert':
      ReactDom.render(React.createElement(Alert, { title: param.title, onConfirm: onConfirm, onCancel: onCancel, text: param.text, textConfirm: param.textConfirm, textCancel: param.textCancel }), div);
      break;
    case 'prompt':
      ReactDom.render(React.createElement(Prompt, { onClose: onClose, text: param.text }), div);
      break;
    case 'confirm':
      ReactDom.render(React.createElement(Confirm, { title: param.title, onConfirm: onConfirm, onCancel: onCancel, text: param.text, textConfirm: param.textConfirm, textCancel: param.textCancel }), div);
      break;
  }
};

var proxy = function proxy(type) {
  var param = {};
  if (_typeof(arguments[1]) != 'object') {
    param.text = arguments[1];
  } else {
    param = arguments[1];
  }
  param.type = type;
  popup(param);
};

module.exports = {
  popup: popup,
  alert: function alert() {
    proxy('alert', arguments[0]);
  },
  prompt: function prompt() {
    proxy('prompt', arguments[0]);
  },
  confirm: function confirm() {
    proxy('confirm', arguments[0]);
  },
  image: function image() {
    proxy('image', arguments[0]);
  },
  qrcode: function qrcode() {
    proxy('qrcode', arguments[0]);
  },
  nosave: function nosave() {
    proxy('no-save', arguments[0]);
  }
};