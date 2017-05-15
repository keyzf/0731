var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')

/**
 * 标准弹出框，一般作为自定义弹出框的基础组件
 */
var Popup = React.createClass({
  propTypes: {
    /**
     * 弹窗左上角标题，例：'添加项目'
     */
    title: React.PropTypes.any,
    /**
     * 是否显示确定按钮，例：true
     */
    showConfirm: React.PropTypes.bool,
    /**
     * 是否显示取消按钮，例：true
     */
    showCancel: React.PropTypes.bool,
    /**
     * 确定按钮的文本信息，例：'确定'
     */
    textConfirm: React.PropTypes.string,
    /**
     * 取消按钮的文本信息，例：'取消'
     */
    textCancel: React.PropTypes.string,
    /**
     * 中间内容部分的最大高度，超出最大高度会显示滚动条，例：400
     */
    maxContentHeight: React.PropTypes.number,
    /**
     * 自定义底部元素内容，例<div></div>
     */
    foot: React.PropTypes.element,
    /**
     * 弹窗中间内容部分是否使用默认样式，当false时使用children内容，例：true
     */
    layout: React.PropTypes.bool,
    /**
     * 是否点击空白处关闭，例：false
     */
    overlayClose: React.PropTypes.bool,

    /**
     * 点击确定按钮回调，例：function() {}
     */
    onConfirm: React.PropTypes.func,
    /**
     * 点击取消按钮回调，例：function() {}
     */
    onCancel: React.PropTypes.func,
    /**
     * 点击关闭按钮回调，例：function() {}
     */
    onClose: React.PropTypes.func,
    /**
     * 是否阻止滚轮事件向下传递，例：true
     */
    preventWheelEvent: React.PropTypes.bool,
  },
  getDefaultProps: function () {
    return {
      title: '',
      showConfirm: true,
      showCancel: true,
      textConfirm: '确定',
      textCancel: '取消',
      onClose: null,
      overlayClose: false,
      layout: true,
      preventWheelEvent: true
    }
  },
  getInitialState: function () {
    return {
      in: false,
      dialogTop: 0,
      lastHeight: 0
    }
  },
  componentDidMount: function () {
    var self = this

    setTimeout(function () {
      self.setState({
        in: true
      })
    }, 10)

    this._moveToCenter()
  },
  componentDidUpdate: function () {
    this._moveToCenter()

    if (this.props.preventWheelEvent) {
      
    }
  },
  _moveToCenter: function () {
    var self = this
    var height = ReactDom.findDOMNode(this.refs.dialog).offsetHeight
    if (this.state.lastHeight != height) {
      this.state.lastHeight = height
      setTimeout(function () {
        self.setState({
          dialogTop: parseInt(height / 2)
        })
      }, 10)
    }
  },
  _onConfirm: function () {
    var self = this
    this.setState({
      in: false
    })
    ReactDom.findDOMNode(this.refs.panel).addEventListener('webkitTransitionEnd', function () {
      if (typeof self.props.onConfirm === 'function') {
        self.props.onConfirm()
      }
    })
  },
  _onClose: function () {
    var self = this
    this.setState({
      in: false
    })
    ReactDom.findDOMNode(this.refs.panel).addEventListener('webkitTransitionEnd', function () {
      if (typeof self.props.onClose === 'function') {
        self.props.onClose()
      } else if (typeof self.props.onCancel === 'function') {
        self.props.onCancel()
      }
    })
  },
  _onBackgroundClick: function (e) {
    var self = this
    if (this.props.overlayClose && e.target == ReactDom.findDOMNode(this.refs.panel)) {
      self._onClose()
    }
  },
  _onWheel: function(event) {
    if (this.props.preventWheelEvent) {
      event.preventDefault()
    }
  },
  render: function () {
    var panelStyle = {
      width: this.props.style && this.props.style.width ? this.props.style.width : 500,
      WebkitTransform: 'translateY(-' + this.state.dialogTop + 'px)'
    }
    
    return (
      <div
        ref='popup'
        className={classnames({}, this.props.className)}
        style={assign({width: panelStyle.width}, this.props.style)}
        onWheel={this.props._onWheel || this._onWheel}>
        <div className={this.state.in ? 'modal-backdrop fade in' : 'modal-backdrop fade'}>
        </div>
        <div className={this.state.in ? 'modal fade in' : 'modal fade'} ref='panel' onClick={this._onBackgroundClick}>
          <div className='modal-dialog' ref='dialog' style={panelStyle}>
            {this.props.layout ?
               <div className='modal-content'>
                 <div className='modal-header' style={{zIndex: 1}}>
                   {this.props.title}
                   {this.props.showCancel && (this.props.onClose || this.props.onCancel) ?
                      <a type='button' className='close' onClick={this._onClose}><i className='iconfont icon-close' style={{fontSize: 14}}></i></a>
                      :
                      null}
                 </div>
                 <div className='modal-body' style={{ maxHeight: this.props.maxContentHeight || 'auto'}}>
                   {this.props.children}
                 </div>
                 {typeof this.props.footer !== 'undefined' ?
                    this.props.footer
                    :
                    <div className='modal-footer'>
                      {this.props.showCancel ? <button type='button' className='btn btn-link' onClick={this._onClose}>
                                                 {this.props.textCancel}
                                               </button> : null}
                      {this.props.showConfirm ? <button type='button' className='btn btn-primary' onClick={this._onConfirm}>
                                                  {this.props.textConfirm}
                                                </button> : null}
                    </div>}
               </div>
               : this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Popup
