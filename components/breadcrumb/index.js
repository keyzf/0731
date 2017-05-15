var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal')

/**
 * 提供面包屑功能
 */
var Breadcrumb = React.createClass({
  propTypes: {
    /**
     * 数据，例：[{text: '主页', alias: 'home-page', url: '/'}, {text: '项目列表', alias: 'project-list', url: '/project/list'}]
     */
    data: React.PropTypes.any,
    /**
     * 每个链接项之间的间隔符，例：'>'
     */
    tag: React.PropTypes.any,
    /**
     * 一些固定项放置在最前，例：[{text: '主页', alias: 'home-page', url: '/'}]
     */
    defaultItem: React.PropTypes.any,
    /**
     * 最后一项不要链接（一般最后一项为当前页面），例：true
     */
    lastItemWithoutLink: React.PropTypes.bool,

    /**
     * 自定义点击回调，设置此项后点击不会自动跳转url，例：function(url, alias, text) {}
     */
    onRedirect: React.PropTypes.func,
  },
  contextTypes: {
    pathname: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      defaultItem: null,
      data: {},
      tag: null,
      onRedirect: null,
      lastItemWithoutLink: true
    }
  },
  getInitialState: function () {
    return {
      change: null
    }
  },
  componentDidMount: function () {
    window.addEventListener('hashchange', this._handleHashChange)

    this._update()
  },
  componentWillUnmount: function () {
    window.removeEventListener('hashchange', this._handleHashChange)
  },
  _handleHashChange: function () {
    this._update()
  },
  _arrayIncludeUrl: function(array, url) {
    var include = false;
    array.map(function(str) {
      if (str === url) {
        include = true
      }
    });
    return include
  },
  _pushToArray: function (array, data, url) {
    for (var key in data) {
      if (url === data[key].url || (data[key].url instanceof Array && this._arrayIncludeUrl(data[key].url, url))) {
        if (typeof data[key].value === 'undefined' || data[key].value == null || data[key].value.length === 0) {
          array.push({
            text: data[key].text,
            url: data[key].url,
            alias: data[key].alias
          });
          return true
        }
      }
      array.push({
        text: data[key].text,
        url: data[key].url,
        alias: data[key].alias
      });
      if (this._pushToArray(array, data[key].value, url)) {
        return true
      } else {
        array.pop()
      }
    }
    return false
  },
  _createBreadcrumbArray: function (init) {
    var data = this.props.data;
    var url = this.context.pathname;
    var array = [];
    if (typeof this.props.defaultItem != 'undefined' && this.props.defaultItem != null) {
      array.push(this.props.defaultItem)
    }
    this._pushToArray(array, data, url);
    return array;
  },
  _update: function () {
    this.setState({
      change: this.state.change
    });
  },
  _createOnClickFunction: function (url, alias, text) {
    var that = this;
    return function () {
      if (that.props.onRedirect != null) {
        that.props.onRedirect(url, alias, text);
      } else {
        location.href = '#' + url;
      }
    }
  },
  render: function () {
    var array = this._createBreadcrumbArray();
    var links = [];
    var tag = this.props.tag || '>';
    for (var key in array) {
      if (array[key] !== array[array.length - 1]) {
        links.push(
          <li key={key}>
            <span onClick={this._createOnClickFunction(array[key].url, array[key].alias, array[key].text)} style={{cursor: 'pointer'}}>{array[key].text}</span>
          </li>
        )
      } else {
        if (this.props.lastItemWithoutLink) {
          links.push(
            <li key={key} className='active'>
              <span>{array[key].text}</span>
            </li>
          )
        } else {
          links.push(
            <li key={key} className='active'>
              <span onClick={this._createOnClickFunction(array[key].url, array[key].alias, array[key].text)} style={{cursor: 'pointer'}}>{array[key].text}</span>
            </li>
          )
        }
      }
    }

    return (
      <ul className={classnames({'breadcrumb': true}, this.props.className)} style={assign({}, this.props.style)}>
        {links}
      </ul>
    )
  }
});

module.exports = Breadcrumb;
