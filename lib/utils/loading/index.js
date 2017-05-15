'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var LoadingCss = require('../../loadingCss');

var Loading = function Loading() {
	//this.props = Object.assign(this.getDefaultProps(),props);
	this.componentWillMount();
};
Object.assign(Loading.prototype, {
	props: {
		style: {
			fill: '#44b549',
			height: 60,
			width: 60
		},
		hasLayer: true,
		delay: 1000,
		type: 'ball-spin-fade-loader'
	},

	state: {
		showLoading: true,
		loadingBarTop: 0
	},

	getDefaultProps: function getDefaultProps() {
		return {
			style: {
				fill: '#44b549',
				height: 60,
				width: 60,
				margin: '0 auto'
			},
			hasLayer: true,
			delay: 1000,
			type: 'ball-spin-fade-loader'
		};
	},

	componentWillMount: function componentWillMount() {},

	componentDidMount: function componentDidMount() {},

	componentWillUnMount: function componentWillUnMount() {},

	show: function show(props) {
		this.props = Object.assign(this.getDefaultProps(), props);
		this.createLoading();
		var self = this;
		/*setTimeout(function(){
  	self.destroy();
  },3000)*/
	},

	createLoading: function createLoading() {

		var loadingWarp = document.getElementById('loadingWarp'),
		    loadingLayer = document.createElement('div'),
		    loadingContainer = document.createElement('div');
		loadingLayer.className = 'loading-layer modal';
		loadingContainer.className = 'loading-container modal';

		this.props.hasLayer && loadingWarp.appendChild(loadingLayer);
		loadingWarp.appendChild(loadingContainer);
		ReactDom.render(this.state.showLoading ? React.createElement(LoadingCss, {
			type: this.props.type
		}) : React.createElement('div', null), loadingContainer);
		this.state.loadingWarp = loadingWarp;
	},

	destroy: function destroy() {
		var loadingContainerDom = document.getElementById('loadingWarp');
		if (loadingContainerDom) {
			ReactDom.unmountComponentAtNode(loadingContainerDom);
			//loadingContainerDom.remove();
		}
	}

});

module.exports = new Loading();