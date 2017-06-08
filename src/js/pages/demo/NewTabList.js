var React = require('react');
var Utils = require('radmin').Utils;

var NewTabs =  require('radmin').NewTabs;

var FormDemo = require('./FormDemo');
var EditorDemo = require("./EditorDemo");
var TreeDemo = require("./TreeDemo");
var TreeSelect = require("./TreeSelect");
var StoreTest = require("./StoreTest");
var Select = require('./SelectTest');
var ImgDemo = require('./ImgDemo');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			showSlidePanel: false,
		}
	},

	getDefaultProps: function () {
		return {

			canDel: false,
		};
	},

	componentWillMount: function () {
		console.log('------------')
		//console.log(Utils.loading)
	},

	componentDidMount: function () {

	},

	componentWillUnmount: function () {

	},



	_getTabs:function(){
		var tabs = [
            {
                name:'ImgDemo',
                //noClose:true,
                content:<ImgDemo />
            },
			{
				name:'FormDemo',
				noClose:true,
				content:<FormDemo />
			},
			{
				name:'EditorDemo',
				//noClose:true,
				content:<EditorDemo />
			},
			{
				name:'TreeDemo',
				//noClose:true,
				content:<TreeSelect />
			},
			{
				name:'StoreTest',
				//noClose:true,
				content:<StoreTest />
			},
			
			{
				name:'Select',
				//noClose:true,
				content:<Select />
			},

		];
		return tabs;
	},


	render: function () {
		return (
				<NewTabs
					ref='tabList'
					tabData={this._getTabs()}
					unicity={true}
					/>
		)
	}
});