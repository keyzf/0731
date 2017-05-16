var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var DatePicker1 = require('./DatePicker1')
var DatePicker2 = require('./DatePicker2')
var DatePicker3 = require('./DatePicker3')
var DatePicker4 = require('./DatePicker4')
var DateRangePicker1 = require('./DateRangePicker1')
var DateRangePicker2 = require('./DateRangePicker2')
var DateRangePicker3 = require('./DateRangePicker3')
var DateRangePicker4 = require('./DateRangePicker4')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>日期选择 <small className='display-block'>支持日期（时间）选择，也支持范围选择</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期选择器</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DatePicker1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DatePicker1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期选择器（带时间）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DatePicker2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DatePicker2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期选择器（只显示月份）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DatePicker3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DatePicker3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期选择器（带范围且默认日期不在范围内）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DatePicker4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DatePicker4.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期范围选择器</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DateRangePicker1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DateRangePicker1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期范围选择器（带时间）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DateRangePicker2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DateRangePicker2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期范围选择器（仅月份）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DateRangePicker3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DateRangePicker3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>日期范围只读</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <DateRangePicker4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./DateRangePicker4.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/datePicker.md' />
                <Document src='component/dateRangePicker.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
