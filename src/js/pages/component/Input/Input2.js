var React = require('react')

var Utils = require('radmin').Utils
var SearchBar = require('radmin').SearchBar

module.exports = React.createClass({
  getInitialState: function () {
    return {
      info: {
        term: ''
      }
    }
  },
  _changeTerm: function (value) {
    this.state.term = value
    this.forceUpdate()
  },
  _searchTerm: function(value) {
    Utils.prompt('搜索' + value)
  },
  render: function () {
    return (
      <SearchBar onChange={this._changeTerm} onSearch={this._searchTerm} />
    )
  }
})
