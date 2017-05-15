'use strict';

var React = require('react');
var Utils = require('../utils');
var DatePicker = require('../datePicker');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function getInitialState() {
        return {
            timeStr: '',
            timeUix: ''
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            valuePath: '',
            showTime: false,
            valueFmt: 'yyyy-MM-dd',
            value: '',
            onChange: ''
        };
    },

    componentWillMount: function componentWillMount() {
        this.setState({ timeStr: this.props.value });
    },

    componentDidMount: function componentDidMount() {
        console.log('componentDidMount,this.props');
    },

    _dateTimeToString: function _dateTimeToString(date) {
        return Utils.DateUtil.dateToStr(date, this.props.valueFmt);
    },

    _onDateTimeChange: function _onDateTimeChange(value) {
        if (!value) {
            return;
        }

        this.state.timeStr = this._dateTimeToString(value);
        typeof this.props.onChange == 'function' && this.props.onChange(this.state.timeStr, this.props.valuePath);

        this.forceUpdate();
    },

    _onChange: function _onChange(e) {
        console.log(e.target.value);
    },

    _onFocus: function _onFocus(e) {
        this.refs.datePicker.setState({ showCalendar: true });
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'datePickInForm' },
            React.createElement('input', { type: 'text', className: 'form-control',
                value: this.props.value,
                onChange: this._onChange,
                onFocus: this._onFocus
            }),
            React.createElement(DatePicker, {
                ref: 'datePicker',
                name: '\u8BF7\u9009\u62E9',
                format: 'YYYY-MM-DD',
                value: this.props.value,
                onChange: this._onDateTimeChange,
                showTime: this.props.showTime })
        );
    }
});