var React = require('react')

var Utils = require('radmin').Utils
var Tabs = require('radmin').Tabs

module.exports = React.createClass({
  _onChange: function (index) {
    Utils.prompt('自动滚动-标签' + index)
  },
  render: function () {
    return (
      <Tabs onChange={this._onChange} autoplay={8000}>
        <Tabs.Tab name='Tab1' style={{ minWidth: 100 }}>
          Content of tab 1
        </Tabs.Tab>
        <Tabs.Tab name='Tab2' style={{ minWidth: 100 }}>
          Content of tab 2
        </Tabs.Tab>
        <Tabs.Tab name='Tab3' style={{ minWidth: 100 }}>
          Content of tab 3
        </Tabs.Tab>
      </Tabs>
    )
  }
})
