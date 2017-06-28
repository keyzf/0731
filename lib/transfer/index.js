'use strict';

var React = require('react');

var Assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');
var TreeSelect = require('../treeSelect');

/**
 * 单个单选框，多个单选框推荐直接使用RadioGroup
 */
var PullDownTree = React.createClass({
    displayName: 'PullDownTree',

    propTypes: {
        /**
         * 组名，例：'group1'
         */
        name: React.PropTypes.string,
        /**
         * 值，例：1
         */
        value: React.PropTypes.any,
        /**
         * 是否选中，例：true
         */
        checked: React.PropTypes.bool,

        /**
         * 是否只读，例：true
         */
        disabled: React.PropTypes.bool,

        /**
         * 点击回调，例：function(value) {}
         */
        onChange: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {
            open: false,
            treeData: [],
            displayKey: 'name',
            displayValue: 'value',
            childrenKey: 'children',
            linkage: true,
            showCheckBox: true
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: '',
            value: '',
            checked: false,
            onChange: null,
            disabled: false
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.forceUpdate();
    },
    _onChange: function _onChange(e) {
        if (this.props.disabled) {
            return;
        }
        if (e.target.value == this.props.value) {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.props.value);
            }
        } else {}
    },

    render: function render() {
        var dropStyle = Assign({
            display: this.state.open ? 'block' : 'none'
        }, this.props.dropStyle);
        return React.createElement(
            'div',
            { className: 'select2-container select', style: Assign({}, this.props.style) },
            React.createElement(
                'a',
                {
                    title: this.state.name,
                    className: 'select2-choice',
                    onClick: this._handleClick,
                    style: { overflow: 'hidden' } },
                this.state.name,
                React.createElement(
                    'span',
                    { className: 'select2-arrow' },
                    React.createElement('b', null)
                ),
                React.createElement('i', { className: 'icon-cross3 select2-clear', onClick: this._handleClearClick })
            ),
            React.createElement(
                'div',
                { className: 'select2-drop select2-drop-active', ref: 'drop',
                    style: dropStyle },
                React.createElement(
                    'ul',
                    { className: 'select2-results' },
                    React.createElement(TreeSelect, {
                        data: this.state.treeData,
                        displayKey: this.state.displayKey,
                        displayValue: this.state.displayValue,
                        valuePath: this.props.valuePath,
                        linkage: this.state.linkage,
                        onChange: this._onChecked
                    })
                )
            )
        );
    }
});

module.exports = PullDownTree;