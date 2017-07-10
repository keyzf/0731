var React = require('react');
var clone = require('clone');

var Tabs = require('../tabs');

module.exports = React.createClass({
    propTypes: {
        beforeClosed: React.PropTypes.func,
    },

    getInitialState:function(){
        return {
            tabData:[]
        }
    },

    getDefaultProps: function() {
        return {
            className:'',
            tabData:[],
            canClose:false,
            unicity:false,//唯一性，就是tab标题能不能一样，默认可以一样，否则自动替换
        };
    },

    tabJson:{},

    canClosed:function(){
        var canClose = true;
        if(typeof this.props.beforeClosed == 'function'){
            canClose = this.props.beforeClosed();
        }
        return canClose;
    },

    _addTab:function(newTab){
        var self = this,
            newTabData = [],
            index = this.state.tabData.length;
        if(this.props.unicity&&this.tabJson[newTab.name]){
            for(var i =0,len = this.state.tabData.length;i < len;i++){
                if(this.state.tabData[i].name == newTab.name){
                    this.state.tabData[i] = newTab;
                    //newTabData.push(newTab);
                    index = i;
                }/*else{
                    newTabData.push(this.state.tabData[i]);
                }*/
            }
        }else{
            this.state.tabData.push(newTab);
            //newTabData = this.state.tabData;
        }
       /* this.setState({tabData:[]},function(){
            self.setState({tabData:newTabData},function(){
                self.refs.tabs._changeTab(index);
            })
        });*/
        this.forceUpdate(function(){
            self.refs.tabs._changeTab(index);
        });
    },

    _tabClosed:function(index,activeIndex){
        var self = this;
        if(this.state.tabData.length == 1||!this.canClosed()){
            return;
        }else{
            delete this.tabJson[this.state.tabData[index].name];
            this.state.tabData.splice(index,1);
            this.forceUpdate(function(){
                //self.refs.tabs._changeTab(activeIndex - 1);
            });
          /*  if(activeIndex >= index){//选中tab在删除tab后面，activeIndex -1
                this.forceUpdate(function(){
                    self.refs.tabs._changeTab(activeIndex - 1);
                });
            }else if(activeIndex < index){//选中tab在删除tab前面，activeIndex不变
                this.forceUpdate(function(){
                    self.refs.tabs._changeTab(activeIndex);
                });
            }*/

        }
    },

    _changeTab:function(index){

    },

    _onTabChange:function(index){

    },

    componentWillMount: function() {
        var tabData = [];
        for(var i =0,len = this.props.tabData.length;i < len;i++){
            tabData.push(this.props.tabData[i])
        }
        this.state.tabData = tabData;
        this.tabJson = {};
    },

    componentDidMount:function(){

    },

    componentWillUnMount:function(){
    },

    componentWillReceiveProps:function(){

    },

    render:function(){
        var self = this;
        return(
            <Tabs
                ref='tabs'
                className={this.props.className}
                onChange={this._onTabChange}
                onDelete={this.props.canClose?this._tabClosed:null}
                >
                {this.state.tabData.map(function(tab,index){
                    self.tabJson[tab.name + ''] = true;
                    return (
                        <Tabs.Tab name={tab.name} style={tab.style} key={index} noClose={tab.noClose}>
                            {tab.content}
                        </Tabs.Tab>
                    )
                })}
            </Tabs>
        )
    }
});