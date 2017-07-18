var React  = require('react');
var clone = require('clone');

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
            itemData:{
                password:'',
                customTagCode:'',
                phone:13232789215,
            },
            files:[],
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

    _onInputChange: function (value, valuePath, e) {
        var updateData = {};
        updateData[valuePath + ''] = value;
        this._updateItemDataState(updateData);
    },

    _updateItemDataState:function(changeData,callFn){
        var itemData = clone(this.state.itemData);
        for (var key in changeData) {
            if (typeof changeData[key] !== 'undefined' && typeof itemData[key] !== 'undefined'&&itemData[key] !=null) {
                itemData[key] = changeData[key];
            }
        }
        this.setState({itemData:itemData},function(){
            typeof callFn == 'function'&&callFn();
        });
    },

    _onSelectFile: function (e) {
        if (!e.target.files.length) return
        this.state.files = []
        for (var i = 0; i < e.target.files.length; i++) {
            this.state.files.push(e.target.files[i])
        }
        this.forceUpdate()
    },

	render:function(){
		return (
			<div className="content">
				<div className={'none'}>
					<span>loading</span>
					<RLoading type="spinningBubbles" color='#000' height={40} width={40}/>
				</div>
				<div  className={'none'} style={{margin:'10px'}}>
					<input className="btn bg-blue-ws" type="button" value="show loading"
					       onClick={this._showLoading} />
				</div>
				<div  className={'none'} style={{background:'grey',padding:'40px'}}>
					<LoadingCss type={this.state.loadingType}/>
				</div>

				<div  className={'none'}>
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
                                <RaForm.Field
                                    label='代码'
                                    validation={[{type:'required',message:'请填写代码',value:this.state.itemData.customTagCode}]}
                                    >
                                    <RaForm.FormInput
                                        value={this.state.itemData.customTagCode}
                                        valuePrefix={'WS-'}
                                        valuePath={'customTagCode'}
                                        maxLength={30}
                                        onChange={this._onInputChange}
                                        readOnly={!!this.state.itemData.id}
                                        />
                                </RaForm.Field>
                                <RaForm.Field
                                    label='电话'
                                    validation={[{type:'required',message:'请填写电话',value:this.state.itemData.phone}]}
                                    >
                                    <RaForm.FormInput
                                        value={this.state.itemData.phone}
                                        valuePath={'phone'}
                                        maxLength={11}
                                        onChange={this._onInputChange}
                                        readOnly={!!this.state.itemData.id}
                                        />
                                </RaForm.Field>
                                <RaForm.Field
                                    label='上传文件'
                                    validation={[{type:'required',message:'请填写代码',value:this.state.itemData.customTagCode}]}
                                    >
                                    <RaForm.FileInput name='点击上传' onChange={this._onSelectFile} />
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

