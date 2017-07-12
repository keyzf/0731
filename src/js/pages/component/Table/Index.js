var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Table1 = require('./Table1')
var Table2 = require('./Table2')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>表格 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标准表格（后端分页）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Table1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Table1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标准表格（前端分页）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Table2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Table2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/table.md' />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
})
