'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var ReactRouter = require('react-router');

var clone = require('clone');

var Navigation = React.createClass({
  displayName: 'Navigation',

  propTypes: {
    data: React.PropTypes.any, // 导航数据配置，例[{text: '第一项', alias: '1', url: ['/page1', '/page1/1'], value: [{text: '子项', alias: '1-1', url: 'page1/1'}]}]
    cellHeight: React.PropTypes.number, //每个第二级属性高度，例：40
    dataLayerRange: React.PropTypes.number, // 支持data中的几级导航，值为1或2，例：2
    onlyOneUrl: React.PropTypes.bool, // 当有多个项的url均符合当前浏览器地址的时候，只显示其中一个，优先根据当前alias, 如：false
    maxWidth: React.PropTypes.number, // 最大宽度，例：200
    minWidth: React.PropTypes.number, // 最小宽度，例：60
    alwaysOpen: React.PropTypes.bool, // 永远打开，例：false

    onRedirect: React.PropTypes.func, // 自定义重定向回调，例：function(url, alias) {}
    onClickEye: React.PropTypes.func, // 小眼睛回调，不建议使用
    onClickLock: React.PropTypes.func, // 小锁回调，不建议使用
    onNotFoundCallback: React.PropTypes.func },
  contextTypes: {
    pathname: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      data: {},
      cellHeight: 40,
      beforeHashChange: null,
      afterHashChange: null,
      onRedirect: null,
      dataLayerRange: 2,
      onClickEye: null,
      customStyle: null, // 风格类型
      maxWidth: 200,
      minWidth: 60
    };
  },
  getInitialState: function getInitialState() {
    return {
      init: true,
      change: false,
      currentAlias: null, // 只有onlyOneUrl被开启时才有作用
      internalData: {},
      width: this.props.maxWidth
    };
  },
  componentWillMount: function componentWillMount() {
    this.parseData();
  },
  parseData: function parseData() {
    this.state.internalData = clone(this.props.data);
    /*
    if (this.props.dataLayerRange == 1) {
      for (var key in this.state.internalData) {
        delete this.state.internalData[key].value
      }
    }
    */
  },
  componentDidMount: function componentDidMount() {
    // 初始化处理一次状态
    window.addEventListener('hashchange', this._handleHashChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('hashchange', this._handleHashChange);
  },
  _handleHashChange: function _handleHashChange() {
    this._update();
  },
  componentDidUpdate: function componentDidUpdate() {
    // 打开关闭
    var data = this.state.internalData;
    var that = this;
    var menuEle = Object.keys(data).map(function (key, i) {
      var refName = 'layer2-box' + key;
      var value = data[key].value;
      if (typeof value != 'undefined' && value != null && value !== '' && that.props.dataLayerRange != 1) {
        var ele = Object.keys(value).map(function (k, ii) {
          return React.createElement(
            'div',
            { key: i + '-' + ii, className: 'layer2' },
            value[k].text
          );
        });
        var count = ele.length ? ele.length : 0;

        if (!data[key].open && !that.props.alwaysOpen) {
          ReactDom.findDOMNode(that.refs[refName]).style.height = '0px';
        } else {
          ReactDom.findDOMNode(that.refs[refName]).style.height = that.props.cellHeight * count + count - 1 + (that.props.customStyle == 'tae' ? 60 : 0) + 'px';
        }
      }
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.props = nextProps;
      this.parseData();
    }
  },
  _createMenu: function _createMenu() {
    this._updateSelected();

    var data = this.state.internalData;
    var that = this;

    var menuEle = Object.keys(data).map(function (key, i) {
      var refName = 'layer2-box' + key;
      var value = data[key].value;
      var subMenuEle = null;
      var subMenuHide = true;
      // 没有子节点或当前只响应一级配置就不会构造子节点
      if (typeof value != 'undefined' && value != null && value !== '' && that.props.dataLayerRange != 1) {
        var ele = Object.keys(value).map(function (k, ii) {
          var v = value;
          var __handleClick = function __handleClick() {
            that._onRedirect(v[k].url, v[k].alias);
          };
          var className = 'layer2';
          if (typeof v[k].selected != 'undefined' && v[k].selected === true) {
            className += ' active';
            subMenuHide = false;
          }
          return React.createElement(
            'li',
            { key: i + '-' + ii, className: className, style: that.props.customStyle == 'tae' ? {} : { paddingTop: 0 } },
            React.createElement(
              'a',
              { onClick: __handleClick },
              React.createElement(
                'span',
                null,
                v[k].text
              )
            )
          );
        });
        var count = ele.length ? ele.length : 0;
        if (that.props.customStyle == 'tae') {
          subMenuEle = React.createElement(
            'div',
            { className: 'submenu-ele-div' },
            React.createElement(
              'ul',
              { className: 'submenu-ele ' + (subMenuHide ? 'hidden-ul' : ''), ref: refName },
              React.createElement(
                'li',
                { className: 'submenu-ele-title' },
                data[key].text
              ),
              ele
            )
          );
        } else {
          subMenuEle = React.createElement(
            'ul',
            { className: 'submenu-ele ' + (subMenuHide ? 'hidden-ul' : ''), ref: refName },
            ele
          );
        }
      }

      var _handleClick = function _handleClick(open) {
        // 没有子节点是不能打开的，或者当前只响应第一级配置则也是不能打开的
        if (that.props.alwaysOpen) {} else if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0 || that.props.dataLayerRange == 1) {
          data[key].open = false;
        } else {
          if (that.props.customStyle == 'tae') {
            for (var k in data) {
              if (key == k) {
                data[k].open = true;
              } else {
                data[k].open = false;
              }

              ReactDom.findDOMNode(that.refs[refName]).style.height = '0px';
            }

            if (!data[key].open) {
              ReactDom.findDOMNode(that.refs[refName]).style.height = '0px';
            } else {
              ReactDom.findDOMNode(that.refs[refName]).style.height = that.props.cellHeight * count + count - 1 + (that.props.customStyle == 'tae' ? 60 : 0) + 'px';
            }
          } else {
            if (open === true) {
              data[key].open = true;
            } else if (open === false) {
              data[key].open = false;
            } else {
              if (data[key].lock) {
                if (typeof that.props.onClickLock === 'function') {
                  that.props.onClickLock();
                }
                return;
              }
              data[key].open = !data[key].open;
            }
            if (!data[key].open) {
              ReactDom.findDOMNode(that.refs[refName]).style.height = '0px';
            } else {
              ReactDom.findDOMNode(that.refs[refName]).style.height = that.props.cellHeight * count + count - 1 + (that.props.customStyle == 'tae' ? 60 : 0) + 'px';
            }
          }
        }

        that._update();

        if (that.props.alwaysOpen) {
          // 常开情况下 有子项的情况下只有点击子项才能跳转
          if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
            that._onRedirect(data[key].url, data[key].alias);
          }
        } else if (typeof data[key].url != 'undefined' && data[key].url != null && (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0 || that.props.dataLayerRange == 1 || that.props.customStyle == 'tae')) {
          that._onRedirect(data[key].url, data[key].alias);
        }
      };

      var _handleMouseOver = function _handleMouseOver() {
        data[key].eye = true;

        // 第一次操作时关闭初始化状态，使open属性不再依赖url的变化
        that.state.init = false;

        that.forceUpdate();
      };

      var _handleMouseOut = function _handleMouseOut(e) {
        data[key].eye = false;

        that.forceUpdate();
      };

      var _handleEyeClick = function _handleEyeClick(event) {
        event.stopPropagation();

        data[key].lock = !data[key].lock;
        if (data[key].lock === true) {
          _handleClick(false);
        }

        if (typeof that.props.onClickEye === 'function') {
          that.props.onClickEye(data[key].text, data[key].alias, data[key].lock);
        }

        that.forceUpdate();
      };

      var className = 'layer1';
      var icon = data[key].className ? React.createElement('i', { className: data[key].className }) : null;
      var textClassName = ''; // data[key].className
      if (typeof data[key].selected != 'undefined' && data[key].selected === true) {
        className += ' active';
        if (typeof textClassName != 'undefined') {
          textClassName += ' active';
        }
      }

      if (data[key].lock === true) {
        className += ' dark';
        if (typeof textClassName != 'undefined') {
          textClassName += ' dark';
        }
      } else {
        if (data[key].light) {
          className += ' light';
          if (typeof textClassName != 'undefined') {
            textClassName += ' light';
          }
        }
        if (data[key].sub_selected) {
          className += ' active';
          if (typeof textClassName != 'undefined') {
            textClassName += ' active';
          }
        }
      }

      return React.createElement(
        'li',
        {
          ref: data[key].alias,
          className: className,
          onMouseEnter: _handleMouseOver,
          onMouseLeave: _handleMouseOut,
          key: i },
        React.createElement(
          'a',
          { onClick: _handleClick },
          icon,
          ' ',
          React.createElement(
            'span',
            null,
            that.props.customStyle == 'tae' ? '' : data[key].text
          ),
          data[key].lock === true || data[key].eye && data[key].lock === false ? React.createElement('div', { className: data[key].lock ? 'eye-no-button' : 'eye-button', title: data[key].lock ? '点击开启模块' : '点击关闭模块，关闭后大屏幕将不会显示此模块', onClick: _handleEyeClick }) : null
        ),
        subMenuEle
      );
    });
    return menuEle;
  },
  _onRedirect: function _onRedirect(url, alias) {
    // 当前项有多个url则取第一个
    if (url instanceof Array) {
      url = url[0];
    }

    if (this.props.onlyOneUrl === true) {
      this.state.currentAlias = alias;
    }

    if (typeof this.props.onRedirect === 'function') {
      this.props.onRedirect(url, alias);
    } else {
      location.href = url;
    }
  },
  _clearSelected: function _clearSelected() {
    var data = this.state.internalData;
    var that = this;

    for (var key in data) {
      data[key].selected = false;
      for (var k in data[key].value) {
        data[key].value[k].selected = false;
      }
    }
  },
  _updateSelected: function _updateSelected() {
    this._clearSelected();

    var data = this.state.internalData;
    var url = this.context.pathname;

    // 使用完整字符串匹配方案，如果没有找到url的对应项采用带路由参数(:xxxx)的匹配方案
    if (!this._compare(url, data, this._equalUrl)) {
      // 如果匹配成功
      if (this._compare(url, data, this._accordUrl)) {
        // 是否需要剔除多项被同时选中
        this._ifOnlyOne(data);
      } else {
        // 没有匹配项则执行无匹配回调
        if (typeof this.props.onNotFoundCallback === 'function') {
          // 此url未找到
          this.props.onNotFoundCallback(url);
        }
      }
    } else {
      // 是否需要剔除多项被同时选中
      this._ifOnlyOne(data);
    }
  },
  _compare: function _compare(url, data, equalFunc) {
    switch (this.props.customStyle) {
      case 'tae':
        return this._compareTae(url, data, equalFunc);
      default:
        return this._compareDefault(url, data, equalFunc);
    }
  },
  _compareDefault: function _compareDefault(url, data, equalFunc) {
    var found = false;
    for (var key in data) {
      data[key].sub_selected = false;
      data[key].light = false;
      if (equalFunc(url, data[key].url)) {
        if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
          data[key].selected = true;
          found = true;
        }
      }

      // 如果当前页是被包含的第三级，也置为选中状态
      var _data = data[key];
      if (this.props.dataLayerRange == 1) {
        // 如果当前页是被包含的第二级，也置为选中状态
        _data = { value: data };
      }

      // 置为选中状态
      for (var k in _data.value) {
        var contain = false;
        if (typeof _data.value[k].value != 'undefined' && _data.value[k].value != null) {
          for (var g in _data.value[k].value) {
            if (equalFunc(url, _data.value[k].value[g].url)) {
              contain = true;
              break;
            }
          }
        }

        if (equalFunc(url, _data.value[k].url) || contain) {
          _data.value[k].selected = true;
          found = true;

          if (this.state.init) {
            if (_data.lock != true) {
              _data.open = true;
            }
          }
          _data.sub_selected = true;
        }
      }

      // 没有子节点是不能打开的
      if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
        data[key].open = false;
      }
      if (data[key].open) {
        data[key].light = true;
      }
    }

    return found;
  },
  _compareTae: function _compareTae(url, data, equalFunc) {
    var found = false;
    for (var key in data) {
      data[key].sub_selected = false;
      data[key].light = false;
      // 第一级只有一项打开，其余项必须关闭

      data[key].selected = false;
      data[key].open = false;
      for (var k in data[key].value) {
        data[key].value[k].selected = false;
      }

      if (equalFunc(url, data[key].url)) {
        data[key].selected = true;
        found = true;
        // 只要有子项就打开
        if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
          data[key].open = false;
          this.state.width = this.props.minWidth;
        } else {
          data[key].open = true;
          this.state.width = this.props.maxWidth;
        }
      }

      // 如果当前页是被包含的第三级，也置为选中状态
      var _data = data[key];
      if (this.props.dataLayerRange == 1) {
        // 如果当前页是被包含的第二级，也置为选中状态
        _data = { value: data };
      }

      // 置为选中状态
      for (var k in _data.value) {
        var contain = false;
        if (typeof _data.value[k].value != 'undefined' && _data.value[k].value != null) {
          for (var g in _data.value[k].value) {
            if (equalFunc(url, _data.value[k].value[g].url)) {
              contain = true;
              break;
            }
          }
        }

        if (equalFunc(url, _data.value[k].url) || contain) {
          _data.value[k].selected = true;
          found = true;
          _data.open = true;
          _data.sub_selected = true;
        }
      }

      // 没有子节点是不能打开的
      if (data[key].open) {
        data[key].light = true;
      }
    }
    return found;
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
  _ifOnlyOne: function _ifOnlyOne(data) {
    // 考虑多个相同url的项都被选中的情况
    if (this.props.onlyOneUrl === true) {
      if (this.state.currentAlias) {
        var selectOne = null;
        for (var key in data) {
          if (data[key].selected) {
            if (selectOne == null) {
              selectOne = data[key];
            } else if (selectOne != null && data[key].alias === this.state.currentAlias) {
              selectOne.selected = false;
              selectOne = data[key];
            } else {
              data[key].selected = false;
            }
          }

          for (var k in data[key].value) {
            if (data[key].value[k].selected) {
              if (selectOne == null) {
                selectOne = data[key].value[k];
              } else if (selectOne != null && data[key].value[k].alias === this.state.currentAlias) {
                selectOne.selected = false;
                selectOne = data[key].value[k];
              } else {
                data[key].value[k].selected = false;
              }
            }
          }
        }
        if (selectOne) {
          selectOne.selected = true;
        }
      } else {
        var selectOne = null;
        for (var key in data) {
          if (data[key].selected) {
            if (selectOne == null) {
              selectOne = data[key];
            } else {
              data[key].selected = false;
            }
          }

          for (var k in data[key].value) {
            if (data[key].value[k].selected) {
              if (selectOne == null) {
                selectOne = data[key].value[k];
              } else if (selectOne != null) {
                data[key].value[k].selected = false;
              }
            }
          }
        }
        if (selectOne) {
          selectOne.selected = true;
        }
      }
    }
  },
  _update: function _update() {
    this.setState({
      change: this.state.change
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'sidebar sidebar-main', style: this.props.customStyle == 'tae' ? { width: this.state.width } : {} },
      React.createElement('div', { className: 'sidebar-left-bg' }),
      React.createElement(
        'div',
        { className: 'sidebar-content' },
        React.createElement(
          'div',
          { className: 'sidebar-category sidebar-category-visible' },
          React.createElement(
            'div',
            { className: 'category-content no-padding' },
            React.createElement(
              'ul',
              { className: 'navigation navigation-main navigation-accordion ' + this.props.customStyle },
              this._createMenu()
            )
          )
        )
      )
    );
  }
});

module.exports = Navigation;