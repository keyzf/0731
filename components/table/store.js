
var store = class TableDataStore {

  constructor () {
    this.data = null;
    this.columns = null;
    this.keyField = null;
    this.pagination = {
      total: 0,
      index: 0,
      limit: 10
    }
  }

  setProps (props) {
    this.data = props.data;
    this.keyField = props.keyField;
    this.pagination = props.pagination;
    this.columns = props.columns;
  }

  sort (field, order) {
    this.data.sort(function (a, b) {
      if (order === 'DESC') {
        if (b[field] === null) return false;
        if (a[field] === null) return true;
        if (typeof b[field] === 'string') {
          return b[field].localeCompare(a[field])
        } else {
          return a[field] > b[field] ? -1 : ((a[field] < b[field]) ? 1 : 0)
        }
      } else {
        if (b[field] === null) return true;
        if (a[field] === null) return false;
        if (typeof a[field] === 'string') {
          return a[field].localeCompare(b[field])
        } else {
          return a[field] < b[field] ? -1 : ((a[field] > b[field]) ? 1 : 0)
        }
      }
    })
  }

  get () {
    return this.data;
  }
};

module.exports = store;