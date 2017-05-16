var React = require('react')

var Utils = require('radmin').Utils

var Code = require('../Code')
var Document = require('../Document')

var Button1 = require('./Button1')
var Button2 = require('./Button2')
var Button3 = require('./Button3')
var Button4 = require('./Button4')
var Button5 = require('./Button5')
var Button6 = require('./Button6')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>按钮样式 <small className='display-block'>Basic button layout options</small></h6>
        <div className='row'>
          <div className='col-md-6'>

            <div className='panel panel-body border-top-primary'>
              <h6 className='no-margin text-semibold text-center'>普通按钮</h6>
              <p className='text-muted content-group-sm text-center'>
                普通浅色按钮样式
              </p>
              <div className='text-center'>
                <Button1 />
              </div>
              <Code>
                {require('!raw-loader!./Button1.js')}
              </Code>
            </div>

            <div className='panel panel-body border-top-primary'>
              <h6 className='no-margin text-semibold text-center'>带下拉菜单按钮样式</h6>
              <p className='text-muted content-group-sm text-center'>
                点击弹出下拉菜单
              </p>
              <div className='text-center'>
                <Button3 />
              </div>
              <Code>
                {require('!raw-loader!./Button3.js')}
              </Code>
            </div>

            <div className='panel panel-body border-top-primary'>
              <h6 className='no-margin text-semibold text-center'>带颜色按钮</h6>
              <p className='text-muted content-group-sm text-center'>
                default,primary,info,warning,error
              </p>
              <div className='text-center'>
                <Button4 />
              </div>
              <Code>
                {require('!raw-loader!./Button4.js')}
              </Code>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='panel panel-body border-top-primary'>
              <h6 className='no-margin text-semibold text-center'>带图标按钮样式</h6>
              <p className='text-muted content-group-sm text-center'>
                可以两边加图标
              </p>
              <div className='text-center'>
                <Button2 />
              </div>
              <Code>
                {require('!raw-loader!./Button2.js')}
              </Code>
            </div>

            <div className='panel panel-body border-top-primary'>
              <h6 className='no-margin text-semibold text-center'>扁平化按钮</h6>
              <p className='text-muted content-group-sm text-center'>
                扁平化按钮
              </p>
              <div className='text-center'>
                <Button5 />
              </div>
              <Code>
                {require('!raw-loader!./Button5.js')}
              </Code>
            </div>

            <div className='panel panel-body border-top-primary'>
              <h6 className='no-margin text-semibold text-center'>椭圆按钮</h6>
              <p className='text-muted content-group-sm text-center'>
                椭圆按钮
              </p>
              <div className='text-center'>
                <Button6 />
              </div>
              <Code>
                {require('!raw-loader!./Button6.js')}
              </Code>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
