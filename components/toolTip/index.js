var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var getposition = require('./getposition')

/**
 * 气泡提示信息
 */
var Tooltip = React.createClass({
  propTypes: {
    /**
     * 标题，例：'提示'
     */
    title: React.PropTypes.any,

    /**
     * 弹出方向，例：'left'
     */
    direction: React.PropTypes.any,
  },
  getDefaultProps: function () {
    return {
      direction: 'right',
    }
  },
  getInitialState: function () {
    return {
      show: false,
      direction: this.props.direction,
      position: {}
    }
  },

  _onMouseLeave: function () {
    this.setState({
      show: false
    })
  },
  componentDidMount: function () {},
  _onMouseEnter: function (e) {
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
    result = getposition(null, self.refs.tip, self.refs.tooltip, direction, 'solid', offset)
    if (result.isNewState) {
      // Switch to reverse placement
      return self._updatePosition(result.newState.place)
    }
    self.setState({
      direction: direction,
      position: result.position
    })
  },
  _renderInfo: function () {
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
        <div className={className} style={style} ref='tooltip'>
          <div className='arrow'></div>
          {this.props.title ? <h3 className='popover-title'>{this.props.title}</h3> : null}
          <div className='popover-content'>
            {this.props.children}
          </div>
        </div>
      )
    }
    else return null
  },
  render: function () {
    return (
      <div
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        className={classnames({'tooltip-con': true}, this.props.className)}
        style={assign({}, this.props.style)}>
        <i className='icon-question4' ref='tip' style={this.props.color ? { color: this.props.color } : null}></i>
        {this._renderInfo()}
      </div>
    )
  }
})

module.exports = Tooltip
