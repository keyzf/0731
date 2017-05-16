var React = require('react')

var Utils = require('radmin').Utils
var Document = require('../component/Document')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>样式的使用及修改 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='framework/Style.md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
