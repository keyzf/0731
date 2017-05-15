var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var CalendarPosition = React.createClass({
  getInitialState: function () {
    return {}
  },
  componentWillMount: function () {
    this._onWindowScroll()
  },
  componentDidMount: function () {
    window.addEventListener('scroll', this._onWindowScroll)
  },
  componentWillUnmount: function () {
    window.removeEventListener('scroll', this._onWindowScroll)
  },
  _onWindowScroll: function() {
    if (this.props.calendarInputRef && this.state) {
      var boundingClientRect = ReactDom.findDOMNode(this.props.calendarInputRef).getBoundingClientRect()
      this.state.top = boundingClientRect.top
      this.state.left = boundingClientRect.left
      this.state.width = boundingClientRect.width
      this.state.height = boundingClientRect.height

      var screenWidth = document.documentElement.clientWidth
      var screenHeight = document.documentElement.clientHeight
      
      if (boundingClientRect.top > 0 && boundingClientRect.top < screenHeight && boundingClientRect.left > 0 && boundingClientRect.left < screenWidth) {
        this._restrict()
      } else if ((boundingClientRect.top + boundingClientRect.height) > 0 && (boundingClientRect.top + boundingClientRect.height) < screenHeight && (boundingClientRect.left + boundingClientRect.width) > 0 && (boundingClientRect.left + boundingClientRect.width) < screenWidth) {
        this._restrict()
      }
      this.forceUpdate()
    }
  },
  _restrict: function() {
    var left = this.state.left
    var top = this.state.top
    var width = this.props.calendarWidth
    var height = this.props.calendarHeight + (this.props.showTime ? this.props.showTimeHeight : 0) + (this.props.fixedHour ? -28 : 0) + (this.props.fixedMinute ? -28 : 0) + (this.props.fixedSecond ? -28 : 0)

    var screenWidth = document.documentElement.clientWidth
    var screenHeight = document.documentElement.clientHeight

    // 屏幕到边约束
    left + width > screenWidth ? left = screenWidth - width : null
    top + height > screenHeight ? top = screenHeight - height : null

    this.state.left = left
    this.state.top = top
  },
  componentWillReceiveProps: function (nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      this.props = nextProps
    }
  },
  render: function() {
    var that = this
    var position = this.state && typeof this.state.top != 'undefined' && this.state.top != null ? {top: this.state.top + this.state.height, left: this.state.left + this.props.left} : null
    return (
      <div className={classnames({radio: true}, this.props.className)} style={assign({display: 'inline-block'}, this.props.style, position)}>
        {this.props.children}
      </div>
    )
  }
})

module.exports = CalendarPosition;
