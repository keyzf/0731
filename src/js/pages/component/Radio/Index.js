var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Document = require('../Document')

var Radio1 = require('./Radio1')
var Radio2 = require('./Radio2')
var Radio3 = require('./Radio3')
var Radio4 = require('./Radio4')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>单选框 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>单选框（纵向）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Radio1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Radio1.js')}
                  </Code>
                </div>
              </div>
            </div>

            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>单选框（绑定）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Radio3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Radio3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>单选框（横向）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Radio2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Radio2.js')}
                  </Code>
                </div>
              </div>
            </div>

            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>单个Radio组件</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Radio4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Radio4.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/radioGroup.md' />
                <Document src='component/radio.md' />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
})
