'use strict';

/**
 * Created by zeezhang on 2016/12/9.
 */
var React = require('react');
var classNames = require('classnames');

var Utils = require('../utils');
var FormUtil = require('./util');

module.exports = React.createClass({
    displayName: 'exports',

    propTypes: {
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        /**
         * 对输入进行过滤
         * */
        inputFilter: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {
            counterStr: '',
            value: '',
            prepend: '',
            append: '',
            valuePrefix: ''
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            maxLength: 0,
            type: 'text',
            className: '',
            placeholder: null,
            valuePrefix: '', //输入的值固定的前缀
            value: '',
            valuePath: '',
            valueReg: '',
            readOnly: false,
            prepend: '',
            append: ''
        };
    },

    _onChange: function _onChange(e) {
        var value = this._inputFilter(e),
            len = value.length,
            counterStr = '',
            valuePrefixLen = this.state.valuePrefix.length;

        if (valuePrefixLen) {
            if (value.substr(0, valuePrefixLen) != this.state.valuePrefix) {
                //判断前缀是否正确
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

        if (this.props.maxLength > 0) {
            if (len <= this.props.maxLength) {
                counterStr = len + '/' + this.props.maxLength;
                typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath, e);
                this.setState({
                    counterStr: counterStr,
                    value: value
                });
            }
        } else {
            typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath, e);
            this.setState({
                value: value
            });
        }
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

    _onBlur: function _onBlur(e) {
        typeof this.props.onBlur == 'function' && this.props.onBlur(e);
    },
    _onFocus: function _onFocus(e) {
        typeof this.props.onFocus == 'function' && this.props.onFocus(e);
    },

    componentWillMount: function componentWillMount() {
        this.state.value = (this.props.value === '' ? this.props.valuePrefix : this.props.value) + '';
        this.state.valuePrefix = this.props.valuePrefix;
        this.state.prepend = this.props.prepend;
        this.state.append = this.props.append;
        this.state.counterStr = this.state.value.length + '/' + this.props.maxLength;
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.componentWillMount();
    },

    _renderInput: function _renderInput() {
        return React.createElement(
            'div',
            { className: 'form-input-content ' + (this.props.maxLength ? 'has-addons' : '') },
            React.createElement('input', {
                type: this.props.type,
                className: 'form-input form-control ' + this.props.className,
                value: this.state.value,
                onChange: this._onChange,
                onBlur: this._onBlur,
                onFocus: this._onFocus,
                onKeyUp: this._onKeyDown,
                name: this.props.valuePath,
                autoComplete: 'off',
                maxLength: this.props.maxLength ? this.props.maxLength : null,
                placeholder: this.props.placeholder ? this.props.placeholder : null,
                readOnly: this.props.readOnly ? 'readonly' : null
            }),
            React.createElement(
                'span',
                { className: 'addons-container' },
                this.props.maxLength ? React.createElement(
                    'span',
                    { className: 'input-counter' },
                    this.state.counterStr
                ) : null
            )
        );
    },

    render: function render() {
        var hasPrepend = !!this.state.prepend;
        var hasAppend = !!this.state.append;

        if (hasPrepend || hasAppend) {
            var className = classNames({
                'form-input-group': true,
                'input-group-prepend': hasPrepend,
                'input-group-append': hasAppend
            });

            return React.createElement(
                'div',
                { className: className },
                hasPrepend && React.createElement(
                    'span',
                    { className: 'form-input-prepend' },
                    this.state.prepend
                ),
                this._renderInput(),
                hasAppend && React.createElement(
                    'span',
                    { className: 'form-input-append' },
                    this.state.append
                )
            );
        } else {
            return this._renderInput();
        }
    }
});