var React = require('react');

var MockJs = require('mockjs');
var Utils = require('radmin').Utils;

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},

	getDefaultProps: function () {
		return {};
	},

	componentWillMount: function () {
		MockJs.mock('/mockTest', {
			'name'     : '@name',
			'age|1-100': 100,
			'color'    : '@color'
		});
	},

	componentDidMount: function () {

	},

	componentWillUnmount: function () {

	},

	componentWillReceiveProps: function (nextProps) {

	},

	_testAjax:function(){
		console.log('test ajax')
		Utils.ajax({
			url: '/mockTest',
			data: {
				tp:0,
				cp:'gx'
			},
			success: function(msg) {
				console.log(msg)
			},
			error: function(msg) {
				console.error('ajax err !!',msg)
			}
		});
	},

	render: function () {
		return (
			<div className="">
				<a href='javascrip:;' onClick={this._testAjax}>Test mock</a>
			</div>
		)
	}
});