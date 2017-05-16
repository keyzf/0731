var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var CheckBox1 = require('./CheckBox1')
var CheckBox2 = require('./CheckBox2')
var CheckBox3 = require('./CheckBox3')
var CheckBox4 = require('./CheckBox4')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>复选框 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-6'>

            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>复选框（纵向）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <CheckBox1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./CheckBox1.js')}
                  </Code>
                </div>
              </div>
            </div>

            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>readonly</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <CheckBox4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./CheckBox4.js')}
                  </Code>
                </div>
              </div>
            </div>

          </div>

          <div className='col-md-6'>

            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>复选框（横向）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <CheckBox2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./CheckBox2.js')}
                  </Code>
                </div>
              </div>
            </div>

            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>单个CheckBox组件</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <CheckBox3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./CheckBox3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/checkBox.md' />
                <Document src='component/checkBoxGroup.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
