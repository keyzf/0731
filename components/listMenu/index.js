var React = require('react');
var clone = require('clone');
var deepEqual = require('deep-equal');
var Utils = require('../utils');
var TreeSelect = require('../treeSelect');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            timeOut:null,
            focusId: this.props.defaultValue,
            listData: clone(this.props.listData),
            showTree: this.props.showTree,
        }
    },

    getDefaultProps: function () {
        return {
            showTree: false,
            searchable: true,
            treeConfig: {
                treeData: [],
                displayKey: 'name',
                displayValue: 'value',
                valuePath: ''
            },
            className: '',
            displayKey: 'text',
            displayValue: 'id',
            listData: [],
            defaultValue: null,
            operaData: [
                {
                    className: 'icon-pencil5', onClick: function (e, item) {
                    console.log(item)
                }
                },
                {
                    className: 'icon-cross2', onClick: function (e, item) {
                    console.log(item)
                }
                },
            ]
        };
    },

    componentWillMount: function () {
    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.defaultValue != this.state.focusId) {
            this.state.focusId = nextProps.defaultValue;
        }
        var dataChange = false;
        if (!deepEqual(this.props.listData, nextProps.listData)) {
            dataChange = true;
        }
        if (dataChange) {
            this.state.listData = clone(nextProps.listData);
        }
    },

    _onClick: function (e, item) {
        this.setState({focusId: item[this.props.displayValue]});
        typeof this.props.onChange == 'function' && this.props.onChange(e, item);
    },

    _search: function (value) {
        var self = this;
        if (typeof value === 'undefined' || value == null || value === '') {
            return clone(this.props.listData);
        } else {
            return this.props.listData.filter(function (item) {
                return (value || value === 0) && (item[self.props.displayKey].indexOf(value) > -1)
            });
        }
    },

    _onSearch: function (e) {
        var self= this,
            value = e.target.value,
            listData = this._search(value);
        if(this.state.timeOut){
            clearTimeout(this.state.timeOut);
        }
        this.state.timeOut = setTimeout(function(){
            self.setState({listData: listData,showTree:!!!value});
        },300);
    },

    _onChecked:function(checked,selectItems){
        typeof this.props.onChange == 'function' && this.props.onChange( null,selectItems[0]);
    },

    render: function () {
        var self = this;
        return (
            <div className='list-menu'>
                {this.props.searchable?
                    <div className='search-container'>
                        <input type='text' className='menu-search' onChange={this._onSearch} placeholder='搜索'/>
                    </div>:null}

                <div className='list-body'>
                    <ul className={'ul-list ' + (this.state.showTree?' none':'') + this.props.className}>
                        {this.state.listData.length?this.state.listData.map(function (item) {
                            return (
                                <li className={self.state.focusId == item[self.props.displayValue]?'li-item focus-in':'li-item'}
                                    key={Utils.CommonUtil.getRandomId()} onClick={function(e){self._onClick(e,item)}}>
                                    <a href='javascript:;'>
                                        <span>{item[self.props.displayKey]}</span>
                                <span className='opera-container'>
                                    {self.props.operaData.map(function (barItem) {
                                        return (
                                            <span
                                                className={barItem.className}
                                                onClick={function(barE){barE.stopPropagation();typeof barItem.onClick == 'function'&&barItem.onClick(barE,item)}}
                                                key={Utils.CommonUtil.getRandomId()}
                                                >
                                            </span>
                                        )
                                    })}
                                </span>
                                    </a>
                                </li>
                            )
                        }):<li className='li-item'>没有数据</li>}
                    </ul>
                    {this.state.showTree&& this.props.showTree?
                        <TreeSelect
                            data={this.props.treeConfig.treeData}
                            displayKey={this.props.treeConfig.displayKey}
                            displayValue={this.props.treeConfig.displayValue}
                            valuePath={this.props.treeConfig.valuePath}
                            showCheckBox={false}
                            onChange={this._onChecked}
                            /> : null}
                </div>

            </div>

        )
    }
});