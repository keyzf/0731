/**
 * Created by zeezhang on 2016/12/8.
 *
 * 返回的参数统一格式
 * {
 * showValue:xxx,//显示的值，也是组件的默认值
 * resultValue:xxx//查询真正需要的值
 * }
 */

var React = require('react');
var clone = require('clone');
var deepEqual = require('deep-equal');


var RaSelect = require('../../select/index');
var RaInput = require('../../form/input');
var DatePicker = require('../../datePicker/index');
var DateUtil = require('../date');
var Prompt = require('../popup').prompt;

module.exports = React.createClass({
    propTypes: {
        onFilterChange: React.PropTypes.func,
    },

    getInitialState: function () {
        return {
            filterData: clone(this.props.filterData),
            filterDefaultValue:{},
        }
    },

    getDefaultProps: function () {
        return {
            filterData: []
        };
    },

    timeOut: {},

    queryParam: {},

    dateUnix: {},

    changeQueryParam: function (name, filterValue) {
        //this.queryParam[name] = value;
        if (filterValue) {
            this.props.onFilterChange(name, filterValue.resultValue, filterValue.selectItem);
        } else {
            this.props.onFilterChange(name, undefined, null);
        }
    },

    //输入筛选
    //{type:'input',name:'policyNo',label:'保单号码'}
    _createInputFilter: function (filter) {
        var self = this,
            value = this.state.filterDefaultValue[filter.name].isChange ? (filter.defaultValue || '') : this.state[filter.name].showValue,
            placeholder = '请输入' + filter.label;

        if(this.state.filterDefaultValue[filter.name].isChange){//默认值改变触发change
            this._inputChange(value,filter.name);
        }

        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label" title={filter.label} style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-input-content filter-content">
                    <input type="text" className="form-control filter-input"
                        value={value}
                        name={filter.name}
                        onChange={function(e){
                            self._inputChange(e.target.value,e.target.name);
                        }}
                        placeholder={placeholder}
                    />
                </span>
            </span>
        );

    },

    _inputChange: function (value,filterPath) {
        var stateChange = {},
            filterValue = { showValue: value, resultValue: value };
        this.changeQueryParam(filterPath, filterValue);
        stateChange[filterPath] = filterValue;
        this.setState(stateChange);
    },

    //时间范围
    /* {
        type:'dateRange',
        label:'交易日期',
        name:'transactionDate',
        items:[
        {name:'transactionDate_begin',value:''},
        {name:'transactionDate_end',value:''},
          ]
      }*/
    _createDateRangeFilter: function (dateRangeData) {
        var self = this,
            startValue = self.state[dateRangeData.items[0].name] == undefined ? dateRangeData.items[0].defaultValue : self.state[dateRangeData.items[0].name]['showValue'],
            endValue = self.state[dateRangeData.items[1].name] == undefined ? dateRangeData.items[1].defaultValue : self.state[dateRangeData.items[1].name]['showValue'];
        return (
            <span className="filter-item" key={dateRangeData.name}>
                <span className="filter-label"  title={dateRangeData.label} style={{width:dateRangeData.labelWidth}}>{dateRangeData.label}</span>
                <span className="filter-input-content">
                    <DatePicker
                        name='请选择'
                        format='YYYY-MM-DD'
                        style={{ width: 130 }}
                        value={startValue}
                        maxDate={this.dateUnix[dateRangeData.items[1].name + '']}
                        onChange={function (date) {
                            self._onDateRangeChange(date, dateRangeData.items[0].name, dateRangeData.items);
                        }}
                        showTime={false} />
                    <span className="dateRange-line" style={{ padding: '0 10px' }}>-</span>
                    <DatePicker
                        name='请选择'
                        format='YYYY-MM-DD'
                        style={{ width: 130 }}
                        value={endValue}
                        minDate={this.dateUnix[dateRangeData.items[0].name + '']}
                        onChange={function (date) {
                            self._onDateRangeChange(date, dateRangeData.items[1].name, dateRangeData.items);
                        }}
                        showTime={false} />
                </span>
            </span>
        );
    },

    _onDateRangeChange: function (date, name, rangeItemData) {
        var stateChange = {},
            //changeDateUnix =  DateUtil.dateToZeroUnix(date),
            changeDateStr = DateUtil.dateToStr(date, 'yyyy-MM-dd'),
            oldDateUnix = this.dateUnix[name + ''],
            oldDateRealStr = this.state[name + ''] == undefined ? '' : this.state[name + ''].resultValue,
            oldDateShowStr = this.state[name + ''] == undefined ? '' : this.state[name + ''].showValue,
            filterValue = { showValue: changeDateStr, resultValue: changeDateStr };
        this.dateUnix[name + ''] = DateUtil.dateToZeroUnix(date);
        this.changeQueryParam(name, filterValue);
        stateChange[name] = filterValue;

        var startTime = this.dateUnix[rangeItemData[0].name + ''],
            endTime = this.dateUnix[rangeItemData[1].name + ''];

        if (startTime > endTime) {
            Prompt('结束时间不能小于开始时间');
            this.dateUnix[name + ''] = oldDateUnix;
            filterValue.showValue = oldDateShowStr;
            filterValue.resultValue = oldDateRealStr;
            this.changeQueryParam(name, filterValue);
            stateChange[name] = filterValue;
        }
        this.setState(stateChange);
    },

    //时间日期 ，默认为日期
    _createDatePickFilter: function (filter) {
        var self = this,
            width = filter.width || '100%',
            datePickLabel = '请选择' + filter.label,
            value = this.state.filterDefaultValue[filter.name].isChange  ? filter.defaultValue : self.state[filter.name]['showValue'];

        if(this.state.filterDefaultValue[filter.name].isChange){//默认值改变触发change
            this._onDateChange( { showValue: filter.view == 'month'?value.substring(0, 7):value, resultValue: value },filter.name)
        }

        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label"  title={filter.label} style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-input-content filter-content">
                    <DatePicker
                        name={datePickLabel}
                        format='YYYY-MM-DD'
                        style={{ width: width }}
                        view={filter.view}
                        value={value}
                        maxDate={filter.maxDate}
                        onChange={function (date) {
                                var showValue = '',
                                    resultValue = DateUtil.dateToStr(date, 'yyyy-MM-dd'),
                                    filterValue = { showValue: '', resultValue: '' };
                                if (filter.view == 'month') {
                                    date = DateUtil.getTheFirstDayOfMonth(date);
                                    resultValue = DateUtil.dateToStr(date, 'yyyy-MM-dd');
                                    showValue = resultValue.substring(0, 7);
                                } else {
                                    showValue = resultValue;
                                }
                                filterValue.showValue = showValue;
                                filterValue.resultValue = resultValue;
                                self._onDateChange(filterValue,filter.name)
                            }
                        }
                        showTime={false} />
                </span>
            </span>
        );
    },

    _onDateChange: function (filterValue, name) {
        var stateChange = {};
        this.changeQueryParam(name, filterValue);
        stateChange[name] = filterValue;
        this.setState(stateChange);
    },

    //下拉选择
    /*{
        type:'select',
        name:'settStatus',
        label:'结算状态',
        searchable:false,
        options:this.state.settStatusList
    }*/
    _createSelectFilter: function (filter) {
        var self = this,
            displayKey = filter.displayKey || 'name',
            displayValue = filter.displayValue || 'value',
            defaultValue = filter.defaultValue || '',
            selectValuePath = filter.selectValuePath || displayValue,
            placeholder = '请选择' + filter.label;

        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label"  title={filter.label} style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-select-content filter-content" style={{ width: filter.width || null }}>
                    <RaSelect
                        clearable={typeof filter.clearable !== 'undefined'?filter.clearable:true}
                        searchable={filter.searchable}
                        disabled={!!filter.disabled}
                        valuePath={filter.name}
                        defaultValue={defaultValue}
                        displayKey={displayKey}
                        displayValue={displayValue}
                        renderOption={filter.renderOption}
                        onChange={function (selected, selectItem, valuePath) {
                            self.onSelectChanged(selected, selectItem, valuePath, selectValuePath, displayKey);
                        }}
                        name={placeholder}
                        options={filter.options}
                    />
                </span>
            </span>
        );

    },

    onSelectChanged: function (selected, selectItem, valuePath, selectValuePath, displayKey) {
        var filterValue = null;
        if (selectItem) {
            var showValue = selectItem[displayKey],
                resultValue = selectItem[selectValuePath];
            filterValue = { showValue: showValue, resultValue: resultValue, selectItem: selectItem };
        }

        this.changeQueryParam(valuePath, filterValue);
    },


    //自动填充
    /*{
     type:'autocomplete',
     name:'orgName',
     label:'机构名称',
     options:[]
     }*/
    _createAutoComplete: function (filter) {
        var self = this,
            defaultValue = this.state.filterDefaultValue[filter.name].isChange ? filter.defaultValue : this.state[filter.name]['showValue'],
            displayKey = filter.displayKey || 'name',
            displayValue = filter.displayValue || 'value',
            placeholder = '请输入' + filter.label,
            selectValuePath = filter.selectValuePath || displayValue;

        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label"  title={filter.label} style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-select-content">
                    <RaSelect
                        autocomplete
                        defaultValue={defaultValue}
                        valuePath={filter.name}
                        renderOption={filter.renderOption}
                        displayKey={displayKey}
                        displayValue={displayValue}
                        onUpdate={self._onAutoCompleteUpdate}
                        onChange={function (selected, selectItem, valuePath) {
                            self._onAutoCompleteChange(selected, selectItem, valuePath, selectValuePath, displayKey);
                        }}
                        options={filter.options}
                        placeholder={placeholder}
                    />
                </span>
            </span>
        );
    },

    _onAutoCompleteUpdate: function (inputValue, valuePath) {
        var self = this,
            stateChange = {},
            filterValue = { showValue: inputValue, resultValue: inputValue };
        stateChange[valuePath] = filterValue;
        this.changeQueryParam(valuePath, filterValue);
        if (this.timeOut[valuePath]) {
            clearTimeout(this.timeOut[valuePath]);
        }
        this.timeOut[valuePath] = setTimeout(function () {
            self.setState(stateChange);
        }, 200);

    },

    _onAutoCompleteChange: function (selected, selectItem, valuePath, selectValuePath, displayKey) {
        var stateChange = {},
            showValue = selectItem[displayKey],
            resultValue = selectItem[selectValuePath],
            filterValue = { showValue: showValue, resultValue: resultValue, selectItem: selectItem };
        this.changeQueryParam(valuePath, filterValue);
        stateChange[valuePath] = filterValue;
        this.setState(stateChange);
    },

    //保存defaultValue并且进行新旧比较
    checkedDefaultValue:function(){
        var self = this,
            filterDefaultValue = {};
         this.state.filterData.map(function (filter) {

            //新增默认值保存比较
            if(filter.type == 'dateRange'){
                filterDefaultValue[filter.items[0].name] = {
                    isChange:typeof self.state.filterDefaultValue[filter.items[0].name] == 'undefined'?true:self.state.filterDefaultValue[filter.items[0].name].value != filter.items[0].defaultValue,
                    value:filter.items[0].defaultValue
                };
                filterDefaultValue[filter.items[1].name] = {
                    isChange:typeof self.state.filterDefaultValue[filter.items[1].name] == 'undefined'?true:self.state.filterDefaultValue[filter.items[1].name].value != filter.items[1].defaultValue,
                    value:filter.items[1].defaultValue
                };
            }else if(filter.type =='autocomplete') {
                filterDefaultValue[filter.name] = {
                    isChange:typeof self.state.filterDefaultValue[filter.name] == 'undefined'?true:!deepEqual(self.state.filterDefaultValue[filter.name].value,filter.defaultValue) ,
                    value:filter.defaultValue
                };
            }else{
                filterDefaultValue[filter.name] = {
                    isChange:typeof self.state.filterDefaultValue[filter.name] == 'undefined'?true:self.state.filterDefaultValue[filter.name].value != filter.defaultValue,
                    value:filter.defaultValue
                };
            }
        });
        this.setState({
            filterDefaultValue:filterDefaultValue
        })
    },

    _renderFilter: function () {
        var self = this;
        return this.state.filterData.map(function (filter) {
            switch (filter.type) {
                case 'input':
                    return self._createInputFilter(filter);
                case 'dateRange':
                    return self._createDateRangeFilter(filter);
                case 'datePicker':
                    return self._createDatePickFilter(filter);
                case 'select':
                    return self._createSelectFilter(filter);
                case 'autocomplete':
                    return self._createAutoComplete(filter);
            }
        });
    },

    delayRun: function (timeOutKey, runFn, delayTime) {
        var milliSec = delayTime || 100;
        if (this.timeOut[timeOutKey]) {
            clearTimeout(this.timeOut[timeOutKey]);
        }
        this.timeOut[valuePath] = setTimeout(function () {
            runFn();
        }, milliSec);
    },

    componentWillMount: function () {
        this.dateUnix = {};
        this.queryParam = {};
        this.timeOut = {};
        this.checkedDefaultValue();
    },

    componentDidMount: function () {

    },

    componentWillUnMount: function () {

    },

    componentWillReceiveProps: function (nextProps) {
        this.setSate({
            filterData:clone(nextProps.filterData)
        });
        this.nextProps = nextProps;
    },

    componentWillUpdate:function(){
        console.log('componentWillUpdate')
        this.checkedDefaultValue();
    },

    render: function () {
        return (
            <span className='filter-list'>
                {this._renderFilter()}
            </span>

        )
    },
});
