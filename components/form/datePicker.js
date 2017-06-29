var React = require('react');
var Utils = require('../utils');
var DatePicker = require('../datePicker');

module.exports = React.createClass({
    getInitialState:function(){
        return {
            timeStr:'',
            timeUix:'',
            dateData:'',
        }
    },

    getDefaultProps:function(){
        return {
            valuePath:'',
            showTime:false,
            valueFmt:'yyyy-MM-dd',
            minDate:'',
            maxDate:'',
            startValue:'',
            value:'',
            onChange:''
        }
    },

    componentWillMount: function() {
        this.setState({timeStr:this.props.value});
    },

    componentDidMount: function() {
        console.log('componentDidMount,this.props')
    },

    _dateTimeToString: function (date) {
        return Utils.DateUtil.dateToStr(date,this.props.valueFmt);
    },

    _onDateTimeChange: function (value) {
        if (!value) {
            return
        }
        var timeStr = this._dateTimeToString(value);
        this.setState({
            dateData:value,
            timeStr:timeStr,
        });

        this.state.timeStr = this._dateTimeToString(value);
        typeof this.props.onChange == 'function' && this.props.onChange(value,this.props.valuePath);

        this.forceUpdate();

    },

    _onChange:function(e){
        console.log(e.target.value)
    },


    _onFocus:function(e){
        this.refs.datePicker.setState({showCalendar:true});
    },

    _clear:function(){
        this.setState({
            dateData:'',
            timeStr:''
        });
        typeof this.props.onChange == 'function' && this.props.onChange('',this.props.valuePath);
    },

    render:function(){
        return (
            <div className='form-input-content form-date-picker has-addons'>
                <input type='text' className='form-control'
                       value={this.state.timeStr}
                       onChange={this._onChange}
                       onFocus={this._onFocus}
                    />
                <DatePicker
                    ref="datePicker"
                    name='请选择'
                    format='YYYY-MM-DD'
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    startValue={this.props.startValue}
                    value={this.state.timeStr}
                    onChange={this._onDateTimeChange}
                    showTime={this.props.showTime} />
                <span className='addons-container'>
                    {
                        this.state.timeStr&&<i className="clear-icon icon-cross3" onClick={this._clear}></i>
                    }
                </span>
            </div>
        )
    },
});