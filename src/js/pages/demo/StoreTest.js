var React = require('react');

var Utils = require('radmin').Utils;

module.exports = React.createClass({
	getInitialState: function () {
		var StoreTest = Utils.createStore();

		StoreTest.register('STORE_TEST_ONE');
		StoreTest.register('STORE_TEST_TWO');
		return {
			StoreTest:StoreTest,
		}
	},

	getDefaultProps: function () {
		return {};
	},

	componentWillMount: function () {


	},

	componentDidMount: function () {
		this.state.StoreTest.addChangeListener(this._updateState);
	},

	componentWillUnmount: function () {

	},

	componentWillReceiveProps: function (nextProps) {

	},

	_updateState:function(){
		var data1 = this.state.StoreTest.getData('STORE_TEST_ONE'),
			data2 = this.state.StoreTest.getData('STORE_TEST_TWO');
		console.log('data1 is  ~~',data1);
		console.log('data2 is  ~~',data2);
	},

	_changeStoreData:function(type){
		if(type == 1){
			Utils.saveToStore({
				type: 'STORE_TEST_ONE',
				data: {
					dateTime1: new Date() * 1
				}
			});
		}else if(type == 2){
			Utils.saveToStore({
				type: 'STORE_TEST_TWO',
				data: {
					dateTime2: new Date() * 1
				}
			});
		}else if(type == 3){
			Utils.saveToStore({
				type: 'STORE_TEST_ONE',
				data: {
					dateTime3: new Date() * 1
				}
			},true);
		}
	},

	render: function () {
		var self = this;
		return (
			<div className="">
					<div className=''>
						<a href='javascript:;' onClick={function(){
							self._changeStoreData(1);
						}}>change data of one</a>
					</div>
					<div className=''>
						<a href='javascript:;' onClick={function(){
							self._changeStoreData(2);
						}}>change data of two</a>
					</div>
					<div className=''>
						<a href='javascript:;' onClick={function(){
							self._changeStoreData(3);
						}}>change part data of one </a>
					</div>
			</div>
		)
	}
});