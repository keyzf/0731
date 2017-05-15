var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var getposition = require('./getposition')

/**
 * 气泡提示信息
 */
var Popover = React.createClass({
  propTypes: {
    /**
     * 是否显示，例：true
     */
    show: React.PropTypes.bool,
    /**
     * 弹出方向，例：'left'
     */
    direction: React.PropTypes.any,
    /**
     * 标题，例：'自定义跟随弹层'
     */
    title: React.PropTypes.any,
    /**
     * 内容，例: (<div></div>)
     */
    content: React.PropTypes.any,
  },
  getDefaultProps: function () {
    return {
      direction: 'right'
    }
  },
  getInitialState: function () {
    return {
      show: false,
      direction: this.props.direction,
      position: {}
    }
  },
  componentDidMount() {
    window.addEventListener('click', this._onWindowClick)
    window.addEventListener('scroll', this._onWindowScroll)
  },
  componentWillUnmount() {
    window.removeEventListener('click', this._onWindowClick)
    window.addEventListener('scroll', this._onWindowScroll)
  },
  _onWindowClick(event) {
    var popover = ReactDom.findDOMNode(this)
    if (event.target !== popover && !popover.contains(event.target) && this.state.show) {
      this.setState({
        show: false
      })
    }
  },
  _onWindowScroll() {
    var self = this
    if (self.refs.popover) {
      self._updatePosition()
    }
  },
  _show: function (e) {
    var self = this
    this.setState({
      show: true
    }, function () {
      self._updatePosition()
    })
  },
  _updatePosition: function (direction) {
    var self = this
    var offset = {}, result
    direction = direction || this.props.direction
    direction == 'right' ? offset.right = 5 : null
    direction == 'left' ? offset.left = 5 : null
    direction == 'top' ? offset.top = 5 : null
    direction == 'bottom' ? offset.bottom = 5 : null
    result = getposition(null, self.refs.target, self.refs.popover, direction, 'solid', offset)
    if (result.isNewState) {
      // Switch to reverse placement
      return self._updatePosition(result.newState.place)
    }
    self.setState({
      direction: direction,
      position: result.position
    })
  },
  hide: function () {
    this.setState({
      show: false
    })
  },
  _renderContent: function () {
    if (this.state.show) {
      var style = {}
      if (this.state.position) {
        style.left = this.state.position.left
        style.top = this.state.position.top
      }
      var className = classnames({
        popover: true,
        left: this.state.direction == 'left' ? true : false,
        right: this.state.direction == 'right' ? true : false,
        top: this.state.direction == 'top' ? true : false,
        bottom: this.state.direction == 'bottom' ? true : false
      })
      return (
        <div className={className} style={style} ref='popover'>
          <div className='arrow'></div>
          {this.props.title ? <h3 className='popover-title'>{this.props.title}</h3> : null}
          <div className='popover-content'>
            {this.props.content}
          </div>
        </div>
      )
    }
    else return null
  },
  render: function () {
    var self = this
    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        ref: 'target',
        onClick: function () {
          self._show()
        }
      })
    })

    return (
      <div className={classnames({'tooltip-con': true}, this.props.className)} style={assign({}, this.props.style)}>
        {children}
        {this._renderContent()}
      </div>
    )
  }
})

module.exports = Popover
