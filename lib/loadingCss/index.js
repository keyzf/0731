'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ClassNames = require('classnames');

module.exports = React.createClass({
	displayName: 'exports',

	propTypes: {
		type: React.PropTypes.string,
		size: React.PropTypes.string,
		active: React.PropTypes.bool,
		color: React.PropTypes.string
	},

	getInitialState: function getInitialState() {
		return {};
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'ball-pulse',
			size: 'md',
			active: true
		};
	},

	Types: {
		"ball-pulse": 3,
		"ball-grid-pulse": 9,
		"ball-clip-rotate": 1,
		"ball-clip-rotate-pulse": 2,
		"square-spin": 1,
		"ball-clip-rotate-multiple": 2,
		"ball-pulse-rise": 5,
		"ball-rotate": 1,
		"cube-transition": 2,
		"ball-zig-zag": 2,
		"ball-zig-zag-deflect": 2,
		"ball-triangle-path": 3,
		"ball-scale": 1,
		"line-scale": 5,
		"line-scale-party": 4,
		"ball-scale-multiple": 3,
		"ball-pulse-sync": 3,
		"ball-beat": 3,
		"line-scale-pulse-out": 5,
		"line-scale-pulse-out-rapid": 5,
		"ball-scale-ripple": 1,
		"ball-scale-ripple-multiple": 3,
		"ball-spin-fade-loader": 8,
		"line-spin-fade-loader": 8,
		"triangle-skew-spin": 1,
		"pacman": 5,
		"ball-grid-beat": 9,
		"semi-circle-spin": 1
	},

	removeType: function removeType(key) {
		delete this.Types[key];
	},

	addType: function addType(key, nDivs) {
		return this.Types[key] = nDivs;
	},

	renderDiv: function renderDiv(n) {
		var styles = this.props.styles || {};
		if (this.props.color) {
			styles.backgroundColor = this.props.color;
		}
		return React.createElement('div', { key: n, style: styles });
	},

	range: function range(x) {
		var i = -1,
		    arr = [];
		while (++i < x) {
			arr.push(i);
		}
		return arr;
	},

	render: function render() {
		var _ClassNames;

		var self = this;
		var nDivs = this.range(this.Types[this.props.type]);
		var classes = ClassNames((_ClassNames = {
			loader: true
		}, _defineProperty(_ClassNames, 'loader-' + this.props.size, this.props.size !== 'md'), _defineProperty(_ClassNames, 'loader-active', this.props.active), _defineProperty(_ClassNames, 'loader-hidden', !this.props.active), _ClassNames), this.props.className);

		return React.createElement(
			'div',
			{ className: classes },
			React.createElement(
				'div',
				{ className: 'loader-inner ' + this.props.type },
				nDivs.map(function (n) {
					var styles = self.props.styles || {};
					if (self.props.color) {
						styles.backgroundColor = self.props.color;
					}
					return React.createElement('div', { key: n, style: styles });
				})
			)
		);
	}
});