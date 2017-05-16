var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var TreeSelect1 = require('./TreeSelect1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>树型选择器 <small className='display-block'>支持可选子树</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>Tree select</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <TreeSelect1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./TreeSelect1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/treeSelect.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
