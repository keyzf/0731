'use strict';

var React = require('react');
var Utils = require('../utils');

module.exports = React.createClass({
    displayName: 'exports',

    propTypes: {
        /**
         * title自定义
         */
        renderTitle: React.PropTypes.func,
        /**
         * 菜单自定义
         */
        renderMenu: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {};
    },

    getDefaultProps: function getDefaultProps() {
        return {
            title: '',
            className: '',
            menuData: []
        };
    },

    componentWillMount: function componentWillMount() {},

    componentDidMount: function componentDidMount() {},

    componentWillUnmount: function componentWillUnmount() {},

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},

    _renderMenuItem: function _renderMenuItem() {
        var self = this;
        return this.props.menuData.map(function (item, index) {
            if (typeof self.props.renderMenu == 'function') {
                return self.props.renderMenu(item, index, Utils.CommonUtil.getRandomId());
            } else {
                return React.createElement(
                    'li',
                    { className: item.className, onClick: item.onClick, key: Utils.CommonUtil.getRandomId() },
                    React.createElement(
                        'a',
                        { href: item.url ? item.url : 'javascript:;', target: '_self' },
                        item.text
                    )
                );
            }
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: "drop-down " + this.props.className },
            React.createElement(
                'a',
                { href: 'javascript:;', className: 'drop-down-toggle' },
                typeof this.props.renderTitle == 'function' ? this.props.renderTitle(this.props.title) : React.createElement(
                    'span',
                    { className: 'drop-down-text' },
                    this.props.title
                )
            ),
            React.createElement(
                'div',
                { className: 'drop-down-menu' },
                React.createElement(
                    'ul',
                    { className: 'menu-ul' },
                    this._renderMenuItem()
                )
            )
        );
    }
});