var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var ToolTip1 = require('./ToolTip1')
var Popover1 = require('./Popover1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>提示 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>气泡提示</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className='text-center'>
                    <ToolTip1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./ToolTip1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>自定义提示</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className='text-center'>
                    <Popover1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Popover1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/toolTip.md' />
                <Document src='component/popover.md' />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
})
