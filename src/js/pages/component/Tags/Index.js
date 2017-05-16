var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Tags1 = require('./Tags1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>标签</h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标签 Tags</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Tags1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Tags1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/tags.md' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
