'use strict';

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
var RaInput = require('../../form/input');
var DatePicker = require('../../datePicker/index');
var DateUtil = require('../date');
var Prompt = require('../popup').prompt;

module.exports = React.createClass({
    displayName: 'exports',

    propTypes: {
        onFilterChange: React.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            filterData: []
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            filterData: []
        };
    },

    timeOut: {},

    queryParam: {},

    dateUnix: {},

    changeQueryParam: function changeQueryParam(name, filterValue) {
        //this.queryParam[name] = value;
        if (filterValue) {
            this.props.onFilterChange(name, filterValue.resultValue, filterValue.selectItem);
        } else {
            this.props.onFilterChange(name, undefined, null);
        }
    },

    //输入筛选
    //{type:'input',name:'policyNo',label:'保单号码'}
    _createInputFilter: function _createInputFilter(filter) {
        var defaultValue = this.state[filter.name] == undefined ? filter.defaultValue || '' : this.state[filter.name].showValue,
            placeholder = '请输入' + filter.label;

        return React.createElement(
            'span',
            { className: 'filter-item', key: filter.name },
            React.createElement(
                'span',
                { className: 'filter-label', title: filter.label, style: { width: filter.labelWidth } },
                filter.label
            ),
            React.createElement(
                'span',
                { className: 'filter-input-content filter-content' },
                React.createElement('input', { type: 'text', className: 'form-control filter-input',
                    value: defaultValue,
                    name: filter.name,
                    onChange: this._inputChange,
                    placeholder: placeholder
                })
            )
        );
    },

    _inputChange: function _inputChange(e) {
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
    _createDateRangeFilter: function _createDateRangeFilter(dateRangeData) {
        var that = this,
            startValue = that.state[dateRangeData.items[0].name] == undefined ? dateRangeData.items[0].defaultValue : that.state[dateRangeData.items[0].name]['showValue'],
            endValue = that.state[dateRangeData.items[1].name] == undefined ? dateRangeData.items[1].defaultValue : that.state[dateRangeData.items[1].name]['showValue'];
        return React.createElement(
            'span',
            { className: 'filter-item', key: dateRangeData.name },
            React.createElement(
                'span',
                { className: 'filter-label', title: dateRangeData.label, style: { width: dateRangeData.labelWidth } },
                dateRangeData.label
            ),
            React.createElement(
                'span',
                { className: 'filter-input-content' },
                React.createElement(DatePicker, {
                    name: '\u8BF7\u9009\u62E9',
                    format: 'YYYY-MM-DD',
                    style: { width: 130 },
                    value: startValue,
                    maxDate: this.dateUnix[dateRangeData.items[1].name + ''],
                    onChange: function onChange(date) {
                        that._onDateRangeChange(date, dateRangeData.items[0].name, dateRangeData.items);
                    },
                    showTime: false }),
                React.createElement(
                    'span',
                    { className: 'dateRange-line', style: { padding: '0 10px' } },
                    '-'
                ),
                React.createElement(DatePicker, {
                    name: '\u8BF7\u9009\u62E9',
                    format: 'YYYY-MM-DD',
                    style: { width: 130 },
                    value: endValue,
                    minDate: this.dateUnix[dateRangeData.items[0].name + ''],
                    onChange: function onChange(date) {
                        that._onDateRangeChange(date, dateRangeData.items[1].name, dateRangeData.items);
                    },
                    showTime: false })
            )
        );
    },

    _onDateRangeChange: function _onDateRangeChange(date, name, rangeItemData) {
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
    _createDatePickFilter: function _createDatePickFilter(filter) {
        var that = this,
            date = new Date(),
            width = filter.width || '100%',
            datePickLabel = '请选择' + filter.label,
            value = that.state[filter.name] == undefined ? filter.defaultValue : that.state[filter.name]['showValue'];
        return React.createElement(
            'span',
            { className: 'filter-item', key: filter.name },
            React.createElement(
                'span',
                { className: 'filter-label', title: filter.label, style: { width: filter.labelWidth } },
                filter.label
            ),
            React.createElement(
                'span',
                { className: 'filter-input-content filter-content' },
                React.createElement(DatePicker, {
                    name: datePickLabel,
                    format: 'YYYY-MM-DD',
                    style: { width: width },
                    view: filter.view,
                    value: value,
                    maxDate: filter.maxDate,
                    onChange: function onChange(date) {
                        console.log('onChange', date);
                        var stateChange = {},
                            showValue = '',
                            resultValue = DateUtil.dateToStr(date, 'yyyy-MM-dd'),
                            filterValue = { showValue: '', resultValue: '' };
                        if (filter.view == 'month') {
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
                    },
                    showTime: false })
            )
        );
    },

    _onDateChange: function _onDateChange(date, name) {
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
    _createSelectFilter: function _createSelectFilter(filter) {
        var self = this,
            displayKey = filter.displayKey || 'name',
            displayValue = filter.displayValue || 'value',
            defaultValue = filter.defaultValue || '',
            selectValuePath = filter.selectValuePath || displayValue,
            placeholder = '请选择' + filter.label;

        return React.createElement(
            'span',
            { className: 'filter-item', key: filter.name },
            React.createElement(
                'span',
                { className: 'filter-label', title: filter.label, style: { width: filter.labelWidth } },
                filter.label
            ),
            React.createElement(
                'span',
                { className: 'filter-select-content filter-content', style: { width: filter.width || null } },
                React.createElement(RaSelect, {
                    clearable: typeof filter.clearable !== 'undefined' ? filter.clearable : true,
                    searchable: filter.searchable,
                    disabled: !!filter.disabled,
                    valuePath: filter.name,
                    defaultValue: defaultValue,
                    displayKey: displayKey,
                    displayValue: displayValue,
                    renderOption: filter.renderOption,
                    onChange: function onChange(selected, selectItem, valuePath) {
                        self.onSelectChanged(selected, selectItem, valuePath, selectValuePath, displayKey);
                    },
                    name: placeholder,
                    options: filter.options
                })
            )
        );
    },

    onSelectChanged: function onSelectChanged(selected, selectItem, valuePath, selectValuePath, displayKey) {
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
    _createAutoComplete: function _createAutoComplete(filter) {
        var self = this,
            defaultValue = this.state[filter.name] == undefined ? filter.defaultValue : this.state[filter.name]['showValue'],
            displayKey = filter.displayKey || 'name',
            displayValue = filter.displayValue || 'value',
            placeholder = '请输入' + filter.label,
            selectValuePath = filter.selectValuePath || displayValue;
        return React.createElement(
            'span',
            { className: 'filter-item', key: filter.name },
            React.createElement(
                'span',
                { className: 'filter-label', title: filter.label, style: { width: filter.labelWidth } },
                filter.label
            ),
            React.createElement(
                'span',
                { className: 'filter-select-content' },
                React.createElement(RaSelect, {
                    autocomplete: true,
                    defaultValue: defaultValue,
                    valuePath: filter.name,
                    renderOption: filter.renderOption,
                    displayKey: displayKey,
                    displayValue: displayValue,
                    onUpdate: self._onAutoCompleteUpdate,
                    onChange: function onChange(selected, selectItem, valuePath) {
                        self._onAutoCompleteChange(selected, selectItem, valuePath, selectValuePath, displayKey);
                    },
                    options: filter.options,
                    placeholder: placeholder
                })
            )
        );
    },

    _onAutoCompleteUpdate: function _onAutoCompleteUpdate(inputValue, valuePath) {
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

    _onAutoCompleteChange: function _onAutoCompleteChange(selected, selectItem, valuePath, selectValuePath, displayKey) {
        var stateChange = {},
            showValue = selectItem[displayKey],
            resultValue = selectItem[selectValuePath],
            filterValue = { showValue: showValue, resultValue: resultValue, selectItem: selectItem };
        this.changeQueryParam(valuePath, filterValue);
        stateChange[valuePath] = filterValue;
        this.setState(stateChange);
    },

    _renderFilter: function _renderFilter() {
        var self = this;
        this.state.filterData = clone(this.props.filterData);
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

    delayRun: function delayRun(timeOutKey, runFn, delayTime) {
        var milliSec = delayTime || 100;
        if (this.timeOut[timeOutKey]) {
            clearTimeout(this.timeOut[timeOutKey]);
        }
        this.timeOut[valuePath] = setTimeout(function () {
            runFn();
        }, milliSec);
    },

    componentWillMount: function componentWillMount() {
        this.dateUnix = {};
        this.queryParam = {};
        this.timeOut = {};
    },

    componentDidMount: function componentDidMount() {},

    componentWillUnMount: function componentWillUnMount() {},

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.state.filterData = clone(nextProps.filterData);
    },

    render: function render() {
        return React.createElement(
            'span',
            { className: 'filter-list' },
            this._renderFilter()
        );
    }
});