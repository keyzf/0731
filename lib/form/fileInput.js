'use strict';

var React = require('react');

var FileInput = React.createClass({
  displayName: 'FileInput',

  getInitialState: function getInitialState() {
    return {
      name: this.props.name
    };
  },
  _onClick: function _onClick(e) {
    e && e.preventDefault();
    this.refs['file-input'].click();
  },
  _onChange: function _onChange(e) {
    if (e.target.files.length) {
      this.setState({
        name: e.target.files[0].name
      });
      this.props.onChange && this.props.onChange(e);
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'file-input clearfix' },
      React.createElement(
        'div',
        { className: 'uploader bg-warning' },
        React.createElement(
          'span',
          { className: 'filename' },
          this.state.name ? this.state.name : '上传文件'
        ),
        React.createElement(
          'span',
          { className: 'action', onClick: this._onClick },
          React.createElement('i', { className: 'icon-googleplus5' })
        )
      ),
      React.createElement('input', {
        type: 'file',
        ref: 'file-input',
        onChange: this._onChange,
        style: { display: 'none' } })
    );
  }
});

module.exports = FileInput;