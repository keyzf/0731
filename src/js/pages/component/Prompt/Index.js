var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Prompt1 = require('./Prompt1')
var Prompt2 = require('./Prompt2')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>悬浮提示 <small className='display-block'></small></h6>
        <div className='row'>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>悬浮提示</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className='text-center'>
                    <Prompt1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Prompt1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>悬浮提示（带回调）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div className='text-center'>
                    <Prompt2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Prompt2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
