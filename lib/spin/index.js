'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Utils = require('../utils');

/**
 * 等待接口返回时使用，并可遮挡界面以屏蔽重复操作
 */
var Spin = React.createClass({
  displayName: 'Spin',

  propTypes: {
    /**
     * 名称
     */
    statusType: React.PropTypes.any
  },
  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },
  interval: null,
  componentDidMount: function componentDidMount() {
    var self = this;
    if (this.props.statusType) {
      this.interval = window.setInterval(function () {
        var status = Utils.AjaxUtil.getStatus(self.props.statusType);
        if (status == 1) {
          self.setState({
            active: true
          });
        } else {
          self.setState({
            active: false
          });
        }
      }, 50);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    window.clearInterval(this.interval);
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ spin: true }, this.props.className), style: assign({}, this.props.style) },
      this.props.children,
      this.state.active ? React.createElement(
        'div',
        { className: 'overlay' },
        React.createElement('i', { className: 'icon-spinner4 spinner' })
      ) : null
    );
  }
});

module.exports = Spin;