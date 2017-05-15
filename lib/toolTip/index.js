'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var getposition = require('./getposition');

/**
 * 气泡提示信息
 */
var Tooltip = React.createClass({
  displayName: 'Tooltip',

  propTypes: {
    /**
     * 标题，例：'提示'
     */
    title: React.PropTypes.any,

    /**
     * 弹出方向，例：'left'
     */
    direction: React.PropTypes.any
  },
  getDefaultProps: function getDefaultProps() {
    return {
      direction: 'right'
    };
  },
  getInitialState: function getInitialState() {
    return {
      show: false,
      direction: this.props.direction,
      position: {}
    };
  },

  _onMouseLeave: function _onMouseLeave() {
    this.setState({
      show: false
    });
  },
  componentDidMount: function componentDidMount() {},
  _onMouseEnter: function _onMouseEnter(e) {
    var self = this;
    this.setState({
      show: true
    }, function () {
      self._updatePosition();
    });
  },
  _updatePosition: function _updatePosition(direction) {
    var self = this;
    var offset = {},
        result;
    direction = direction || this.props.direction;
    direction == 'right' ? offset.right = 5 : null;
    direction == 'left' ? offset.left = 5 : null;
    direction == 'top' ? offset.top = 5 : null;
    direction == 'bottom' ? offset.bottom = 5 : null;
    result = getposition(null, self.refs.tip, self.refs.tooltip, direction, 'solid', offset);
    if (result.isNewState) {
      // Switch to reverse placement
      return self._updatePosition(result.newState.place);
    }
    self.setState({
      direction: direction,
      position: result.position
    });
  },
  _renderInfo: function _renderInfo() {
    if (this.state.show) {
      var style = {};
      if (this.state.position) {
        style.left = this.state.position.left;
        style.top = this.state.position.top;
      }
      var className = classnames({
        popover: true,
        left: this.state.direction == 'left' ? true : false,
        right: this.state.direction == 'right' ? true : false,
        top: this.state.direction == 'top' ? true : false,
        bottom: this.state.direction == 'bottom' ? true : false
      });
      return React.createElement(
        'div',
        { className: className, style: style, ref: 'tooltip' },
        React.createElement('div', { className: 'arrow' }),
        this.props.title ? React.createElement(
          'h3',
          { className: 'popover-title' },
          this.props.title
        ) : null,
        React.createElement(
          'div',
          { className: 'popover-content' },
          this.props.children
        )
      );
    } else return null;
  },
  render: function render() {
    return React.createElement(
      'div',
      {
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        className: classnames({ 'tooltip-con': true }, this.props.className),
        style: assign({}, this.props.style) },
      React.createElement('i', { className: 'icon-question4', ref: 'tip', style: this.props.color ? { color: this.props.color } : null }),
      this._renderInfo()
    );
  }
});

module.exports = Tooltip;