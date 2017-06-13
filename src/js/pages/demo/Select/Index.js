var React = require('react')

var Code = require('../Code')
var Select1 = require('./Select1')
var Select2 = require('./Select2')
var Select3 = require('./Select3')
var Select4 = require('./Select4')
var Select5 = require('./Select5')
var Select6 = require('./Select6')
var Select7 = require('./Select7')
var Select8 = require('./Select8')
var Select9 = require('./Select9')
var Select10 = require('./Select10')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>下拉框 <small className='display-block'>普通选择，多项选择，自动完成</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标准下拉框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>禁用下拉框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>搜索下拉框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>多选下拉框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select4 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select4.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>搜索多选下拉框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select9 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select9.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>下拉框带默认值</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select5 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select5.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>多选下拉框带默认值</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select6 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select6.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>指定使用哪个数据属性的下拉框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select7 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select7.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>自动完成</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select8 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select8.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>自动完成+多选</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Select10 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Select10.js')}
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
