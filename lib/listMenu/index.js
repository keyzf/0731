'use strict';

var React = require('react');
var clone = require('clone');
var deepEqual = require('deep-equal');
var Utils = require('../utils');
var TreeSelect = require('../treeSelect');

module.exports = React.createClass({
    displayName: 'exports',


    getInitialState: function getInitialState() {
        return {
            timeOut: null,
            focusId: this.props.defaultValue,
            listData: clone(this.props.listData),
            showTree: this.props.showTree
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            showTree: false,
            searchable: true,
            treeConfig: {
                treeData: [],
                displayKey: 'name',
                displayValue: 'value',
                valuePath: ''
            },
            className: '',
            displayKey: 'text',
            displayValue: 'id',
            listData: [],
            defaultValue: null,
            operaData: [{
                className: 'icon-pencil5', onClick: function onClick(e, item) {
                    console.log(item);
                }
            }, {
                className: 'icon-cross2', onClick: function onClick(e, item) {
                    console.log(item);
                }
            }]
        };
    },

    componentWillMount: function componentWillMount() {},

    componentDidMount: function componentDidMount() {},

    componentWillUnmount: function componentWillUnmount() {},

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue != this.state.focusId) {
            this.state.focusId = nextProps.defaultValue;
        }
        var dataChange = false;
        if (!deepEqual(this.props.listData, nextProps.listData)) {
            dataChange = true;
        }
        if (dataChange) {
            this.state.listData = clone(nextProps.listData);
        }
    },

    _onClick: function _onClick(e, item) {
        this.setState({ focusId: item[this.props.displayValue] });
        typeof this.props.onChange == 'function' && this.props.onChange(e, item);
    },

    _search: function _search(value) {
        var self = this;
        return this.props.listData.filter(function (item) {
            return item[self.props.displayKey].indexOf(value) > -1;
        });
    },

    _onSearch: function _onSearch(e) {
        var self = this,
            value = e.target.value;
        if (!value.trim()) {
            this.setState({ showTree: true });
            return;
        }

        var listData = this._search(value.trim());
        if (this.state.timeOut) {
            clearTimeout(this.state.timeOut);
        }
        this.state.timeOut = setTimeout(function () {
            self.setState({ listData: listData, showTree: !!!value });
        }, 300);
    },

    _onChecked: function _onChecked(checked, selectItems) {
        typeof this.props.onChange == 'function' && this.props.onChange(null, selectItems[0]);
    },

    render: function render() {
        var self = this;
        return React.createElement(
            'div',
            { className: 'list-menu' },
            this.props.searchable ? React.createElement(
                'div',
                { className: 'search-container' },
                React.createElement('input', { type: 'text', className: 'menu-search', onChange: this._onSearch, placeholder: '\u641C\u7D22' })
            ) : null,
            React.createElement(
                'div',
                { className: 'list-body' },
                React.createElement(
                    'ul',
                    { className: 'ul-list ' + (this.state.showTree && this.props.showTree ? ' none' : '') + this.props.className },
                    this.state.listData.length ? this.state.listData.map(function (item) {
                        return React.createElement(
                            'li',
                            { className: self.state.focusId == item[self.props.displayValue] ? 'li-item focus-in' : 'li-item',
                                key: Utils.CommonUtil.getRandomId(), onClick: function onClick(e) {
                                    self._onClick(e, item);
                                } },
                            React.createElement(
                                'a',
                                { href: 'javascript:;' },
                                React.createElement(
                                    'span',
                                    null,
                                    item[self.props.displayKey]
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'opera-container' },
                                    self.props.operaData.map(function (barItem) {
                                        return React.createElement('span', {
                                            className: barItem.className,
                                            onClick: function onClick(barE) {
                                                barE.stopPropagation();typeof barItem.onClick == 'function' && barItem.onClick(barE, item);
                                            },
                                            key: Utils.CommonUtil.getRandomId()
                                        });
                                    })
                                )
                            )
                        );
                    }) : React.createElement(
                        'li',
                        { className: 'li-item' },
                        '\u6CA1\u6709\u6570\u636E'
                    )
                ),
                this.state.showTree && this.props.showTree ? React.createElement(TreeSelect, {
                    data: this.props.treeConfig.treeData,
                    displayKey: this.props.treeConfig.displayKey,
                    displayValue: this.props.treeConfig.displayValue,
                    valuePath: this.props.treeConfig.valuePath,
                    showCheckBox: false,
                    onChange: this._onChecked
                }) : null
            )
        );
    }
});