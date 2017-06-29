'use strict';

var React = require('react');
var Utils = require('../utils');
var DatePicker = require('../datePicker');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function getInitialState() {
        return {
            timeStr: '',
            timeUix: '',
            dateData: ''
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            valuePath: '',
            showTime: false,
            valueFmt: 'yyyy-MM-dd',
            minDate: '',
            maxDate: '',
            startValue: '',
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
        var timeStr = this._dateTimeToString(value);
        this.setState({
            dateData: value,
            timeStr: timeStr
        });

        this.state.timeStr = this._dateTimeToString(value);
        typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath);

        this.forceUpdate();
    },

    _onChange: function _onChange(e) {
        console.log(e.target.value);
    },

    _onFocus: function _onFocus(e) {
        this.refs.datePicker.setState({ showCalendar: true });
    },

    _clear: function _clear() {
        this.setState({
            dateData: '',
            timeStr: ''
        });
        typeof this.props.onChange == 'function' && this.props.onChange('', this.props.valuePath);
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'form-input-content form-date-picker has-addons' },
            React.createElement('input', { type: 'text', className: 'form-control',
                value: this.state.timeStr,
                onChange: this._onChange,
                onFocus: this._onFocus
            }),
            React.createElement(DatePicker, {
                ref: 'datePicker',
                name: '\u8BF7\u9009\u62E9',
                format: 'YYYY-MM-DD',
                minDate: this.props.minDate,
                maxDate: this.props.maxDate,
                startValue: this.props.startValue,
                value: this.state.timeStr,
                onChange: this._onDateTimeChange,
                showTime: this.props.showTime }),
            React.createElement(
                'span',
                { className: 'addons-container' },
                this.state.timeStr && React.createElement('i', { className: 'clear-icon icon-cross3', onClick: this._clear })
            )
        );
    }
});