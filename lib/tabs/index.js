'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

/**
 * 用于切换不同显示内容
 */
var Tabs = React.createClass({
  displayName: 'Tabs',

  propTypes: {
    /**
     * 激活页签索引，例：1
     */
    active: React.PropTypes.number,
    /**
     * 是否竖向，例：false
     */
    vertical: React.PropTypes.bool,
    /**
     * 自动播放间隔，不设置为不自动播放，例：3000
     */
    autoplay: React.PropTypes.number,
    /**
     * 切换回调，例：function(index) {}
     */
    onChange: React.PropTypes.func,
    /**
     * 新增页签，例：function(index) {}
     */
    onAdd: React.PropTypes.func,
    /**
     * 删除页签，例：function(index) {}
     */
    onDelete: React.PropTypes.func

  },
  getDefaultProps: function getDefaultProps() {
    return {
      active: 0,
      vertical: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      scrolling: false,
      active: this.props.active,
      distance: 0,
      prevArrowDisabled: true,
      nextArrowDisabled: true
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.state.data, nextProps)) {
      if (deepEqual(this.props.children == nextProps.children)) {
        this.setState({
          active: nextProps.active || 0
        });
      } else {
        if (this.props.children.length > nextProps.children.length) {
          this.state.invokeDelete = true;
        } else if (this.props.children.length < nextProps.children.length) {
          this.state.invokeAdd = true;
        }
      }
    }
  },
  componentDidMount: function componentDidMount() {
    this._updateArrowStatus();
    this._enableAutoPlay();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._removeAutoPlay();
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._updateArrowStatus();
    this._updateTabs();
  },
  _enableAutoPlay: function _enableAutoPlay() {
    var self = this;
    if (this.props.autoplay) {
      this._removeAutoPlay();
      this._player = window.setInterval(function () {
        self.state.active = (self.state.active + 1) % self.props.children.length;
        self.forceUpdate();
        if (typeof self.props.onChange === 'function') {
          self.props.onChange(self.state.active);
        }
      }, this.props.autoplay);
    }
  },
  _removeAutoPlay: function _removeAutoPlay() {
    var self = this;
    if (this._player) {
      window.clearInterval(this._player);
    }
  },
  _updateTabs: function _updateTabs() {
    if (this.props.vertical || !this.props.children.length) {
      return;
    }
    if (this.state.invokeAdd) {
      this.setState({
        active: this.props.children.length - 1
      });
    }
    if (this.state.invokeAdd || this.state.invokeDelete && this.refs.tabsScroller.scrollWidth - this.refs.tabsScroller.children[this.state.active].offsetLeft <= this.refs.tabsWrapper.offsetWidth) {
      this.state.distance = this.refs.tabsWrapper.offsetWidth - this.refs.tabsScroller.scrollWidth;
      this.forceUpdate();
    }
    this.state.invokeAdd = false;
    this.state.invokeDelete = false;
  },
  _updateArrowStatus: function _updateArrowStatus() {
    if (!this.props.children.length) {
      return;
    }
    var self = this,
        scrolling,
        prevArrowDisabled,
        nextArrowDisabled;

    if (this.refs.tabsScroller.scrollWidth > this.refs.tabsWrapper.offsetWidth) {
      scrolling = true;
    } else {
      scrolling = false;
      this.state.distance = 0;
    }

    var firstShowArrow = this.state.scrolling != scrolling && scrolling;

    // left arrow
    prevArrowDisabled = this.state.distance == 0;
    // right arrow
    nextArrowDisabled = this.refs.tabsWrapper.offsetWidth - this.state.distance == this.refs.tabsScroller.scrollWidth;

    if (this.state.scrolling != scrolling || this.state.prevArrowDisabled != prevArrowDisabled || this.state.nextArrowDisabled != nextArrowDisabled) {
      this.setState({
        scrolling: scrolling,
        prevArrowDisabled: prevArrowDisabled,
        nextArrowDisabled: nextArrowDisabled
      }, function () {
        if (firstShowArrow) {
          self.setState({
            distance: this.refs.tabsWrapper.offsetWidth - this.refs.tabsScroller.scrollWidth
          });
        }
      });
    }
  },
  _prev: function _prev() {
    if (this.state.prevArrowDisabled) {
      return;
    }
    var distance = this.state.distance + this.refs.tabsWrapper.offsetWidth > 0 ? -this.state.distance : this.refs.tabsWrapper.offsetWidth;
    this.state.distance += distance;
    this.forceUpdate();
  },
  _next: function _next() {
    if (this.state.nextArrowDisabled) {
      return;
    }
    var distance = this.refs.tabsScroller.scrollWidth + this.state.distance - this.refs.tabsWrapper.offsetWidth;
    if (distance > this.refs.tabsWrapper.offsetWidth) {
      distance = this.refs.tabsWrapper.offsetWidth;
    }
    this.state.distance -= distance;
    this.forceUpdate();
  },

  _changeTab: function _changeTab(index) {
    var self = this;
    this.setState({
      active: index
    }, function () {
      self._enableAutoPlay();
      if (typeof self.props.onChange === 'function') {
        self.props.onChange(index);
      }
    });
  },
  _createNavs: function _createNavs() {
    var self = this;
    var ele = React.Children.map(this.props.children, function (child, i) {
      var _handleClick = function _handleClick(e) {
        self._changeTab(i);
      };
      if (self.props.onDelete) {
        var _handleDelete = function _handleDelete(e) {
          e.stopPropagation();
          if (i < self.state.active || i == self.state.active && self.state.active == self.props.children.length - 1) {
            --self.state.active;
            self.forceUpdate();
          }
          self.props.onDelete(i);
        };
      }
      return React.cloneElement(child, {
        key: i,
        onDelete: _handleDelete,
        active: i == self.state.active ? true : false,
        onClick: _handleClick
      });
    });
    var classes = classnames({
      'nav': true,
      'nav-tabs': true,
      'nav-tabs-highlight': true,
      'nav-justified': this.props.justified
    });
    var wrapperClasses = classnames({
      'nav-scrolling': this.state.scrolling
    }, 'nav-wrapper');
    return React.createElement(
      'div',
      { className: 'nav-container' },
      typeof this.props.onAdd != 'undefined' ? React.createElement(
        'span',
        { className: 'add-btn', onClick: this.props.onAdd },
        React.createElement('i', { className: 'icon-plus3' })
      ) : null,
      React.createElement(
        'div',
        { className: wrapperClasses },
        React.createElement('span', { onClick: this._prev, className: 'nav-arrow icon-arrow-left15 ' + (this.state.prevArrowDisabled ? 'disabled' : '') }),
        React.createElement('span', { onClick: this._next, className: 'nav-arrow icon-arrow-right15 ' + (this.state.nextArrowDisabled ? 'disabled' : '') }),
        React.createElement(
          'div',
          { ref: 'tabsWrapper', className: 'nav-scroll' },
          ele && ele.length ? React.createElement(
            'ul',
            { ref: 'tabsScroller', className: classes, style: { transform: 'translate(' + this.state.distance + 'px, 0)', WebkitTransform: 'translate(' + this.state.distance + 'px, 0)' } },
            ele
          ) : null
        )
      )
    );
  },
  _createContent: function _createContent() {
    var self = this;
    var ele = null;
    React.Children.forEach(this.props.children, function (child, i) {
      if (i == self.state.active) ele = child.props.children;
    });

    return React.createElement(
      'div',
      { className: 'tab-content' },
      ele
    );
  },
  render: function render() {
    var classes = classnames({
      'tabbable': true,
      'tabs-left': this.props.vertical
    });
    return React.createElement(
      'div',
      { className: classes },
      this._createNavs(),
      this._createContent()
    );
  }
});

Tabs.Tab = React.createClass({
  displayName: 'Tab',

  propTypes: {
    name: React.PropTypes.string,
    active: React.PropTypes.bool,
    onDelete: React.PropTypes.func,
    onClick: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      active: false
    };
  },
  getInitialState: function getInitialState() {
    return {};
  },
  componentWillMount: function componentWillMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  render: function render() {
    var self = this;
    var classNames = classnames({
      'active': this.props.active
    }, this.props.className);

    return React.createElement(
      'li',
      { onClick: this.props.onClick, className: classNames, style: assign({}, this.props.style) },
      React.createElement(
        'a',
        null,
        this.props.name,
        typeof this.props.onDelete != 'undefined' ? React.createElement('i', { className: 'icon-cross3', onClick: this.props.onDelete }) : null
      )
    );
  }
});

module.exports = Tabs;