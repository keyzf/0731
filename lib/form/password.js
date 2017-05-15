'use strict';

/**
 * Created by zeezhang on 2016/12/9.
 */
var React = require('react');
var clone = require('clone');

var Utils = require('../utils');
var Input = require('./input');

module.exports = React.createClass({
	displayName: 'exports',

	propTypes: {
		onChange: React.PropTypes.func
	},
	getInitialState: function getInitialState() {
		return {
			counterStr: '',
			value: '',
			type: 'password',
			passwordRankLevel: 0,
			viewClass: 'view-control icon-eye4'
		};
	},

	getDefaultProps: function getDefaultProps() {
		return {
			maxLength: 0,
			placeholder: null,
			value: '',
			valuePath: '',
			showViewControl: true,
			showLevelTip: false
		};
	},

	passwordRankData: {
		level0: {
			className: 'password-rank-view level-week',
			title: '极弱',
			tips: '极弱：长度6位以上，不可以为9位以下纯数字'
		},
		level1: {
			className: 'password-rank-view level-low',
			title: '弱',
			tips: '弱：试试字母、数字、标点混搭'
		},
		level2: {
			className: 'password-rank-view level-middle',
			title: '中',
			tips: '中强：试试字母、数字、标点混搭'
		},
		level3: {
			className: 'password-rank-view level-hight',
			title: '强',
			tips: '强：请牢记您的密码'
		}
	},

	componentWillMount: function componentWillMount() {
		this.state.counterStr = this.props.value.length + '/' + this.props.maxLength;
		this.state.value = this.props.value;
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.state.counterStr = (nextProps.value + '').length + '/' + nextProps.maxLength;
		this.state.value = nextProps.value;
	},

	_onChange: function _onChange(e) {

		var value = e.target.value,
		    len = value.length,
		    counterStr = '',
		    passwordRankLevel = Utils.FormUtil.getPasswordRank(value);
		if (this.props.maxLength > 0) {
			if (len <= this.props.maxLength) {
				counterStr = len + '/' + this.props.maxLength;
				typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath, e);
				this.setState({
					counterStr: counterStr,
					value: value,
					passwordRankLevel: passwordRankLevel
				});
			}
		} else {
			typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath, e);
			this.setState({
				value: value,
				passwordRankLevel: passwordRankLevel
			});
		}
	},

	_viewControl: function _viewControl(e) {
		var className = '',
		    type = '';
		if (this.state.type == 'password') {
			type = 'text';
			className = 'view-control icon-eye-blocked';
		} else {
			type = 'password';
			className = 'view-control icon-eye4';
		}
		this.setState({
			type: type,
			viewClass: className
		});
		return className == 'view-control icon-eye4' ? 'view-control icon-eye4' : 'view-control icon-eye-blocked';
	},

	_onKeyDown: function _onKeyDown(e) {
		typeof this.props.onKeyDown == 'function' && this.props.onKeyDown(e);
	},

	render: function render() {
		var nowRankData = this.passwordRankData['level' + this.state.passwordRankLevel];
		return React.createElement(
			'div',
			{ className: 'form-input-content' },
			React.createElement('input', {
				type: this.state.type,
				className: 'form-input form-control',
				value: this.state.value,
				onChange: this._onChange,
				onKeyUp: this._onKeyDown,
				name: this.props.valuePath,
				maxLength: this.props.maxLength ? this.props.maxLength : null,
				placeholder: this.props.placeholder ? this.props.placeholder : null }),
			React.createElement(
				'span',
				{ className: 'addons-container' },
				React.createElement('span', { className: this.state.viewClass, style: { color: '#aaa' }, onClick: this._viewControl }),
				this.props.maxLength ? React.createElement(
					'span',
					{ className: 'input-counter' },
					this.state.counterStr
				) : null
			),
			this.props.showLevelTip && nowRankData && this.state.value.length ? React.createElement(
				'div',
				{ className: 'password-rank-container' },
				React.createElement(
					'div',
					{ className: nowRankData['className'], 'data-level': nowRankData['tips'] },
					React.createElement('span', { className: 'view-first' }),
					React.createElement('span', { className: 'view-second' }),
					React.createElement('span', { className: 'view-third' })
				)
			) : null
		);
	}
});