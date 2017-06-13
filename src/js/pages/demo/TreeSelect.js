var React = require('react')

var TreeSelect = require('radmin').TreeSelect

module.exports = React.createClass({
  _getData: function() {
    return [{
      name: '全部',
      value: '1',
      checked: false,
      expand: true,
      children: [{
        name: '第一级元素1',
        value: 'i-1',
        checked: false,
        children: [{
          name: '第二级元素1-1',
          value: 'i-1-1'
        }, {
          name: '第二级元素1-2',
          value: 'i-1-2'
        }, {
          name: '第二级元素1-3',
          value: 'i-1-3'
        }]
      }, {
        name: '第一级元素2',
        value: 'i-2',
        checked: false,
        children: [{
          name: '第二级元素2-1',
          value: 'i-2-1'
        }, {
          name: '第二级元素2-2',
          value: 'i-2-2',
          expand: true,
          children: [{
            name: '第二级元素2-2-1',
            value: 'i-2-2-1'
          }, {
            name: '第二级元素2-2-2',
            value: 'i-2-2-2'
          }, {
            name: '第二级元素2-2-3',
            value: 'i-2-2-3',
            checked: true
          }]
        }]
      }, {
        name: '第一级元素3',
        value: 'i-3',
        checked: false
      }, {
        name: '第一级元素4',
        value: 'i-4',
        checked: false,
        children: [{
          name: '第二级元素4-1',
          value: 'i-4-1',
          checked: false
        }, {
          name: '第二级元素4-2',
          value: 'i-4-2',
          checked: false
        }, {
          name: '第二级元素4-3',
          value: 'i-4-3',
          checked: false
        }]
      }]
    }]
  },
  _onChange: function (value) {
    console.log(value)
  },
  render: function () {
    return (
      <TreeSelect data={this._getData()} onChange={this._onChange} style={{marginLeft: 5}} />
    )
  }
})
