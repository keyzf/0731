/**
 * Created by zeezhang on 2016/12/9.
 */
var React = require('react');
var clone = require('clone');
var classNames = require('classnames');

var Utils = require('../utils');
var FormUtil = require('./util');

module.exports = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        /**
         * 对输入进行过滤
         * */
        inputFilter: React.PropTypes.func,
    },
    getInitialState: function () {
        return {
            counterStr: '',
            value: '',
        }
    },

    getDefaultProps: function () {
        return {
            maxLength: 0,
            type: 'text',
            className: '',
            placeholder: null,
            valuePrefix: '',//输入的值固定的前缀
            value: '',
            valuePath: '',
            valueReg: '',
            readOnly: false,
            prepend: '',
            append: '',
        };
    },

    _onChange: function (e) {
        var value = this._inputFilter(e),
            len = value.length,
            counterStr = '',
            valuePrefixLen = this.props.valuePrefix.length;

        if (valuePrefixLen) {
            if (value.substr(0, valuePrefixLen) != this.props.valuePrefix) {
                this.setState({
                    value: this.state.value,
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
                    value: value,
                });
            }
        } else {
            typeof this.props.onChange == 'function' && this.props.onChange(value, this.props.valuePath, e);
            this.setState({
                value: value,
            });
        }
    },

    _inputFilter: function (e) {
        var value = e.target.value;
        if (typeof this.props.inputFilter == 'function') {
            return this.props.inputFilter(value, e);
        } else {
            return value;
        }
    },

    _onKeyDown: function (e) {
        typeof this.props.onKeyDown == 'function' && this.props.onKeyDown(e);
    },

    _onBlur: function (e) {
        typeof this.props.onBlur == 'function' && this.props.onBlur(e);
    },
    _onFocus: function (e) {
        typeof this.props.onFocus == 'function' && this.props.onFocus(e);
    },

    componentWillMount: function () {
        this.state.counterStr = this.props.value.length + '/' + this.props.maxLength;
        this.state.value = this.props.value;
    },

    componentWillReceiveProps: function (nextProps) {
        this.state.counterStr = (nextProps.value + '').length + '/' + nextProps.maxLength;
        this.state.value = nextProps.value;
    },

    _renderInput: function () {
        return (
            <div className={'form-input-content ' + (this.props.maxLength ? 'has-addons' : '')}>
                <input
                    type={this.props.type}
                    className={'form-input form-control ' + this.props.className}
                    value={this.state.value === '' ? this.props.valuePrefix : this.state.value}
                    onChange={this._onChange}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
                    onKeyUp={this._onKeyDown}
                    name={this.props.valuePath}
                    autoComplete={'off'}
                    maxLength={this.props.maxLength ? this.props.maxLength : null}
                    placeholder={this.props.placeholder ? this.props.placeholder : null}
                    readOnly={this.props.readOnly ? 'readonly' : null}
                />
                <span className="addons-container">
                    {this.props.maxLength ? (<span className='input-counter'>
                        {this.state.counterStr}
                    </span>) : null}
                </span>
            </div>
        )
    },

    render: function () {
        var hasPrepend = !!this.props.prepend
        var hasAppend = !!this.props.append

        if (hasPrepend || hasAppend) {
            var className = classNames({
                'form-input-group': true,
                'input-group-prepend': hasPrepend,
                'input-group-append': hasAppend,
            })

            return (
                <div className={className}>
                    {
                        hasPrepend &&
                        <span className="form-input-prepend">{this.props.prepend}</span>
                    }
                    {this._renderInput()}
                    {
                        hasAppend &&
                        <span className="form-input-append">{this.props.append}</span>
                    }
                </div>
            )
        } else {
            return this._renderInput()
        }
    }
});