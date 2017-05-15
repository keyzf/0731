'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var navigationH = React.createClass({
  displayName: 'navigationH',

  propTypes: {
    data: React.PropTypes.any, // 导航数据配置，例[{text: '第一项', alias: '1', url: ['/page1', '/page1/1'], value: [{text: '子项', alias: '1-1', url: 'page1/1'}]}]
    dataLayer: React.PropTypes.number, // 支持data中的第几级导航, 支持1到3, 目前只支持其中一行，例：2

    onRedirect: React.PropTypes.func, // 自定义重定向回调，例：function(url, alias) {}
    onNotFoundCallback: React.PropTypes.func },
  contextTypes: {
    pathname: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      defaultItem: null,
      data: {},
      onRedirect: null,
      dataLayer: 3
    };
  },
  getInitialState: function getInitialState() {
    return {
      current_alias: null,
      change: null
    };
  },
  componentDidMount: function componentDidMount() {
    this._update();

    window.addEventListener('hashchange', this._handleHashChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('hashchange', this._handleHashChange);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.props = nextProps;
    }
  },
  _handleHashChange: function _handleHashChange() {
    this._update();
  },
  _findConfigValue: function _findConfigValue() {
    var url = this.context.pathname;
    var data = this.props.data;

    var result = this._compare(url, data, this._equalUrl) || this._compare(url, data, this._accordUrl);
    if (typeof this.props.onNotFoundCallback === 'function') {
      result && result instanceof Array && result.length > 0 ? null : this.props.onNotFoundCallback(url);
    }
    return result;
  },
  _compare: function _compare(url, data, equalFunc) {
    var data = this.props.data;
    var url = this.context.pathname;

    var array = [];
    var value = null;
    if (typeof this.props.defaultItem != 'undefined' && this.props.defaultItem != null) {
      array.push(this.props.defaultItem);
    }

    var that = this;
    var find = function find(_data) {
      var contain = false;
      if (typeof _data.value != 'undefined' && _data.value != null) {
        for (var g in _data.value) {
          if (equalFunc(url, _data.value[g].url)) {
            that.state.current_alias = _data.value[g].alias;
            contain = true;
            break;
          }
        }
      }

      if (equalFunc(url, _data.url) || contain) {
        array.push({
          text: _data.text,
          url: _data.url,
          alias: _data.alias
        });
        value = _data.value;
      }
    };

    switch (this.props.dataLayer) {
      case 1:
        find({ value: data });
        break;
      case 2:
        for (var key in data) {
          find(data[key]);
        }
        break;
      default:
        for (var key in data) {
          for (var k in data[key].value) {
            find(data[key].value[k]);
          }
        }
        break;
    }

    return value;
  },
  _equalUrl: function _equalUrl(url, pattern) {
    if (pattern instanceof Array) {
      for (var key in pattern) {
        if (url === pattern[key]) {
          return true;
        }
      }
      return false;
    } else {
      return url === pattern;
    }
  },
  _accordUrl: function _accordUrl(url, pattern) {
    /*
     * url(/aaa/bcc)符合pattern(/aaa/:p)
     */
    if (pattern instanceof Array) {
      for (var key in pattern) {
        if (this._match(url, pattern[key])) {
          return true;
        }
      }
      return false;
    } else {
      return this._match(url, pattern);
    }
  },
  _match: function _match(url, pattern) {
    var paramMatch = true;
    var patternParam = this._getUrlVars(pattern);
    for (var key in patternParam) {
      if (this._getUrlVar(key, url) !== patternParam[key]) {
        paramMatch = false;
      }
    }
    // 参数不符合
    if (!paramMatch) {
      return false;
    }
    // url去掉参数进行比对
    url = url.replace(/\?[^\#]+/gi, '');

    var pattern = pattern;
    pattern = pattern.replace(/\/:[^\/]+/g, '/[^\/]+');
    pattern = pattern.replace(/\//g, '\\\/');
    pattern = new RegExp('^' + pattern + '$', 'gi');

    var result = url.match(pattern);
    return result && result.length > 0;
  },
  _getUrlVars: function _getUrlVars(url) {
    var vars = [],
        hash;
    if (typeof url === 'undefined' || url == null) {
      url = window.location.href;
    }

    if (url.indexOf('?') != -1) {
      var param = url.match(/\?[^\#]+/gi);
      if (param) {
        param = param[0];
        param = param.replace(/\?/gi, '');
        param = param.split(/[\&]/);
      }
      for (var i = 0; i < param.length; i++) {
        hash = param[i].split('=');
        vars[hash[0]] = hash[1];
      }
    }

    return vars;
  },
  _getUrlVar: function _getUrlVar(name, url) {
    return this._getUrlVars(url)[name];
  },
  _update: function _update() {
    this.setState({
      change: this.state.change
    });
  },
  _createOnClickFunction: function _createOnClickFunction(alias, url) {
    var that = this;
    return function () {
      that.setState({
        current_alias: alias
      });
      // 当前项有多个url则取第一个
      if (url instanceof Array) {
        url = url[0];
      }

      if (that.props.onRedirect != null) {
        that.props.onRedirect(url, alias);
      } else {
        window.location.href = '#' + url;
      }
    };
  },
  render: function render() {
    var value = this._findConfigValue();
    var links = [];
    for (var key in value) {
      links.push(React.createElement(
        'li',
        { key: key, className: 'dropdown mega-menu mega-menu-wide' + (value[key].alias == this.state.current_alias ? ' active' : '') },
        React.createElement(
          'a',
          { className: 'dropdown-toggle', onClick: this._createOnClickFunction(value[key].alias, value[key].url) },
          value[key].text
        )
      ));
    }

    return React.createElement(
      'ul',
      { className: 'nav navbar-nav' },
      links
    );
  }
});

module.exports = navigationH;