'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var ClassNames = require('classnames');

/**
 * 滑动面板
 */

module.exports = React.createClass({
	displayName: 'exports',

	propTypes: {
		/**
   * 弹窗左上角标题，例：'添加项目'
   */
		title: React.PropTypes.string,
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
		footer: React.PropTypes.element,
		/**
   * 弹窗中间内容部分是否使用默认样式，当false时使用children内容，例：true
   */
		layout: React.PropTypes.bool,
		/**
   * 是否点击空白处关闭，例：false
   */
		overlayClose: React.PropTypes.bool,

		/**
   * 点击确定按钮回调，返回true/false例：function() {return true}
   */
		onConfirm: React.PropTypes.func,
		/**
   * 点击关闭按钮回调，例：function() {}
   */
		onClose: React.PropTypes.func,
		/**
   * 点击关闭按钮回调前执行判断函数，例：function() {}
   */
		beforeClose: React.PropTypes.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			title: '',
			showConfirm: true,
			showCancel: true,
			textConfirm: '保存',
			textCancel: '取消',
			onClose: null,
			overlayClose: false,
			layout: true
		};
	},

	getInitialState: function getInitialState() {
		return {
			in: true,
			dialogTop: 0,
			lastHeight: 0
		};
	},

	componentWillMount: function componentWillMount() {},
	componentDidMount: function componentDidMount() {},

	componentDidUpdate: function componentDidUpdate() {},

	_onConfirm: function _onConfirm() {
		/*	if(typeof this.props.onConfirm == 'function'?this.props.onConfirm():true){
  		this._onClose();
  	}*/
		typeof this.props.onConfirm == 'function' && this.props.onConfirm();
	},

	_onClose: function _onClose() {
		if (this._beforeClose()) {
			/*this.setState({
   	in: false
   });*/
			typeof this.props.onClose == 'function' && this.props.onClose();
		}
	},

	_onBackgroundClick: function _onBackgroundClick(e) {
		var self = this;
		if (this.props.overlayClose && e.target == ReactDom.findDOMNode(this.refs.panel)) {
			self._onClose();
		}
	},

	_beforeClose: function _beforeClose() {
		return typeof this.props.beforeClose == 'function' ? this.props.beforeClose() : true;
	},

	render: function render() {
		var panelStyle = {
			width: this.props.style && this.props.style.width ? this.props.style.width : 500
		};

		return React.createElement(
			'div',
			{
				ref: 'slidePanel',
				className: ClassNames({}, this.props.className) },
			React.createElement('div', { className: this.state.in ? 'modal-backdrop fade in' : 'modal-backdrop fade' }),
			React.createElement(
				'div',
				{ className: this.state.in ? 'modal animated fadeInRight' : 'modal animated fadeOutRight', ref: 'panel', onClick: this._onBackgroundClick },
				React.createElement(
					'div',
					{ className: 'modal-slide-panel', ref: 'dialog', style: panelStyle },
					this.props.layout ? React.createElement(
						'div',
						{ className: 'slide-panel-content' },
						React.createElement(
							'div',
							{ className: 'slide-panel-header', style: { zIndex: 1 } },
							this.props.title,
							React.createElement(
								'a',
								{ type: 'button', className: 'close', onClick: this._onClose },
								React.createElement('i', { className: 'icon-cross2', style: { fontSize: 14 } })
							)
						),
						React.createElement(
							'div',
							{ className: 'slide-panel-body', style: { maxHeight: this.props.maxContentHeight || 'auto' } },
							this.props.children
						),
						typeof this.props.footer !== 'undefined' ? this.props.footer : React.createElement(
							'div',
							{ className: 'slide-panel-footer' },
							this.props.showCancel ? React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-default', onClick: this._onClose },
								this.props.textCancel
							) : null,
							this.props.showConfirm ? React.createElement(
								'button',
								{ type: 'button', className: 'btn bg-blue-ws', onClick: this._onConfirm },
								this.props.textConfirm
							) : null
						)
					) : this.props.children
				)
			)
		);
	}
});