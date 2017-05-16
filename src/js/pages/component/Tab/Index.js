var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Tab1 = require('./Tab1')
var Tab2 = require('./Tab2')
var Tab3 = require('./Tab3')
var Tab4 = require('./Tab4')
var Tab5 = require('./Tab5')
var Tab6 = require('./Tab6')

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
                    <Tab1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tab1.js')}
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
                    <Tab2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tab2.js')}
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
                    <Tab4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tab4.js')}
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
                    <Tab3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tab3.js')}
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
                    <Tab5 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tab5.js')}
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
                    <Tab6 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tab6.js')}
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
