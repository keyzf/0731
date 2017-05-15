var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

/**
 * 通过滑动方式选择值
 */
var Slider = React.createClass({
  propTypes: {
    /**
     * 最小值，例：0
     */
    min: React.PropTypes.number,
    /**
     * 最大值，例：100
     */
    max: React.PropTypes.number,
    /**
     * 间隔，例：1
     */
    step: React.PropTypes.number,
    /**
     * 当前值，例：50
     */
    value: React.PropTypes.number,
    /**
     * 只读，例：true
     */
    readonly: React.PropTypes.bool,

    /**
     * 值变化时回调，例：function(value) {}
     */
    onChange: React.PropTypes.func,
    /**
     * 开始拖拽时回调，例：function(value) {}
     */
    onStartDrag: React.PropTypes.func,
    /**
     * 结束拖拽时回调，例：function(value) {}
     */
    onEndDrag: React.PropTypes.func,
  },
  getDefaultProps: function () {
    return {
      min: 0,
      max: 100,
      step: 1,
      readonly: false
    }
  },
  getInitialState: function () {
    return {
      dragging: false,
      current: -1,
      currentWithStep: -1,
      min: 0,
      max: 100,
      lastX: null
    }
  },
  componentWillMount: function () {
    this._bindMouseEventOutside = function () {
      if (!document.addEventListener && document.attachEvent) {
        document.attachEvent('onmousemove', this._handleMouseMoveOutside)
        document.attachEvent('onmouseup', this._handleMouseUpOutside)
        document.attachEvent('onmousedown', this._handleMouseDownOutside)
        document.attachEvent('onmouseout', this._handleMouseOutOutside)
      } else {
        document.addEventListener('mousemove', this._handleMouseMoveOutside)
        document.addEventListener('mouseup', this._handleMouseUpOutside)
        document.addEventListener('mousedown', this._handleMouseDownOutside)
        document.addEventListener('mouseout', this._handleMouseOutOutside)
      }
    }
    this._unbindMouseEventOutside = function () {
      if (!document.removeEventListener && document.detachEvent) {
        document.detachEvent('onmousemove', this._handleMouseMoveOutside)
        document.detachEvent('onmouseup', this._handleMouseUpOutside)
        document.detachEvent('onmousedown', this._handleMouseDownOutside)
        document.detachEvent('onmouseout', this._handleMouseOutOutside)
      } else {
        document.removeEventListener('mousemove', this._handleMouseMoveOutside)
        document.removeEventListener('mouseup', this._handleMouseUpOutside)
        document.removeEventListener('mousedown', this._handleMouseDownOutside)
        document.removeEventListener('mouseout', this._handleMouseOutOutside)
      }
    }

    this._handleMouseMoveOutside = (event) => {
      if (!this.state.dragging) {
        return
      }

      if (this.state.lastX == null) {
        this.setState({
          lastX: event.clientX
        })
      } else {
        var newX = this.state.current + event.clientX - this.state.lastX
        newX = Math.min(newX, this.state.max)
        newX = Math.max(newX, this.state.min)
        this.setState({
          current: newX,
          lastX: event.clientX
        })
      }

      this._dragging()

      event.preventDefault()
    }

    this._handleMouseUpOutside = (event) => {
      this._endDrag()

      event.preventDefault()
    }

    this._handleMouseDownOutside = (event) => {
      this._endDrag()

      event.preventDefault()
    }

    this._handleMouseOutOutside = (event) => {
      // this._endDrag()

      event.preventDefault()
    }
  },
  componentDidMount: function () {
    var that = this

    this.state.max = ReactDom.findDOMNode(this.refs.slider).offsetWidth
    this._initStateValue(function () {
      var value = that._getValue()

      that._setStateValueWithStep(value)
    })
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value != this._getValue()) {
      // this.props.value = nextProps.value
      this.setState({
        current: this._setStateValueWithStep(nextProps.value)
      })
    }
  },
  componentWillUnmount: function () {},
  _startDrag: function (event) {
    event.stopPropagation()
    if(this.props.readonly){
      return
    }
    this.setState({
      dragging: true
    }, function () {
      this._bindMouseEventOutside()
      if (this.state.lastX == null) {
        /*
        this.setState({
          lastX: event.clientX
        })
        */
      }

      var value = this._getValue()
      if (typeof this.props.onStartDrag === 'function') {
        this.props.onStartDrag(value)
      }
      this._setStateValueWithStep(value)
    })
  },
  _dragging: function () {
    var value = this._getValue()
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
    this._setStateValueWithStep(value)
  },
  _endDrag: function () {
    this.setState({
      dragging: false
    }, function () {
      this._unbindMouseEventOutside()
      this.setState({
        lastX: null
      })

      var value = this._getValue()
      if (typeof this.props.onEndDrag === 'function') {
        this.props.endDrag(value)
      } else if (typeof this.props.onChange === 'function') {
        this.props.onChange(value)
      }
      this._setStateValueWithStep(value)
    })
  },
  // 用初始化value设置控件value，无步长
  _initStateValue: function (callback) {
    var percent = (parseFloat(this.props.value) - parseFloat(this.props.min)) / (parseFloat(this.props.max) - parseFloat(this.props.min))
    percent = Math.min(percent, 1)
    percent = Math.max(percent, 0)
    var value = (parseFloat(this.state.max) - parseFloat(this.state.min)) * percent + this.state.min
    this.setState({
      current: value
    }, function () {
      if (typeof callback === 'function') {
        callback()
      }
    })
  },
  // 根据控件value取实际value
  _getValue: function () {
    var percent = (parseFloat(this.state.current) - parseFloat(this.state.min)) / (parseFloat(this.state.max) - parseFloat(this.state.min))
    percent = Math.min(percent, 1)
    percent = Math.max(percent, 0)
    var value = (parseFloat(this.props.max) - parseFloat(this.props.min)) * percent + this.props.min
    // value取step模
    if (this.props.step != null) {
      var floorValue = parseInt(value / this.props.step) * this.props.step
      value = (value - floorValue) < (this.props.step / 2) ? floorValue : (floorValue + this.props.step)
    }
    return value
  },
  // 用实际value设置控件value，有步长
  _setStateValueWithStep: function (value) {
    var percent = (value - parseFloat(this.props.min)) / (parseFloat(this.props.max) - parseFloat(this.props.min))
    percent = Math.min(percent, 1)
    percent = Math.max(percent, 0)
    value = (parseFloat(this.state.max) - parseFloat(this.state.min)) * percent + this.state.min
    this.setState({
      currentWithStep: value
    })
    return value
  },
  _mouseHover: function () {
    this.setState({hover: true})
  },
  _mouseOut: function () {
    this.setState({hover: false})
  },
  componentDidUpdate: function () {
    this.state.max = ReactDom.findDOMNode(this.refs.slider).offsetWidth
  },
  render: function () {
    var left = 0
    if (!isNaN(this.state.currentWithStep) && this.state.currentWithStep >= 0) {
      left = this.state.currentWithStep
    }
    return (
      <div ref='slider' className={classnames({}, this.props.className, 'ui-slider-range-min ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all')} style={assign({}, this.props.style)}>
        <div className='ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min' style={{width: left}} />
        <div
          className={'ui-slider-handle ui-state-default ui-corner-all' + (this.state.hover ? ' ui-state-hover' : '')}
          onMouseDown={this._startDrag}
          onMouseOver={this._mouseHover}
          onMouseOut={this._mouseOut}
          style={{left: left}} />
      </div>
    )
  }
})

module.exports = Slider
