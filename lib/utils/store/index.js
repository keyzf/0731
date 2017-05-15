'use strict';

var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var clone = require('clone');
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();

var CHANGE_EVENT = 'change';

var Store = objectAssign({}, EventEmitter.prototype, {
  _data: {},
  _listenTypes: [],
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  init: function init() {
    var that = this;
    this.dispatchToken = dispatcher.register(function (action) {
      for (var key in that._listenTypes) {
        if (that._listenTypes[key] === action.type) {
          that._data[action.type] = action.data;
          that.emitChange();
          break;
        }
      }
    });
    return this;
  },
  // 侦听某个存储事件
  register: function register(type) {
    for (var key in this._listenTypes) {
      if (this._listenTypes[key] === type) {
        return;
      }
    }
    this._listenTypes.push(type);
    return this;
  },
  // 获取某个存储事件的值，只有侦听了此事件或自定义了此事件的存储过程，才可能获得值
  getData: function getData(type) {
    return clone(this._data[type]);
  },
  // 设置某个存储事件的值
  setData: function setData(type, value) {
    this._data[type] = value;
  }
});

var StoreUtil = {
  // 创建一个存储器store
  create: function create(obj) {
    return objectAssign(clone(Store), obj).init();
  },
  // 发出某个存储事件（包含值）,由action调用
  dispatch: function dispatch(obj) {
    return dispatcher.dispatch(obj);
  },
  // 自定义某个事件的存储过程
  register: function register(func) {
    return dispatcher.register(func);
  }
};

module.exports = StoreUtil;