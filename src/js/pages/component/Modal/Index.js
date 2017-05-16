var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Alert1 = require('./Alert1')
var Confirm1 = require('./Confirm1')
var Popup1 = require('./Popup1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>弹窗 <small className='display-block'>支持多种常用弹窗和自定义弹窗</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>警告框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className="text-center">
                    <Alert1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Alert1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>确认框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className="text-center">
                    <Confirm1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Confirm1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>自定义弹窗</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className="text-center">
                    <Popup1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Popup1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/popup.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
