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
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
            console.log('i catch you !',url);
            this.addEventListener("readystatechange", function() {
                //console.log('ajax----',this)
                if (this.readyState == 4) {
                    // console.log(this.status);
                    if (this.status == 401) {
                        location.href = ssoLoginUrl + '?target=' + location.href;
                    }
                };
            }, false);
            open.call(this, method, url, async, user, pass);
        };
		/*MockJs.mock(/^\/mockTest/, {
			'code':100000,
			'list|1-10': [{
				'id|+1': 1,
				'email': '@EMAIL'
			}]
		});*/

	},

	componentDidMount: function () {

	},

	componentWillUnmount: function () {

	},

	componentWillReceiveProps: function (nextProps) {

	},

	_testAjax:function(){
        console.log('XMLHttpRequest',window.XMLHttpRequest.open);
		console.log('has click~~~')
		Utils.ajax({
			url: 'http://localhost:8005/mockTest',
			data:{
				size:10,
				name:'zee'
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