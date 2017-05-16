var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Chart1 = require('./Chart1')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>图表 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>Spline with plot bands</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Chart1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Chart1.js')}
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
