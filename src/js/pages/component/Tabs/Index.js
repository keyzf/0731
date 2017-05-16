var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Tabs1 = require('./Tabs1')
var Tabs2 = require('./Tabs2')
var Tabs3 = require('./Tabs3')
var Tabs4 = require('./Tabs4')
var Tabs5 = require('./Tabs5')
var Tabs6 = require('./Tabs6')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>页签 <small className='display-block'>支持横向或纵向页签</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>普通 Tab</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tabs1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tabs1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>可调节 Tab</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tabs2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tabs2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>新增&删除</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tabs4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tabs4.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>垂直 Tab</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tabs3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tabs3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>外部新增</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tabs5 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tabs5.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>自动滚动播放</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tabs6 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tabs6.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/tabs.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
