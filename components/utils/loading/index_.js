var React  = require('react');
var ReactDom = require('react-dom');

var RLoading = require('../../loading');

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
		type: 'spokes',
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
			type: 'spokes',
		}
	},

	componentWillMount:function(){


	},

	componentDidMount:function(){

	},

	componentWillUnMount:function(){

	},

	show:function(props){
		this.props = Object.assign(this.getDefaultProps(),props);
		this.createLoading();
		var self = this;
		/*setTimeout(function(){
			self.destroy();
		},3000)*/

	},

	createLoading:function(){

		var loadingWarp = document.getElementById('loadingWarp'),
			loadingHtml = '<div class="loading-layer modal"></div><div class="loading-container modal"></div>',
			loadingLayer = document.createElement('div'),
			loadingContainer = document.createElement('div');
		this.props.style.WebkitTransform =  'translateY(' + (document.body.clientHeight-this.props.style.height)/2 + 'px)';
		loadingLayer.className = 'loading-layer modal';
		loadingContainer.className = 'loading-container modal';

		this.props.hasLayer&&loadingWarp.appendChild(loadingLayer);
		//loadingWarp.innerHTML = loadingHtml;
		loadingWarp.appendChild(loadingContainer);
		ReactDom.render(
			(this.state.showLoading?
				<RLoading
					type={this.props.type}
					delay={this.props.delay}
					style={this.props.style}
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