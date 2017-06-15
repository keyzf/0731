var React  = require('react');
var ReactDom = require('react-dom');
var Assign = require('object-assign');

var LoadingCss = require('../../loadingCss');

var Loading = function (){
	//this.props = Object.assign(this.getDefaultProps(),props);
	this.componentWillMount();
};
Object.assign(Loading.prototype,{
	props:{
		style:{
			fill: '#44b549',
			height: 60,
			width: 60
		},
		hasLayer:true,
		delay: 1000,
		type: 'ball-spin-fade-loader',
	},

	state:{
		showLoading:true,
		loadingBarTop:0,
	},

	getDefaultProps:function(){
		return {
			style:{
				fill: '#44b549',
				height: 60,
				width: 60,
				margin:'0 auto'
			},
			hasLayer:true,
			delay: 1000,
			type: 'ball-spin-fade-loader',
		}
	},

	componentWillMount:function(){


	},

	componentDidMount:function(){

	},

	componentWillUnMount:function(){

	},

	show:function(props){
		this.props = Assign(this.getDefaultProps(),props);
		this.createLoading();
		var self = this;
		/*setTimeout(function(){
			self.destroy();
		},3000)*/

	},

	createLoading:function(){

		var loadingWarp = document.getElementById('loadingWarp'),
			loadingLayer = document.createElement('div'),
			loadingContainer = document.createElement('div');
		loadingLayer.className = 'loading-layer modal';
		loadingContainer.className = 'loading-container modal';

		this.props.hasLayer&&loadingWarp.appendChild(loadingLayer);
		loadingWarp.appendChild(loadingContainer);
		ReactDom.render(
			(this.state.showLoading?
				<LoadingCss
					type={this.props.type}
					/>:<div></div>),loadingContainer
		);
		this.state.loadingWarp = loadingWarp;
	},

	destroy :function () {
		var loadingContainerDom = document.getElementById('loadingWarp');
		if(loadingContainerDom){
			ReactDom.unmountComponentAtNode(loadingContainerDom);
			//loadingContainerDom.remove();
		}
	},

});

module.exports = new Loading();