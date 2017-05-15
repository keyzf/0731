'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = function () {
  function TableDataStore() {
    _classCallCheck(this, TableDataStore);

    this.data = null;
    this.columns = null;
    this.keyField = null;
    this.pagination = {
      total: 0,
      index: 0,
      limit: 10
    };
  }

  _createClass(TableDataStore, [{
    key: 'setProps',
    value: function setProps(props) {
      this.data = props.data;
      this.keyField = props.keyField;
      this.pagination = props.pagination;
      this.columns = props.columns;
    }
  }, {
    key: 'sort',
    value: function sort(field, order) {
      this.data.sort(function (a, b) {
        if (order === 'DESC') {
          if (b[field] === null) return false;
          if (a[field] === null) return true;
          if (typeof b[field] === 'string') {
            return b[field].localeCompare(a[field]);
          } else {
            return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
          }
        } else {
          if (b[field] === null) return true;
          if (a[field] === null) return false;
          if (typeof a[field] === 'string') {
            return a[field].localeCompare(b[field]);
          } else {
            return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
          }
        }
      });
    }
  }, {
    key: 'get',
    value: function get() {
      return this.data;
    }
  }]);

  return TableDataStore;
}();

module.exports = store;