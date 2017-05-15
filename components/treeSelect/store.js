
var store = class TreeDataStore {

  constructor () {
    this.storeData = {};
  }

  setProps (props) {
      for(var key in props){
          this.storeData[key + ''] = props[key + ''];
      }
  }

  getProp (key) {
    return this.storeData[key + ''];
  }
};

module.exports = store;