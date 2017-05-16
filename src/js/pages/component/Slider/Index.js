var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Slider1 = require('./Slider1')
var Slider2 = require('./Slider2')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>滑动条 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>连续滑动条</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Slider1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Slider1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>离散滑动条</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Slider2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Slider2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/slider.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
