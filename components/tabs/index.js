var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

/**
 * 用于切换不同显示内容
 */
var Tabs = React.createClass({
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
  getDefaultProps() {
    return {
      active: 0,
      vertical: false
    }
  },
  getInitialState: function () {
    return {
      scrolling: false,
      active: this.props.active,
      distance: 0,
      prevArrowDisabled: true,
      nextArrowDisabled: true
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (!deepEqual(this.state.data, nextProps)) {
      if (deepEqual(this.props.children == nextProps.children)) {
        this.setState({
          active: nextProps.active || 0
        })
      }else {
        if (this.props.children.length > nextProps.children.length) {
          this.state.invokeDelete = true
        }else if (this.props.children.length < nextProps.children.length) {
          this.state.invokeAdd = true
        }
      }
    }
  },
  componentDidMount() {
    this._updateArrowStatus()
    this._enableAutoPlay()
  },
  componentWillUnmount() {
    this._removeAutoPlay()
  },
  componentDidUpdate(prevProps, prevState) {
    this._updateArrowStatus()
    this._updateTabs()
  },
  _enableAutoPlay() {
    var self = this
    if (this.props.autoplay) {
      this._removeAutoPlay()
      this._player = window.setInterval(function () {
        self.state.active = (self.state.active + 1) % self.props.children.length
        self.forceUpdate()
        if (typeof self.props.onChange === 'function') {
          self.props.onChange(self.state.active)
        }
      }, this.props.autoplay)
    }
  },
  _removeAutoPlay() {
    var self = this
    if (this._player) {
      window.clearInterval(this._player)
    }
  },
  _updateTabs() {
    if (this.props.vertical ||
      !this.props.children.length
    ) {
      return
    }
    if (this.state.invokeAdd) {
      this.setState({
        active: this.props.children.length - 1
      })
    }
    if (this.state.invokeAdd ||
      this.state.invokeDelete &&
      this.refs.tabsScroller.scrollWidth - this.refs.tabsScroller.children[this.state.active].offsetLeft <= this.refs.tabsWrapper.offsetWidth
    ) {
      this.state.distance = this.refs.tabsWrapper.offsetWidth - this.refs.tabsScroller.scrollWidth
      this.forceUpdate()
    }
    this.state.invokeAdd = false
    this.state.invokeDelete = false
  },
  _updateArrowStatus() {
    if (!this.props.children.length) {
      return
    }
    var self = this,
      scrolling,
      prevArrowDisabled,
      nextArrowDisabled

    if (this.refs.tabsScroller.scrollWidth > this.refs.tabsWrapper.offsetWidth) {
      scrolling = true
    }else {
      scrolling = false
      this.state.distance = 0
    }

    var firstShowArrow = this.state.scrolling != scrolling && scrolling

    // left arrow
    prevArrowDisabled = this.state.distance == 0
    // right arrow
    nextArrowDisabled = this.refs.tabsWrapper.offsetWidth - this.state.distance == this.refs.tabsScroller.scrollWidth

    if (this.state.scrolling != scrolling ||
      this.state.prevArrowDisabled != prevArrowDisabled ||
      this.state.nextArrowDisabled != nextArrowDisabled
    ) {
      this.setState({
        scrolling: scrolling,
        prevArrowDisabled: prevArrowDisabled,
        nextArrowDisabled: nextArrowDisabled
      }, function () {
        if (firstShowArrow) {
          self.setState({
            distance: this.refs.tabsWrapper.offsetWidth - this.refs.tabsScroller.scrollWidth
          })
        }
      })
    }
  },
  _prev() {
    if (this.state.prevArrowDisabled) {
      return
    }
    var distance = this.state.distance + this.refs.tabsWrapper.offsetWidth > 0 ? -this.state.distance : this.refs.tabsWrapper.offsetWidth
    this.state.distance += distance
    this.forceUpdate()
  },
  _next() {
    if (this.state.nextArrowDisabled) {
      return
    }
    var distance = this.refs.tabsScroller.scrollWidth + this.state.distance - this.refs.tabsWrapper.offsetWidth
    if (distance > this.refs.tabsWrapper.offsetWidth) {
      distance = this.refs.tabsWrapper.offsetWidth
    }
    this.state.distance -= distance
    this.forceUpdate()
  },
  _changeTab: function (index) {
    var self = this
    this.setState({
      active: index
    }, function () {
      self._enableAutoPlay()
      if (typeof self.props.onChange === 'function') {
        self.props.onChange(index)
      }
    })
  },
  _createNavs: function () {
    var self = this
    var ele = React.Children.map(this.props.children, function (child, i) {
      var _handleClick = function (e) {
        self._changeTab(i)
      }
      if (self.props.onDelete) {
        var _handleDelete = function (e) {
          e.stopPropagation()
          if (i < self.state.active ||
            i == self.state.active && self.state.active == self.props.children.length - 1
          ) {
            --self.state.active
            self.forceUpdate()
          }
          self.props.onDelete(i)
        }
      }
      return React.cloneElement(child, {
        key: i,
        onDelete: _handleDelete,
        active: (i == self.state.active) ? true : false,
        onClick: _handleClick
      })
    })
    var classes = classnames({
      'nav': true,
      'nav-tabs': true,
      'nav-tabs-highlight': true,
      'nav-justified': this.props.justified
    })
    var wrapperClasses = classnames({
      'nav-scrolling': this.state.scrolling
    }, 'nav-wrapper')
    return (
      <div className='nav-container'>
        {typeof this.props.onAdd != 'undefined' ?
           <span className='add-btn' onClick={this.props.onAdd}><i className='icon-plus3'></i></span>
           :
           null}
        <div className={wrapperClasses}>
          <span onClick={this._prev} className={`nav-arrow icon-arrow-left15 ${this.state.prevArrowDisabled ? 'disabled' : ''}`}></span>
          <span onClick={this._next} className={`nav-arrow icon-arrow-right15 ${this.state.nextArrowDisabled ? 'disabled' : ''}`}></span>
          <div ref='tabsWrapper' className='nav-scroll'>
            {ele && ele.length ?
               <ul ref='tabsScroller' className={classes} style={{transform: `translate(${this.state.distance}px, 0)`, WebkitTransform: `translate(${this.state.distance}px, 0)`}}>
                 {ele}
               </ul>
               :
               null}
          </div>
        </div>
      </div>
    )
  },
  _createContent: function () {
    var self = this
    var ele = null
    React.Children.forEach(this.props.children, function (child, i) {
      if (i == self.state.active)
        ele = child.props.children
    })

    return (
      <div className='tab-content'>
        {ele}
      </div>
    )
  },
  render: function () {
    var classes = classnames({
      'tabbable': true,
      'tabs-left': this.props.vertical
    })
    return (<div className={classes}>
              {this._createNavs()}
              {this._createContent()}
            </div>
    )
  }
})

Tabs.Tab = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    active: React.PropTypes.bool,
    onDelete: React.PropTypes.func,
    onClick: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      active: false
    }
  },
  getInitialState: function () {
    return {}
  },
  componentWillMount: function () {},
  componentWillUnmount: function () {},
  render: function () {
    var self = this
    var classNames = classnames({
      'active': this.props.active
    }, this.props.className)

    return (
      <li onClick={this.props.onClick} className={classNames} style={assign({}, this.props.style)}>
        <a>
          {this.props.name}
          {typeof this.props.onDelete != 'undefined' ?
             <i className='icon-cross3' onClick={this.props.onDelete}></i>
             :
             null}
        </a>
      </li>
    )
  }
})

module.exports = Tabs
