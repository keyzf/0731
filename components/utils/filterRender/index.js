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

var RaSelect = require('../../select/index');
var DatePicker = require('../../datePicker/index');
var DateUtil = require('../date');
var Prompt = require('../popup').prompt;

module.exports = React.createClass({
    propTypes: {
        onFilterChange: React.PropTypes.func,
    },

    getInitialState: function () {
        return {
            filterData: [],
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
        var defaultValue = this.state[filter.name] == undefined ? (filter.defaultValue || '') : this.state[filter.name].showValue,
            placeholder = '请输入' + filter.label;

        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label" style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-input-content">
                    <input type="text" className="filter-input"
                        value={defaultValue}
                        name={filter.name}
                        onChange={this._inputChange}
                        placeholder={placeholder}
                    />
                </span>
            </span>
        );

    },

    _inputChange: function (e) {
        var stateChange = {},
            filterPath = e.target.name,
            value = e.target.value,
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
        var that = this,
            date = new Date(),
            startValue = that.state[dateRangeData.items[0].name] == undefined ? dateRangeData.items[0].defaultValue : that.state[dateRangeData.items[0].name]['showValue'],
            endValue = that.state[dateRangeData.items[1].name] == undefined ? dateRangeData.items[1].defaultValue : that.state[dateRangeData.items[1].name]['showValue'];
        return (
            <span className="filter-item" key={dateRangeData.name}>
                <span className="filter-label" style={{width:filter.labelWidth}}>{dateRangeData.label}</span>
                <span className="filter-input-content">
                    <DatePicker
                        name='请选择'
                        format='YYYY-MM-DD'
                        style={{ width: 120 }}
                        value={startValue}
                        //maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
                        onChange={function (date) {
                            that._onDateRangeChange(date, dateRangeData.items[0].name, dateRangeData.items);
                        }}
                        showTime={false} />
                    <span className="dateRange-line" style={{ padding: '0 10px' }}>-</span>
                    <DatePicker
                        name='请选择'
                        format='YYYY-MM-DD'
                        width={120}
                        value={endValue}
                        //maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
                        onChange={function (date) {
                            that._onDateRangeChange(date, dateRangeData.items[1].name, dateRangeData.items);
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
        var that = this,
            date = new Date(),
            width = filter.width || 120,
            datePickLabel = '请选择' + filter.label,
            value = that.state[filter.name] == undefined ? filter.defaultValue : that.state[filter.name]['showValue'];
        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label" style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-input-content">
                    <DatePicker
                        name={datePickLabel}
                        format='YYYY-MM-DD'
                        style={{ width: width }}
                        view={filter.view}
                        value={value}
                        maxDate={filter.maxDate}
                        onChange={function (date) {
                            var stateChange = {},
                                showValue = '',
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
                            that.changeQueryParam(filter.name, filterValue);
                            stateChange[filter.name] = filterValue;
                            that.setState(stateChange);
                            //that._onDateChange(date,filter.name)
                        }
                        }
                        showTime={false} />
                </span>
            </span>
        );
    },

    _onDateChange: function (date, name) {
        var stateChange = {},
            changeDateUnix = DateUtil.dateToZeroUnix(date),
            changeDateStr = DateUtil.dateToStr(date, 'yyyy-MM-dd'),
            filterValue = { showValue: changeDateStr, resultValue: changeDateStr };
        //stateChange[name + ''] = changeDateUnix;
        stateChange[name] = changeDateStr;
        //this.dateUnix[name + ''] = changeDateUnix;
        this.changeQueryParam(name, changeDateStr);
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
                <span className="filter-label" style={{width:filter.labelWidth}}>{filter.label}</span>
                <span className="filter-select-content" style={{ width: filter.width || null }}>
                    <RaSelect
                        clearable={!!filter.clearable}
                        searchable={filter.searchable}
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
            defaultValue = this.state[filter.name] == undefined ? filter.defaultValue : this.state[filter.name]['showValue'],
            displayKey = filter.displayKey || 'name',
            displayValue = filter.displayValue || 'value',
            placeholder = '请输入' + filter.label,
            selectValuePath = filter.selectValuePath || displayValue;
        return (
            <span className="filter-item" key={filter.name}>
                <span className="filter-label" style={{width:filter.labelWidth}}>{filter.label}</span>
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

    _renderFilter: function () {
        var self = this;
        this.state.filterData = clone(this.props.filterData);
        return this.state.filterData.map(function (filter) {
            switch (filter.type) {
                case 'input':
                    return self._createInputFilter(filter);
                    break;
                case 'dateRange':
                    return self._createDateRangeFilter(filter);
                    break;
                case 'datePicker':
                    return self._createDatePickFilter(filter);
                    break;
                case 'select':
                    return self._createSelectFilter(filter);
                    break;
                case 'autocomplete':
                    return self._createAutoComplete(filter);
                    break;
            }
        })
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
    },

    componentDidMount: function () {

    },

    componentWillUnMount: function () {

    },

    componentWillReceiveProps: function (nextProps) {
        this.state.filterData = clone(nextProps.filterData);
    },

    render: function () {
        return (
            <span className='filter-list'>
                {this._renderFilter()}
            </span>

        )
    },
});
