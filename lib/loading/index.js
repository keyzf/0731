'use strict';

/**
 * Created by zeezhang on 2017/1/10.
 */
var React = require('react');
var svgSources = require('./svg');

module.exports = React.createClass({
    displayName: 'exports',

    propTypes: {
        color: React.PropTypes.string,
        delay: React.PropTypes.number,
        height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        type: React.PropTypes.string,
        width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
    },

    getInitialState: function getInitialState() {
        return {
            delayed: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            style: {},
            delay: 1000,
            type: 'balls'

        };
    },

    componentWillMount: function componentWillMount() {
        var _this = this;

        var delayed = this.props.delay > 0;

        if (delayed) {
            this.setState({ delayed: true });
            this._timeout = setTimeout(function () {
                _this.setState({ delayed: false });
            }, this.props.delay);
        }
    },

    componentDidMount: function componentDidMount() {},

    componentWillUnMount: function componentWillUnMount() {
        this._timeout && clearTimeout(this._timeout);
    },

    render: function render() {
        var type = this.state.delayed ? 'blank' : this.props.type;
        var svg = svgSources[type];
        var style = Object.assign({ fill: '#44b549', height: 40, width: 40 }, this.props.style);

        return React.createElement('div', {
            className: 'loading-icon-container',
            style: style,
            dangerouslySetInnerHTML: { __html: svg }
        });
    }
});