'use strict';

/**
 * Created by zeezhang on 2016/12/9.
 */
var React = require('react');
var clone = require('clone');

var Utils = require('../utils');
var FormUtil = require('../form/util');

module.exports = React.createClass({
    displayName: 'exports',

    propTypes: {
        /**
         * 对输入进行过滤
         * */
        inputFilter: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {
            value: ''
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            maxLength: 0,
            type: 'text',
            className: '',
            placeholder: null,
            value: '',
            valuePrefix: '', //输入的值固定的前缀
            valuePath: '',
            readOnly: false,
            valueType: '',
            valueReg: ''
        };
    },

    _onChange: function _onChange(e) {
        var value = this._inputFilter(e),
            valuePrefixLen = this.props.valuePrefix.length;

        if (valuePrefixLen) {
            if (value.substr(0, valuePrefixLen) != this.props.valuePrefix) {
                this.setState({
                    value: this.state.value
                });
                return;
            }
        }

        if (value) {
            if (this.props.valueType) {
                if (!FormUtil.validateValue(this.props.valueType, value)) {
                    value = this.state.value;
                }
            }
            if (this.props.valueReg) {
                if (!this.props.valueReg.test(value)) {
                    value = this.state.value;
                }
            }
        }

        typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath, e);
        this.setState({
            value: value
        });
    },

    _onBlur: function _onBlur(e) {
        typeof this.props.onBlur == 'function' && this.props.onBlur(this._inputFilter(e), this.props.valuePath, e);
    },

    _inputFilter: function _inputFilter(e) {
        var value = e.target.value;
        if (typeof this.props.inputFilter == 'function') {
            return this.props.inputFilter(value, e);
        } else {
            return value;
        }
    },

    _onKeyDown: function _onKeyDown(e) {
        typeof this.props.onKeyDown == 'function' && this.props.onKeyDown(e);
    },

    _onKeyUp: function _onKeyUp(e) {},

    componentWillMount: function componentWillMount() {
        this.state.value = this.props.value;
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value) {
            this.state.value = nextProps.value;
        }
    },

    render: function render() {
        return React.createElement('input', {
            type: this.props.type,
            className: ' ' + this.props.className,
            value: this.state.value,
            onChange: this._onChange,
            onBlur: this._onBlur,
            onKeyUp: this._onKeyUp,
            onKeyDown: this._onKeyDown,
            name: this.props.valuePath,
            maxLength: this.props.maxLength ? this.props.maxLength : null,
            placeholder: this.props.placeholder ? this.props.placeholder : null,
            readOnly: this.props.readOnly ? 'readonly' : null
        });
    }
});