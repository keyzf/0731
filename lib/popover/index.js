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
var Popover = React.createClass({
  displayName: 'Popover',

  propTypes: {
    /**
     * 是否显示，例：true
     */
    show: React.PropTypes.bool,
    /**
     * 弹出方向，例：'left'
     */
    direction: React.PropTypes.any,
    /**
     * 标题，例：'自定义跟随弹层'
     */
    title: React.PropTypes.any,
    /**
     * 内容，例: (<div></div>)
     */
    content: React.PropTypes.any
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
  componentDidMount: function componentDidMount() {
    window.addEventListener('click', this._onWindowClick);
    window.addEventListener('scroll', this._onWindowScroll);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('click', this._onWindowClick);
    window.addEventListener('scroll', this._onWindowScroll);
  },
  _onWindowClick: function _onWindowClick(event) {
    var popover = ReactDom.findDOMNode(this);
    if (event.target !== popover && !popover.contains(event.target) && this.state.show) {
      this.setState({
        show: false
      });
    }
  },
  _onWindowScroll: function _onWindowScroll() {
    var self = this;
    if (self.refs.popover) {
      self._updatePosition();
    }
  },

  _show: function _show(e) {
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
    result = getposition(null, self.refs.target, self.refs.popover, direction, 'solid', offset);
    if (result.isNewState) {
      // Switch to reverse placement
      return self._updatePosition(result.newState.place);
    }
    self.setState({
      direction: direction,
      position: result.position
    });
  },
  hide: function hide() {
    this.setState({
      show: false
    });
  },
  _renderContent: function _renderContent() {
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
        { className: className, style: style, ref: 'popover' },
        React.createElement('div', { className: 'arrow' }),
        this.props.title ? React.createElement(
          'h3',
          { className: 'popover-title' },
          this.props.title
        ) : null,
        React.createElement(
          'div',
          { className: 'popover-content' },
          this.props.content
        )
      );
    } else return null;
  },
  render: function render() {
    var self = this;
    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        ref: 'target',
        onClick: function onClick() {
          self._show();
        }
      });
    });

    return React.createElement(
      'div',
      { className: classnames({ 'tooltip-con': true }, this.props.className), style: assign({}, this.props.style) },
      children,
      this._renderContent()
    );
  }
});

module.exports = Popover;