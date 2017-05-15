'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');

/**
 * 标准弹出框，一般作为自定义弹出框的基础组件
 */
var Popup = React.createClass({
  displayName: 'Popup',

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
    preventWheelEvent: React.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      title: '',
      showConfirm: true,
      showCancel: true,
      textConfirm: '确定',
      textCancel: '取消',
      onClose: null,
      overlayClose: false,
      layout: true,
      autoClose: true,
      preventWheelEvent: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      in: false,
      dialogTop: 0,
      lastHeight: 0
    };
  },
  componentDidMount: function componentDidMount() {
    var self = this;

    setTimeout(function () {
      self.setState({
        in: true
      });
    }, 10);

    this._moveToCenter();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._moveToCenter();

    if (this.props.preventWheelEvent) {}
  },
  _moveToCenter: function _moveToCenter() {
    var self = this;
    var height = ReactDom.findDOMNode(this.refs.dialog).offsetHeight;
    if (this.state.lastHeight != height) {
      this.state.lastHeight = height;
      setTimeout(function () {
        self.setState({
          dialogTop: parseInt(height / 2)
        });
      }, 10);
    }
  },
  _onConfirm: function _onConfirm() {
    var self = this;
    if (this.props.autoClose) {
      this.setState({
        in: false
      });
      ReactDom.findDOMNode(this.refs.panel).addEventListener('webkitTransitionEnd', function () {
        self.props.onConfirm();
      });
    } else {
      typeof this.props.onConfirm == 'function' && this.props.onConfirm();
    }
  },
  _onClose: function _onClose() {
    var self = this;
    if (this.props.autoClose) {
      this.setState({
        in: false
      });
      ReactDom.findDOMNode(this.refs.panel).addEventListener('webkitTransitionEnd', function () {
        typeof self.props.onClose === 'function' ? self.props.onClose() : self.props.onCancel();
      });
    } else {
      typeof self.props.onClose === 'function' ? self.props.onClose() : self.props.onCancel();
    }
  },
  _onBackgroundClick: function _onBackgroundClick(e) {
    var self = this;
    if (this.props.overlayClose && e.target == ReactDom.findDOMNode(this.refs.panel)) {
      self._onClose();
    }
  },
  _onWheel: function _onWheel(event) {
    if (this.props.preventWheelEvent) {
      event.preventDefault();
    }
  },
  render: function render() {
    var panelStyle = {
      width: this.props.style && this.props.style.width ? this.props.style.width : 500,
      WebkitTransform: 'translateY(-' + this.state.dialogTop + 'px)'
    };

    return React.createElement(
      'div',
      {
        ref: 'popup',
        className: classnames({}, this.props.className),
        style: assign({ width: panelStyle.width }, this.props.style),
        onWheel: this.props._onWheel || this._onWheel },
      React.createElement('div', { className: this.state.in ? 'modal-backdrop fade in' : 'modal-backdrop fade' }),
      React.createElement(
        'div',
        { className: this.state.in ? 'modal fade in' : 'modal fade', ref: 'panel', onClick: this._onBackgroundClick },
        React.createElement(
          'div',
          { className: 'modal-dialog', ref: 'dialog', style: panelStyle },
          this.props.layout ? React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement(
              'div',
              { className: 'modal-header', style: { zIndex: 1 } },
              this.props.title,
              this.props.showCancel && (this.props.onClose || this.props.onCancel) ? React.createElement(
                'a',
                { type: 'button', className: 'close', onClick: this._onClose },
                React.createElement('i', { className: 'icon-cross2', style: { fontSize: 14 } })
              ) : null
            ),
            React.createElement(
              'div',
              { className: 'modal-body', style: { maxHeight: this.props.maxContentHeight || 'auto' } },
              this.props.children
            ),
            typeof this.props.footer !== 'undefined' ? this.props.footer : React.createElement(
              'div',
              { className: 'modal-footer' },
              this.props.showCancel ? React.createElement(
                'button',
                { type: 'button', className: 'btn btn-link', onClick: this._onClose },
                this.props.textCancel
              ) : null,
              this.props.showConfirm ? React.createElement(
                'button',
                { type: 'button', className: 'btn btn-primary', onClick: this._onConfirm },
                this.props.textConfirm
              ) : null
            )
          ) : this.props.children
        )
      )
    );
  }
});

module.exports = Popup;