var React = require('react');
var FilterRender = require('radmin').Utils.FilterRender;
var RaSelect = require('radmin').Select;


module.exports = React.createClass({
    getInitialState: function () {
        return {
            itemData:{
                companyCodeList:[]
            },
            option:[
                { name: '苹果', value: '0' },
                { name: '梨子', value: '1' },
                { name: '香蕉', value: '2' },
                { name: '西瓜', value: '3' },
                { name: '哈密瓜', value: '4' },
                { name: '橘子', value: '5' },
                { name: '芒果', value: '6' },
                { name: '榴莲', value: '7' },
                { name: '红苹果', value: '8' },
                { name: '青苹果', value: '9' },
                { name: '桃子', value: '10' },
            ]
        }
    },

    getDefaultProps: function () {
        return {};
    },

    componentWillMount: function () {
        this.filterData = [
            {
                type:'select',
                name:'orgName1',
                selectValuePath:'name',//默认是value
                label:'机构名称',
                width:200,
                options:this.state.option
            },
            {
                type:'select',
                name:'orgName2',
                selectValuePath:'name',//默认是value
                searchable:true,
                label:'机构名称1',
                width:200,
                options:this.state.option
            },
            {
                type:'autocomplete',
                name:'orgName3',
                selectValuePath:'name',
                label:'机构名称2',
                options:this.state.option
            },
        ]
    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {
    },

    componentWillReceiveProps: function (nextProps) {

    },
    _onFilterChange: function (name, resultValue, selectItem) {
        console.log(name, resultValue, selectItem)
    },
    _onSelected: function (selected,selectItems,valuePath) {
       console.log('_onSelected',selected,selectItems,valuePath)
    },
    render: function () {
        return (
            <div className="page-session">
                <FilterRender
                    filterData={this.filterData}
                    onFilterChange={this._onFilterChange}
                    />
                <div>
                    <RaSelect
                        multiselect
                        autocomplete
                        onChange={this._onSelected}
                        dropStyle={{
                                position: 'fixed',
                                top: 'auto',
                                width: 338,
                            }}
                        name='请选择机构'
                        options={this.state.option}/>
                </div>
            </div>
        )
    }
});