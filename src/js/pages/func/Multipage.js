var React = require('react')

var Utils = require('radmin').Utils
var Document = require('../component/Document')

module.exports = React.createClass({
  _toPage: function() {
    window.location.href = '/home.html'
  },
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>多页面入口 <small className='display-block'></small></h6>
        <div className='row'>

          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>测试</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <p>
                    <a onClick={this._toPage}>点击跳转新页面</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='framework/Multipage.md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
