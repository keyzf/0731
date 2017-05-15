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

var RaSelect = require('../select');
var DatePicker = require('../datePicker');
var Utils = require('../utils');

module.exports = React.createClass({
    propTypes: {
        onFilterChange: React.PropTypes.func,
    },

    getInitialState:function(){
        return {
            filterData:[],
        }
    },

    getDefaultProps: function() {
        return {
            filterData:[]
        };
    },

    timeOut:{},

    queryParam:{},

    dateUnix:{},

    changeQueryParam:function(name,filterValue){
       //this.queryParam[name] = value;
        this.props.onFilterChange(name,filterValue.resultValue,filterValue.selectItem);
    },

    //输入筛选
    //{type:'input',name:'policyNo',label:'保单号码'}
    _createInputFilter:function(filter){
        var defaultValue = this.state[filter.name] == undefined?(filter.defaultValue||''):this.state[filter.name].showValue,
            placeholder = '请输入' + filter.label;

            return (
                <span className="filter-item" key={filter.name}>
                        <span className="filter-label">{filter.label}</span>
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

    _inputChange:function(e){
        var stateChange={},
            filterPath = e.target.name,
            value= e.target.value,
            filterValue={showValue:value,resultValue:value};
        this.changeQueryParam(filterPath,filterValue);
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
    _createDateRangeFilter:function(dateRangeData){
        var that=this,
            date= new Date(),
            startValue = that.state[dateRangeData.items[0].name] == undefined?dateRangeData.items[0].defaultValue:that.state[dateRangeData.items[0].name]['showValue'],
            endValue = that.state[dateRangeData.items[1].name] == undefined?dateRangeData.items[1].defaultValue:that.state[dateRangeData.items[1].name]['showValue'];
            return (
                <span className="filter-item" key={dateRangeData.name}>
                <span className="filter-label">{dateRangeData.label}</span>
                <span className="filter-input-content">
                    <DatePicker
                        name='请选择'
                        format='YYYY-MM-DD'
                        width={120}
                        value={startValue}
                        //maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
                        onChange={function(date){
                             that._onDateRangeChange(date,dateRangeData.items[0].name,dateRangeData.items);
                        }}
                        showTime={false} />
                        <span className="dateRange-line" style={{padding:'0 10px'}}>-</span>
                    <DatePicker
                        name='请选择'
                        format='YYYY-MM-DD'
                        width={120}
                        value={endValue}
                        //maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate())}
                        onChange={function(date){
                             that._onDateRangeChange(date,dateRangeData.items[1].name,dateRangeData.items);
                        }}
                        showTime={false} />
                </span>
            </span>
            );
    },

    _onDateRangeChange:function(date,name,rangeItemData){
        var stateChange={},
            //changeDateUnix =  Utils.DateUtil.dateToZeroUnix(date),
            changeDateStr =  Utils.DateUtil.dateToStr(date,'yyyy-MM-dd'),
            oldDateUnix = this.dateUnix[name + ''],
            oldDateRealStr = this.state[name + ''] == undefined?'':this.state[name + ''].resultValue,
            oldDateShowStr = this.state[name + ''] == undefined?'':this.state[name + ''].showValue,
            filterValue={showValue:changeDateStr,resultValue:changeDateStr};
        this.dateUnix[name + ''] = Utils.DateUtil.dateToZeroUnix(date);
        this.changeQueryParam(name,filterValue);
        stateChange[name] = filterValue;

        var startTime = this.dateUnix[rangeItemData[0].name + ''],
            endTime = this.dateUnix[rangeItemData[1].name + ''];

        if (startTime > endTime){
            Utils.prompt('结束时间不能小于开始时间');
            this.dateUnix[name + ''] = oldDateUnix;
            filterValue.showValue  = oldDateShowStr;
            filterValue.resultValue  = oldDateRealStr;
            this.changeQueryParam(name,filterValue);
            stateChange[name] = filterValue;
        }
        this.setState(stateChange);
    },

    //时间日期 ，默认为日期
    _createDatePickFilter:function(filter){
        var that=this,
            date = new Date(),
            width = filter.width||120,
            datePickLabel = '请选择' + filter.label,
            value = that.state[filter.name] == undefined?filter.defaultValue:that.state[filter.name]['showValue'];
        return (
            <span className="filter-item" key={filter.name}>
                        <span className="filter-label">{filter.label}</span>
                        <span className="filter-input-content">
                            <DatePicker
                                name={datePickLabel}
                                format='YYYY-MM-DD'
                                style={{width:width}}
                                view={filter.view}
                                value={value}
                                maxDate={filter.maxDate}
                                onChange={function(date){
                                    var stateChange={},
                                        showValue = '',
                                        resultValue =  Utils.DateUtil.dateToStr(date,'yyyy-MM-dd'),
                                        filterValue={showValue:'',resultValue:''};
                                    if(filter.view == 'month'){
                                        date = Utils.DateUtil.getTheFirstDayOfMonth(date);
                                        resultValue = Utils.DateUtil.dateToStr(date,'yyyy-MM-dd');
                                        showValue = resultValue.substring(0,7);
                                    }else{
                                        showValue = resultValue;
                                    }
                                    filterValue.showValue = showValue;
                                    filterValue.resultValue = resultValue;
                                    that.changeQueryParam(filter.name,filterValue);
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

    _onDateChange:function(date,name){
        var stateChange={},
            changeDateUnix =  Utils.DateUtil.dateToZeroUnix(date),
            changeDateStr =  Utils.DateUtil.dateToStr(date,'yyyy-MM-dd'),
            filterValue={showValue:changeDateStr,resultValue:changeDateStr};
        //stateChange[name + ''] = changeDateUnix;
        stateChange[name ] = changeDateStr;
        //this.dateUnix[name + ''] = changeDateUnix;
        this.changeQueryParam(name,changeDateStr);
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
    _createSelectFilter:function(filter){
        var self= this,
            selectValuePath = filter.selectValuePath||'value',
            listForSearchPath = filter.name + 'ForSearch',
            listPath = filter.name + 'List',
            defaultValue = filter.defaultValue,
            placeholder = '请选择' + filter.label;

        return (
            <span className="filter-item" key={filter.name}>
                    <span className="filter-label">{filter.label}</span>
                    <span className="filter-select-content" style={{width:filter.width||null}}>
                       <RaSelect
                           searchable={filter.searchable}
                           valuePath={filter.name}
                           defaultValue={filter.defaultValue}
                           renderOption={filter.renderOption}
                           onUpdate={self._onSelectSearchUpdate}
                           onChange={function(selected,index ,valuePath){
                                self.onSelectChanged(selected,index ,valuePath,selectValuePath);
                           }}
                           name={placeholder}
                           options={self.state[listForSearchPath]||[]}
                           />
                    </span>
                </span>
        );

    },

    onSelectChanged:function(selected,index ,valuePath,selectValuePath){
        var stateChange={},
            listPath = selectValuePath + 'List',
            listForSearchPath = valuePath + 'ForSearch',
            selectItem = this.state[listForSearchPath][index],
            showValue = selectItem['name'],
            resultValue = selectItem[selectValuePath],
            filterValue={showValue:showValue,resultValue:resultValue,selectItem:selectItem};

        stateChange[listForSearchPath] = this.state[listPath];
        this.changeQueryParam(valuePath,filterValue);
        this.setState(stateChange);

    },

    _onSelectSearchUpdate: function (inputValue,valuePath) {
        var self= this,
            stateChange={},
            listPath = valuePath + 'List',
            listForSearchPath = valuePath + 'ForSearch';
        if(inputValue){
            var opt = [];
            this.state[listPath].map(function(item) {
                if (item.name.toLowerCase().indexOf(inputValue.toLowerCase()) != -1) {
                    opt.push(item);
                }
            });

            stateChange[listForSearchPath + ''] = opt;
        }else{
            stateChange[listForSearchPath] = this.state[listPath];
        }


        this.setState(stateChange);
        //this.queryParam[valuePath] = inputValue;
        //this.changeQueryParam(valuePath,inputValue);

    },

    //自动填充
    /*{
     type:'autocomplete',
     name:'orgName',
     label:'机构名称',
     options:[]
     }*/
    _createAutoComplete:function(filter){
        var self= this,
            defaultValue= this.state[filter.name] == undefined?filter.defaultValue:this.state[filter.name]['showValue'],
            listPath = filter.name + 'List',
            listForSearchPath = filter.name + 'ForSearch',
            placeholder = '请输入' + filter.label,
            selectValuePath = filter.selectValuePath||'value';
        return (
            <span className="filter-item" key={filter.name}>
                    <span className="filter-label">{filter.label}</span>
                    <span className="filter-select-content">
                         <RaSelect
                             autocomplete
                             defaultValue={defaultValue}
                             valuePath={filter.name}
                             renderOption={filter.renderOption}
                             onUpdate={self._onAutoCompleteUpdate}
                             onChange={function(selected,index,valuePath){
                                self._onAutoCompleteChange(selected,index,valuePath,selectValuePath);
                             }}
                             options={self.state[listForSearchPath]}
                             placeholder={placeholder}
                             />
                    </span>
                </span>
        );
    },

    _onAutoCompleteUpdate: function (inputValue,valuePath) {
        var self= this,
            stateChange={},
            listPath = valuePath + 'List',
            listForSearchPath = valuePath + 'ForSearch',
            filterValue={showValue:inputValue,resultValue:inputValue};
        if(inputValue){
            var opt = [];
            this.state[listPath].map(function(item) {
                if (item.name.toLowerCase().indexOf(inputValue.toLowerCase()) != -1) {
                    opt.push(item);
                }
            });
            stateChange[listForSearchPath + ''] = opt;
        }else{
            stateChange[listForSearchPath] = [];
        }
        stateChange[valuePath] = filterValue;
        this.changeQueryParam(valuePath,filterValue);
        if(this.timeOut[valuePath]){
            clearTimeout(this.timeOut[valuePath]);
        }
        this.timeOut[valuePath]=setTimeout(function(){
            self.setState(stateChange);
        },300);
        //this.delayRun(valuePath,this.forceUpdate);
        //this.queryParam[valuePath] = inputValue;

    },

    _onAutoCompleteChange:function(selected,index,valuePath,selectValuePath){
        var stateChange={},
            listPath = selectValuePath + 'List',
            listForSearchPath = valuePath + 'ForSearch',
            selectItem = this.state[listForSearchPath][index],
            showValue = selectItem['name'],
            resultValue = selectItem[selectValuePath],
            filterValue={showValue:showValue,resultValue:resultValue,selectItem:selectItem};
        this.changeQueryParam(valuePath,filterValue);
        stateChange[listForSearchPath] = [];
        stateChange[valuePath] = filterValue;
        this.setState(stateChange);
    },

    _renderFilter:function(){
        var self = this;
        this.state.filterData = clone(this.props.filterData);
        return this.state.filterData.map(function(filter){
            switch (filter.type){
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
                    var listPath = filter.name + 'List',
                        listForSearchPath = filter.name + 'ForSearch';
                    if(filter.searchable){
                        if(!self.state[listForSearchPath]&&filter.options.length){
                            self.state[listForSearchPath] =  filter.options;
                        }
                        self.state[listPath] =  filter.options;
                    }else{
                        self.state[listForSearchPath] = filter.options;
                        self.state[listPath] =  filter.options;
                    }
                    return self._createSelectFilter(filter);
                    break;
                case 'autocomplete':
                    var listPath = filter.name + 'List',
                        listForSearchPath = filter.name + 'ForSearch';
                    self.state[listPath] = filter.options;
                    if(!self.state[listForSearchPath]){
                        self.state[listForSearchPath] = [];
                    }
                    return self._createAutoComplete(filter);
                    break;
            }
        })
    },

    delayRun:function(timeOutKey,runFn,delayTime){
        var milliSec = delayTime||100;
        if(this.timeOut[timeOutKey]){
            clearTimeout(this.timeOut[timeOutKey]);
        }
        this.timeOut[valuePath]=setTimeout(function(){
            runFn();
        },milliSec);
    },

    componentWillMount: function() {
       this.dateUnix = {};
       this.queryParam = {};
       this.timeOut = {};
    },

    componentDidMount:function(){

    },

    componentWillUnMount:function(){

    },

    componentWillReceiveProps:function(nextProps){
        this.state.filterData = clone(nextProps.filterData);
    },

    render:function(){
        return (
            <span className='filter-list'>
                {this._renderFilter()}
            </span>

        )
    },
});
