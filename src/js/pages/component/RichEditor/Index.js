var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Editor1 = require('./Editor1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>富文本编辑器 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'><a href="https://www.tinymce.com/">TinyMCE Editor</a></h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Editor1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Editor1.js')}
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
