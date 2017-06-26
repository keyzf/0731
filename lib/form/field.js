'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Util = require('./util');

var Field = React.createClass({
  displayName: 'Field',

  propTypes: {
    label: React.PropTypes.any, //  填写字段中文标签
    desc: React.PropTypes.string //  填写内容描述
  },
  contextTypes: {
    form_id: React.PropTypes.string
  },
  getInitialState: function getInitialState() {
    return {
      validate: false,
      info: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      if (this.state.validate) {
        this.props = nextProps;
        this.doValidate();
      }
    }
  },
  componentDidMount: function componentDidMount() {
    Util.EventEmitter.dispatch('addField', { uuid: this.context.form_id, field: this });
  },
  componentWillUnmount: function componentWillUnmount() {
    Util.EventEmitter.dispatch('removeField', { uuid: this.context.form_id, field: this });
  },
  doValidate: function doValidate(nextProps) {
    var info = Util.validate(this.props.validation);
    if (info) {
      this.setState({
        validate: true,
        info: info
      });
      return false;
    } else {
      this.setState({
        info: null
      });
      return true;
    }
  },
  _calcCol: function _calcCol(col, type) {
    if (this.props.vertical) return 'col-xs-12';
    if (col) {
      return 'col-xs-' + col;
    } else {
      return type == 'label' ? 'col-xs-2' : 'col-xs-10';
    }
  },
  render: function render() {
    var info = this.state.info ? React.createElement(
      'span',
      { className: 'help-block' },
      this.state.info
    ) : null;
    var label = this.props.label ? React.createElement(
      'label',
      { className: 'control-label text-semibold text-' + (this.props.align == 'right' ? 'right' : 'left') + ' ' + this._calcCol(this.props.labelCol, 'label'), style: { width: this.props.labelWidth || '' } },
      this.props.label
    ) : null;
    var desc = this.props.desc ? React.createElement(
      'span',
      { className: 'help-block' },
      this.props.desc
    ) : null;
    var content = React.createElement(
      'div',
      { className: this._calcCol(this.props.contentCol, 'content') },
      this.props.children,
      info ? info : desc
    );
    return React.createElement(
      'div',
      { className: classnames({ 'form-group': true, 'clearfix': true, 'has-error': info ? true : false }, this.props.className), style: assign({}, this.props.style) },
      label,
      content
    );
  }
});

module.exports = Field;