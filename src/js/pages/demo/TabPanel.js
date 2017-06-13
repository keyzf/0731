var React  = require('react');

var Utils = require('radmin').Utils;
var RaTabs =  require('radmin').Tabs;

var  StoreConfig = require('../../config/StoreConfig');
var DemoStore =  require('../../stores/DemoStore');
var DemoAction = require('../../actions/DemoAction');

var ListPage = require('./ListItems');
var ServerPage = require('./SeverTest');

module.exports = React.createClass({
    _tabChange:function(){
        console.log('on change -----')
    },
    render:function(){
        return (
            <RaTabs onChange={this._tabChange}>
                <RaTabs.Tab name="评价回复">
                    <ListPage></ListPage>
                </RaTabs.Tab>
                <RaTabs.Tab name="账号管理">
                    <ServerPage></ServerPage>
                </RaTabs.Tab>
                <RaTabs.Tab name="评价数据">
                    评价数据
                </RaTabs.Tab>
                <RaTabs.Tab name="评价素材">
                    评价素材
                </RaTabs.Tab>
            </RaTabs>
        )
    }
});

