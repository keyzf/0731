var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Spin1 = require('./Spin1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>加载中 <small className='display-block'>菊花与Ajax请求通过名称直接关联，可以直接使用StoreConfig中定义的数据名</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>加载中</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Spin1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Spin1.js')}
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
