'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Image = React.createClass({
  displayName: 'Image',

  getDefaultProps: function getDefaultProps() {
    return {
      url: '',
      errorSrc: 'http://radmin.qq.com/static/img/head.png',
      noborder: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      url: this.props.url
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.url != nextProps.url) {
      this.props = nextProps;

      this.state.url = this.props.url;
    }
  },
  _handleError: function _handleError() {
    this.state.url = this.props.errorSrc;
    this.forceUpdate();
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: classnames({ image: 'true', 'noborder': this.props.noborder }, this.props.className), style: assign({}, this.props.style) },
      React.createElement('img', { src: this.state.url, onError: this._handleError, style: { width: '100%', height: '100%' } })
    );
  }
});

module.exports = Image;