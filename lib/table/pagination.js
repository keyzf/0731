'use strict';

var React = require('react');
var Utils = require('../utils');
var classnames = require('classnames');

var Pagination = React.createClass({
  displayName: 'Pagination',

  propTypes: {
    total: React.PropTypes.number,
    offset: React.PropTypes.number,
    limit: React.PropTypes.number,
    onPageChange: React.PropTypes.func,
    onPageLimitChange: React.PropTypes.func,
    redirectText: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      total: 0,
      offset: 0,
      limit: 10,
      limitSettingItems: [10, 20, 100],
      redirectText: '跳转'
    };
  },
  getInitialState: function getInitialState() {
    return {
      offsetLimit: this.props.limit,
      text: ''
    };
  },
  _createButtons: function _createButtons() {
    var startIndex = this.props.offset;
    var endIndex = this.props.offset;

    var buttonCount = 5 - 1;
    while (buttonCount > 0) {
      var all = true;
      if (startIndex > 0) {
        startIndex--;
        buttonCount--;
        all = false;
      }
      if (endIndex < Math.ceil(this.props.total / this.props.limit) - 1) {
        endIndex++;
        buttonCount--;
        all = false;
      }
      if (all) {
        break;
      }
    }

    var that = this;
    var ele = [];
    if (startIndex > 0) {
      var _firstPage = function (index) {
        return function () {
          that._changePage(index);
        };
      }(0);
      var ico = '<<';
      ele.push(React.createElement(
        'li',
        { key: 'startstart', onClick: _firstPage },
        React.createElement(
          'a',
          null,
          ico
        )
      ));
      var _prePage = function (index) {
        return function () {
          that._changePage(index);
        };
      }(Math.max(this.props.offset - 1, 0));
      var ico = '<';
      ele.push(React.createElement(
        'li',
        { key: 'start', onClick: _prePage },
        React.createElement(
          'a',
          null,
          ico
        )
      ));
    }
    for (var index = startIndex; index <= endIndex; index++) {
      var num = index + 1;
      if (index == this.props.offset) {
        ele.push(React.createElement(
          'li',
          { className: 'active', key: index },
          React.createElement(
            'a',
            null,
            num
          )
        ));
      } else {
        var _changePage = function (index) {
          return function () {
            that._changePage(index);
          };
        }(index);
        ele.push(React.createElement(
          'li',
          { key: index, onClick: _changePage },
          React.createElement(
            'a',
            null,
            num
          )
        ));
      }
    }
    if (endIndex < Math.ceil(this.props.total / this.props.limit) - 1) {
      var _nextPage = function (index) {
        return function () {
          that._changePage(index);
        };
      }(Math.min(this.props.offset + 1, Math.ceil(this.props.total / this.props.limit) - 1));
      var ico = '>';
      ele.push(React.createElement(
        'li',
        { key: 'end', onClick: _nextPage },
        React.createElement(
          'a',
          null,
          ico
        )
      ));
      var _lastPage = function (index) {
        return function () {
          that._changePage(index);
        };
      }(Math.ceil(this.props.total / this.props.limit) - 1);
      var ico = '>>';
      ele.push(React.createElement(
        'li',
        { key: 'endend', onClick: _lastPage },
        React.createElement(
          'a',
          null,
          ico
        )
      ));
    }
    return ele;
  },
  _changePage: function _changePage(index) {
    if (typeof this.props.onPageChange === 'function') {
      this.props.onPageChange(index);
    }
  },
  _createLimitSetting: function _createLimitSetting() {
    var that = this;
    var buttons = this.props.limitSettingItems.map(function (obj, i) {
      var _setLimit = function _setLimit() {
        that._setLimit(obj);
      };

      var style = {
        display: 'inline-block',
        margin: 'auto 2px',
        cursor: 'pointer'
      };
      if (obj === that.state.offsetLimit) style.color = '#2196F3';
      return React.createElement(
        'div',
        { key: i, onClick: _setLimit, style: style },
        obj
      );
    });

    return React.createElement(
      'div',
      { style: { float: 'left', marginTop: 27 } },
      this.props.total ? React.createElement(
        'div',
        { style: { display: 'inline-block' } },
        '\u5171',
        this.props.total,
        '\u6761\u8BB0\u5F55\uFF0C'
      ) : null,
      React.createElement(
        'div',
        { style: { display: 'inline-block' } },
        '\u6BCF\u9875\u663E\u793A'
      ),
      buttons,
      React.createElement(
        'div',
        { style: { display: 'inline-block' } },
        '\u6761'
      )
    );
  },
  _setLimit: function _setLimit(limit) {
    this.setState({
      offsetLimit: limit
    });
    if (typeof this.props.onPageLimitChange === 'function') {
      this.props.onPageLimitChange(limit);
    }
  },
  _textChange: function _textChange(event) {
    this.setState({
      text: event.target.value
    });
  },
  _onRedirect: function _onRedirect() {
    var index = parseInt(this.state.text) - 1;
    if (typeof index === 'number' && index >= 0 && index <= Math.ceil(this.props.total / this.props.limit) - 1) {
      this._changePage(index);
    } else if (index < 0 || index > this.props.total - 1) {
      Utils.prompt('页码超过范围');
    } else {
      Utils.prompt('请输入欲跳转的页码');
    }
  },
  render: function render() {
    var buttons = this._createButtons();
    return React.createElement(
      'div',
      { className: 'pagination-wrapper clearfix', style: { paddingLeft: 10, paddingRight: 10 } },
      React.createElement(
        'div',
        { style: { float: 'right', verticalAlign: 'middle' } },
        buttons && buttons.length > 1 ? React.createElement(
          'ul',
          { className: 'pagination pagination-flat', style: { display: 'inline-block', verticalAlign: 'middle' } },
          buttons
        ) : null,
        this.props.redirectText && Math.ceil(this.props.total / this.props.limit) > 1 ? React.createElement(
          'div',
          { style: { display: 'inline-block', verticalAlign: 'middle' } },
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: this.state.text,
            onChange: this._textChange,
            style: { display: 'inline-block', verticalAlign: 'middle', width: 50, marginLeft: 10, marginRight: 10 } }),
          React.createElement(
            'button',
            {
              style: { display: 'inline-block', verticalAlign: 'middle' },
              type: 'button',
              className: 'btn bg-blue-ws',
              onClick: this._onRedirect },
            this.props.redirectText
          )
        ) : null
      ),
      typeof this.props.onPageLimitChange === 'function' ? this._createLimitSetting() : null
    );
  }
});

module.exports = Pagination;