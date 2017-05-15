var React = require('react');
var Utils = require('../utils');
var DatePicker = require('../datePicker');

module.exports = React.createClass({
    getInitialState:function(){
        return {
            timeStr:'',
            timeUix:'',
        }
    },

    getDefaultProps:function(){
        return {
            valuePath:'',
            showTime:false,
            valueFmt:'yyyy-MM-dd',
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

        this.state.timeStr = this._dateTimeToString(value);
        typeof this.props.onChange == 'function' && this.props.onChange(this.state.timeStr,this.props.valuePath);

        this.forceUpdate();

    },

    _onChange:function(e){
        console.log(e.target.value)
    },


    _onFocus:function(e){
        this.refs.datePicker.setState({showCalendar:true});
    },

    render:function(){
        return (
            <div className='datePickInForm'>
                <input type='text' className='form-control'
                       value={this.props.value}
                       onChange={this._onChange}
                       onFocus={this._onFocus}
                    />
                <DatePicker
                    ref="datePicker"
                    name='请选择'
                    format='YYYY-MM-DD'
                    value={this.props.value}
                    onChange={this._onDateTimeChange}
                    showTime={this.props.showTime} />
            </div>
        )
    },
});