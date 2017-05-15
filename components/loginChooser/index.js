var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Popup = require('../popup')

/**
 * 如果使用OA或QQ两种登录方式则显示此弹层
 */
var LoginChooser = React.createClass({
  propTypes: {
    /**
     * 关闭按钮的文字，例：'关闭'
     */
    textConfirm: React.PropTypes.string,

    /**
     * 点击OA登录按钮的回调，例：function() {}
     */
    onOA: React.PropTypes.func,
    /**
     * 点击QQ登录按钮的回调，例：function() {}
     */
    onQQ: React.PropTypes.func,
    /**
     * 点击关闭按钮的回调，例：function() {}
     */
    onClose: React.PropTypes.func,
  },
  getDefaultProps: function () {
    return {
      text: '',
      textConfirm: '关闭'
    }
  },
  render: function () {
    return (
      <Popup
        name='登录'
        textConfirm={this.props.textConfirm}
        onConfirm={this.props.onClose}
        showCancel={false}
        className={classnames({}, this.props.className)} style={assign({width: 582}, this.props.style)}>
        <div className='login-chooser'>
          <div className='item oa'>
            <div className='bg'>
              <button className="btn btn-default" onClick={this.props.onOA}>
                OA登录
              </button>
              <span>(适用于腾讯内部相关人员)</span>
            </div>
          </div>
          <div className='item qq'>
            <div className='bg'>
              <button className="btn btn-default" onClick={this.props.onQQ}>
                QQ登录
              </button>
              <span>(适用于外包和第三方开发者)</span>
            </div>
          </div>
        </div>
      </Popup>
    )
  }
})

module.exports = LoginChooser
