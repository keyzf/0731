var React = require('react')
var ReactDom = require('react-dom')

var Code = require('../Code')
var Document = require('../Document')

var Form1 = require('./Form1')
var Form2 = require('./Form2')
var Form3 = require('./Form3')
var Form4 = require('./Form4')
var Form5 = require('./Form5')
var Form6 = require('./Form6')
var Form7 = require('./Form7')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>表单 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>水平排列</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Form1 />
                  </div>
                  <Code>
                          {require('!raw-loader!./Form1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>垂直排列</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Form2 />
                  </div>
                  <Code>
                          {require('!raw-loader!./Form2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>水平排列表单宽度比例控制</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Form3 />
                  </div>
                  <Code>
                          {require('!raw-loader!./Form3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>带验证表单</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Form4 />
                  </div>
                  <Code>
                          {require('!raw-loader!./Form4.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>弹窗与表单结合案例</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Form5 />
                  </div>
                  <Code>
                          {require('!raw-loader!./Form5.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>带文件上传表单</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Form6 />
                  </div>
                  <Code>
                          {require('!raw-loader!./Form6.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>复杂排列表单Demo</h5>
              </div>
              <div className='panel-body'>
                <div>
                  <Form7 />
                </div>
                <Code>
                          {require('!raw-loader!./Form7.js')}
                </Code>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-12'>
          <div className='panel'>
            <div className='panel-body'>
              <Document src='component/form.md' />
            </div>
          </div>
        </div>
        
      </div>
    )
  }
})
