var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Navigator1 = require('./Navigator1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>导航 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>纵向导航</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  页面左侧导航即为纵向导航
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>横向导航</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Navigator1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Navigator1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/navigator.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
