var React = require('react');
var clone = require('clone');

var Utils = require('radmin').Utils;
var RaTable = require('radmin').Table;

var UiConfig = require('../../config/UiConfig');
var StoreConfig = require('../../config/StoreConfig');
var DemoStore = require('../../stores/DemoStore');
var DemoAction = require('../../actions/DemoAction');
var EditItem = require('./EditItem');

module.exports = React.createClass({
    getInitialState:function(){
        return {
            limit:UiConfig.pageLimit,
            itemListData:[],
            editItem:false,
            pageIndex:0,
            count:0,
            item_id:null
        }
    } ,

    componentDidMount: function() {
        DemoStore.addChangeListener(this._update);

        this._getItemList();
    },
    componentWillUnmount: function() {
        DemoStore.removeChangeListener(this._update);
    },
    _update: function() {
        var data = DemoStore.getData(StoreConfig.STORE_DEMO_SERVER_LIST_DATA);
        this.setState({itemListData: data.list,count:data.count});
    },
    _showEditItemPopup: function() {
        this.setState({editItem: true, item_id: null});
    },
    _onEditItemCancel: function() {
        this.setState({editItem: false, item_id: null});
    },
    _onEditItemConfirm: function() {
        this.setState({editItem: false, item_id: null});

        //this._getItemList();
    },
    _getItemList: function() {
        DemoAction.getList();
    },
    _edit: function(item_id) {
        Utils.prompt({
            text: '编辑'
        });
    },
    _delete: function(index,rowData) {
        Utils.confirm({
            text: '是否删除？',
            onConfirm: function() {
                DemoAction.del(index,rowData);
            }
        });
    },

    _onPageChange: function(pageLimit,pageIndex) {
        this.setState({pageIndex: pageIndex}, function() {
            this._getItemList();
        });
    },
    _onPageLimitChange: function(limit,pageIndex) {

        this.setState({limit:limit,pageIndex:pageIndex},function(){
            this._getItemList();
        });
    },

    _format:function(){
        var data = clone(this.state.itemListData);
        if (data instanceof Array) {
            data = data.map(function(obj) {
                //自定义表格内容可按如下方式处理
                //obj.zzjgdmz = (<img src={obj.zzjgdmz}></img>);
                return obj;
            });
        }
        return data;
    },

    render:function(){
        return (
            <div className='content'>
                <div className ='content-head'>
                    <div>
                        <button className="btn btn-primary" onClick={this._showEditItemPopup}>新建</button>
                    </div>
                </div>
                <div className ='content-body'>
                    <RaTable
                        data={this._format()}
                        pagination={
                            {
                                limit:this.state.limit,//一页数据量
                                async:true,//是否从后台获取数据
                                offset:this.state.pageIndex,//页数
                                total:this.state.count,//总数
                                onPageChange:this._onPageChange,//切换页码
                                onPageLimitChange:this._onPageLimitChange//一页数量大小修改
                            }
                        }
                        selectRow={{enable:true}}
                        addRow={false}
                        deleteRow={false}
                        action={[
                          {content:(<i className="icon tb-icon" title="修改"></i>), action:this._edit},
                          {content:"删除", action:this._delete}
                        ]}>

                        <RaTable.Column dataField="authUid" sort={true}>用户账号</RaTable.Column>
                        <RaTable.Column dataField="nickName">用户名</RaTable.Column>
                        <RaTable.Column dataField="trueName" align="center">真实名称</RaTable.Column>
                        <RaTable.Column dataField="email"  >邮箱地址</RaTable.Column>

                    </RaTable>
                </div>
                {this.state.editItem ?
                    <EditItem ref="itra-edit" onConfirm={this._onEditItemConfirm} onCancel={this._onEditItemCancel} item_id={this.state.item_id}></EditItem>
                    : null}
            </div>
        )
    }
});


