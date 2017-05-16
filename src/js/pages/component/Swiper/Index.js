var React = require('react')

var Code = require('../Code')
var Document = require('../Document')

var Swiper1 = require('./Swiper1')
var Swiper2 = require('./Swiper2')
var Swiper3 = require('./Swiper3')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>轮播 <small className='display-block'>菊花与Ajax请求通过名称直接关联，可以直接使用StoreConfig中定义的数据名</small></h6>
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>水平轮播</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Swiper1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Swiper1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>垂直轮播</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Swiper2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Swiper2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>多条轮播</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Swiper3 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Swiper3.js')}
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
