'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var Clone = require('clone');
var Assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var TreeSelect = require('../treeSelect');
var Utils = require('../utils');
/**
 * 单个单选框，多个单选框推荐直接使用RadioGroup
 */
var PullDownTree = React.createClass({
    displayName: 'PullDownTree',

    propTypes: {
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
            term: '',
            treeId: Utils.CommonUtil.getRandomId(),
            selectItems: [],
            open: false,
            treeData: this.props.data,
            listData: [],
            showCheckBox: true
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            checked: false,
            linkage: true, //是否联动
            onChange: null,
            disabled: false,
            displayKey: 'name',
            displayValue: 'value',
            childrenKey: 'children'
        };
    },

    componentWillMount: function componentWillMount() {
        this.state.treeData = this.props.data;
        this._getArrListData(this.state.treeData);
    },
    componentWillUnmount: function componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.componentWillMount();
    },

    _getArrListData: function _getArrListData(treeData) {
        var self = this,
            arrListData = [],
            selectItems = [],
            selectIds = [];
        Utils.CommonUtil.traverseTreeData(treeData, {
            childrenKey: this.props.childrenKey, callFn: function callFn(node, parentNode) {
                var item = {};
                for (var key in node) {
                    if (key != self.props.childrenKey) {
                        item[key] = node;
                    }
                }
                if (node.checked) {
                    selectItems.push(node);
                    selectIds.push(node[self.props.displayValue]);
                }
                arrListData.push(node);
            }
        });

        this.setState({
            arrListData: arrListData,
            selectItems: selectItems,
            selectIds: selectIds
        });
    },

    _onChange: function _onChange(selected, selectItems) {
        this.setState({
            selectedIds: selected,
            selectItems: selectItems
        });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(selected, selectItems);
        }
    },

    _setDropState: function _setDropState(open) {

        if (typeof open === 'undefined' || open == null) {
            open = !this.state.open;
        }
        this.setState({
            open: open
        }, function () {
            if (this.state.open) {
                document.addEventListener('click', this._handleClickOutside);
            } else {
                document.removeEventListener('click', this._handleClickOutside);
            }
        });
    },

    _handleClick: function _handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.disabled) return;
        this._setDropState();
    },

    _handleClickOutside: function _handleClickOutside(event) {
        console.log('click out');
        if (!this.state.open) {
            return;
        }
        var outsideFlag = true,
            selectEle = ReactDom.findDOMNode(this.refs.select_div),
            eventTarget = event.target ? event.target : event.srcElement,
            treeId;

        while (eventTarget != null) {
            treeId = eventTarget.getAttribute ? eventTarget.getAttribute('data-id') || '' : '';
            if (eventTarget === selectEle || treeId.indexOf(this.state.treeId) != -1) {
                outsideFlag = false;
                break;
            }
            // eventTarget = eventTarget.offsetParent;
            eventTarget = eventTarget.parentNode;
        }

        if (outsideFlag) {
            this._setDropState(false);
        }
    },

    _handleMultiAutoClick: function _handleMultiAutoClick(e) {
        ReactDom.findDOMNode(this.refs.selectInput).focus();
    },

    _handleInputFocus: function _handleInputFocus(e) {
        this._handleInputChange(e);
    },

    _handleInputBlur: function _handleInputBlur(e) {
        /* var self = this;
         setTimeout(function () {
         self.setState({
         open: false
         });
         self.props.onBlur && self.props.onBlur(self.state.term, self.props.valuePath);//zee
         }, 300)*/

    },

    _handleInputChange: function _handleInputChange(e) {

        var self = this,
            changeState = {
            term: e.target.value,
            //options: this._getSearchOption(e.target.value),
            selectedOption: null
        };
        this._setDropState(true);
        /*   this.setState(changeState, function () {
         self.props.onUpdate && self.props.onUpdate(self.state.term, self.props.valuePath)
         });*/
    },

    //获取搜索
    _getSearchOption: function _getSearchOption(value) {
        var self = this;
        if (typeof value === 'undefined' || value == null || value === '') {
            return Clone(this.props.options);
        } else {
            return this.props.options.filter(function (item) {
                return (value || value === 0) && item[self.props.displayKey].indexOf(value) > -1;
            });
        }
    },

    _handleInputKeyDown: function _handleInputKeyDown(e) {
        return; //暂时无时间做下面逻辑
        var self = this,
            index;
        switch (e.keyCode) {
            case 13:
                // enter
                if (this.props.searchable || this.props.autocomplete) {
                    this.state.options.forEach(function (item, index) {
                        if (item[self.props.displayKey] != self.state.term) {
                            return;
                        }
                        self.state.focusedOption = item;
                        self.state.focusedIndex = index;
                    });
                }
                if (this.props.multiselect && !this.state.focusedOption) {
                    //zee add for multiselect
                    return;
                }
                this._selectItem(this.state.focusedOption, this.state.focusedIndex);
                break;
            case 27:
                // escape
                this.setState({
                    name: null
                });
                break;
            case 38:
                // up
                if (!this.state.focusedOption) {
                    index = this.state.options.length - 1;
                    this.setState({
                        focusedIndex: index,
                        focusedOption: this.state.options[index],
                        term: this.state.options[index][this.props.displayKey]
                    });
                    break;
                }
                for (index in this.state.options) {
                    if (this.state.options[index][this.props.displayValue] == this.state.focusedOption[this.props.displayValue]) {
                        index = index == 0 ? this.state.options.length - 1 : parseInt(index) - 1;
                        if (this.state.options[index]) {
                            this.setState({
                                focusedIndex: index,
                                focusedOption: this.state.options[index],
                                term: this.state.options[index][this.props.displayKey]
                            });
                        }
                        break;
                    }
                }
                break;
            case 40:
                // down
                if (!this.state.focusedOption) {
                    index = 0;
                    this.setState({
                        focusedIndex: index,
                        focusedOption: this.state.options[index],
                        term: this.state.options[index][this.props.displayKey]
                    });
                    break;
                }
                for (index in this.state.options) {
                    if (this.state.options[index][this.props.displayValue] == this.state.focusedOption[this.props.displayValue]) {
                        index = index == this.state.options.length - 1 ? 0 : parseInt(index) + 1;
                        if (this.state.options[index]) {
                            this.setState({
                                focusedIndex: index,
                                focusedOption: this.state.options[index],
                                term: this.state.options[index][this.props.displayKey]
                            });
                        }
                        break;
                    }
                }
                break;
            case 8:
                // backspace
                if (this.props.multiselect && !this.state.term) {
                    if (this.state.selectItems && this.state.selectItems.length > 0) {
                        this.state.selectItems.splice(this.state.selectItems.length - 1, 1);

                        var values = this.state.selectItems.map(function (item) {
                            return item[self.props.displayValue];
                        });

                        this.props.onChange(values, this.state.selectItems, this.props.valuePath);
                        this.forceUpdate(function () {
                            self._handleMultiAutoClick();
                        });
                    }
                }
                return;
            default:
                return;
        }
        e.preventDefault();
    },

    _createChoice: function _createChoice() {
        var self = this,
            choices = this.state.selectItems.map(function (item, i) {
            var remove = function remove(ev) {
                ev.stopPropagation();
                for (var j = 0; j < self.state.selectItems.length; j++) {
                    if (self.state.selectItems[j][self.props.displayValue] === item[self.props.displayValue]) {
                        self.state.selectItems.splice(j, 1);
                    }
                }

                if (typeof self.props.onChange === 'function') {
                    var values = self.state.selectItems.map(function (item) {
                        return item[self.props.displayValue];
                    });
                    self.props.onChange(values, self.state.selectItems, self.props.valuePath);
                }
                self.forceUpdate();
            };
            return React.createElement(
                'li',
                { key: i, className: 'select2-search-choice' },
                React.createElement(
                    'div',
                    null,
                    item[self.props.displayKey]
                ),
                React.createElement('a', { className: 'select2-search-choice-close', onClick: remove })
            );
        });
        return choices;
    },

    render: function render() {
        var self = this,
            dropStyle = Assign({
            display: this.state.open ? 'block' : 'none'
        }, this.props.dropStyle),
            choices = this._createChoice();
        return React.createElement(
            'div',
            {
                className: 'select2-container select select2-container-multi',
                style: Assign({}, this.props.style),
                ref: 'select_div'
            },
            React.createElement(
                'ul',
                {
                    className: 'select2-choices',
                    onClick: this._handleMultiAutoClick
                },
                choices.concat(React.createElement(
                    'li',
                    { key: self.state.selectItems.length, className: 'select2-search-field' },
                    React.createElement('input', {
                        ref: 'selectInput',
                        type: 'text',
                        value: self.state.term,
                        className: 'select2-input multi-select',
                        onFocus: self._handleInputFocus,
                        onBlur: self._handleInputBlur,
                        onChange: self._handleInputChange,
                        onPaste: self._handleInputPaste,
                        onKeyDown: self._handleInputKeyDown
                    })
                ))
            ),
            React.createElement(
                'div',
                { className: 'select2-drop select2-drop-active', ref: 'drop', style: dropStyle },
                React.createElement(
                    'ul',
                    { className: 'select2-results' },
                    React.createElement(TreeSelect, {
                        ref: 'pullDownTree',
                        treeId: 'pdt-' + this.state.treeId,
                        data: this.state.treeData,
                        displayKey: this.props.displayKey,
                        displayValue: this.props.displayValue,
                        valuePath: this.props.valuePath,
                        linkage: this.props.linkage,
                        onChange: this._onChange
                    })
                )
            )
        );
    }
});

module.exports = PullDownTree;