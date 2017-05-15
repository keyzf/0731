'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = function () {
  function TreeDataStore() {
    _classCallCheck(this, TreeDataStore);

    this.storeData = {};
  }

  _createClass(TreeDataStore, [{
    key: 'setProps',
    value: function setProps(props) {
      for (var key in props) {
        this.storeData[key + ''] = props[key + ''];
      }
    }
  }, {
    key: 'getProp',
    value: function getProp(key) {
      return this.storeData[key + ''];
    }
  }]);

  return TreeDataStore;
}();

module.exports = store;