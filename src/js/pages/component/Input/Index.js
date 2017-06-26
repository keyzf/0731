var React = require('react')

var RaInput = require('radmin').Form.FormInput
var Code = require('../Code')
var Document = require('../Document')

var Input1 = require('./Input1')
var Input2 = require('./Input2')
var Input3 = require('./Input3')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>输入框 <small className='display-block'></small></h6>
        <div className='row'>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>RaInput</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <RaInput prepend="http://" append="$" name="哈哈航" maxLength={20}></RaInput>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>常规输入框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Input1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Input1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>搜索框</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Input2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Input2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>点击编辑</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Input3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Input3.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/searchBar.md' />
                <Document src='component/inlineEdit.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
