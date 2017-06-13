var React  = require('react');

var Utils = require('radmin').Utils;
var SlidePanel = require('radmin').SlidePanel;
var RaForm = require('radmin').Form;
var RLoading = require('radmin').Loading;
var RaNavigator = require('radmin').Navigator;

var LoadingCss = require('radmin').LoadingCss;
var LinkageSelect = require('radmin').LinkageSelect;

var UiConfig = require('../../config/UiConfig');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			showSlidePanel: false,
			loadingType:'ball-pulse',
			loadingNum:0,
		}
	},

	getDefaultProps: function () {
		return {
			canDel: false,
		};
	},
	Types: [
		"ball-pulse",
		"ball-grid-pulse",
		"ball-clip-rotate",
		"ball-clip-rotate-pulse",
		"square-spin",
		"ball-clip-rotate-multiple",
		"ball-pulse-rise",
		"ball-rotate",
		"cube-transition",
		"ball-zig-zag",
		"ball-zig-zag-deflect",
		"ball-triangle-path",
		"ball-scale",
		"line-scale",
		"line-scale-party",
		"ball-scale-multiple",
		"ball-pulse-sync",
		"ball-beat",
		"line-scale-pulse-out",
		"line-scale-pulse-out-rapid",
		"ball-scale-ripple",
		"ball-scale-ripple-multiple",
		"ball-spin-fade-loader",
		"line-spin-fade-loader",
		"triangle-skew-spin",
		"pacman",
		"ball-grid-beat",
		"semi-circle-spin"
    ],
	_tabChange:function(){
		console.log('on change -----')
	},
	_showSlidePanel: function () {
		console.log('slidePanel',SlidePanel)
		this.setState({showSlidePanel: true});
	},

	_closePanel: function () {
		this.setState({showSlidePanel: false});
		console.log('_closePanel~~~')
	},

	_onConfirm: function () {
		console.log('onConfirm~~~')
	},

	_getConfig: function () {
		return [
			{
				text: '第一项',
				alias: 'component-navigator',
				url: '/component/navigator',
				value:[
					{
						text: '第一项【01】',
						alias: 'component-navigator-2',
						url: '/component/navigator/2',
						value:[
							{
								text: '第一项【01】【01】',
								alias: 'component-navigator-3',
								url: ['/component/navigator/3', '/component/navigator/4']
							},
							{
								text: '第一项【01】【02】',
								alias: 'component-navigator-3',
								url: ['/component/navigator/3', '/component/navigator/4']
							},
						]
					}, {
						text: '第一项【01】',
						alias: 'component-navigator-3',
						url: ['/component/navigator/3', '/component/navigator/4']
					}
				]
			}, {
				text: '第二项',
				alias: 'component-navigator-2',
				url: '/component/navigator/2'
			}, {
				text: '第三项',
				alias: 'component-navigator-3',
				url: ['/component/navigator/3', '/component/navigator/4']
			}
		]
	},
	_redirect: function (url, alias) {
		Utils.redirect(UiConfig.hashSymbol + url)
	},

	_showLoading:function(){
		Utils.Loading.show();
	},

	_changeLoading:function(){
		var loadingNum = this.state.loadingNum;

		if(this.state.loadingNum < this.Types.length - 1){
			loadingNum++;
		}else{
			loadingNum = 0;
		}
		console.log('loadingNum',loadingNum);
		console.log('loadingType',this.Types[loadingNum]);
		this.setState({
			loadingType:this.Types[loadingNum],
			loadingNum:loadingNum
		},function(){
			console.log('this.state.',this.state)
		})
	},

	render:function(){
		return (
			<div className="content">
				<div>
					<span>loading</span>
					<RLoading type="spinningBubbles" color='#000' height={40} width={40}/>
				</div>
				<div style={{margin:'10px'}}>
					<input className="btn bg-blue-ws" type="button" value="show loading"
					       onClick={this._showLoading} />
				</div>
				<div style={{background:'grey',padding:'40px'}}>
					<LoadingCss type={this.state.loadingType}/>
				</div>

				<div>
					<input className="btn bg-blue-ws" type="button" value="change loading"
					       onClick={this._changeLoading} />
				</div>
				<br/>
				<div>
					<input className="btn bg-blue-ws" type="button" value="show a slidePanel"
					       onClick={this._showSlidePanel}/>
					{this.state.showSlidePanel ?
						<SlidePanel
							style={{"width":800}}
							title={"新建用户"}
							overlayClose={true}
							beforeClose={function(){
                                console.log('beforeClose----')
                                return true;
                            }}
							onClose={this._closePanel}
							onConfirm={this._onConfirm}
							>
							<RaForm
								data={this.state.itemData}
								vertical={false}
								labelCol={2}
								contentCol={9}
								buttonAlign='center'
								>
								<RaForm.Field
									label='设置密码'
									>
									<RaForm.FormPassword
										type='password'
										maxLength={16}
										/>
								</RaForm.Field>
							</RaForm>
						</SlidePanel> : null}
				</div>
				<div>
					<span>LinkageSelect</span>
					<div>
						<LinkageSelect
							useAreaData={true}
							/>
					</div>

				</div>
			</div>
		)
	}
});

