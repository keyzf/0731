var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Switch1 = require('./Switch1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>开关 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>开关</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Switch1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Switch1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/switch.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
