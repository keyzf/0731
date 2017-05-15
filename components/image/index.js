var React = require('react')
var ReactDom = require('react-dom')
var assign = require('object-assign')
var classnames = require('classnames')
var deepEqual = require('deep-equal')

var Image = React.createClass({
  getDefaultProps: function () {
    return {
      url: '',
      errorSrc: 'http://radmin.qq.com/static/img/head.png',
      noborder: false
    }
  },
  getInitialState: function () {
    return {
      url: this.props.url
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.url != nextProps.url) {
      this.props = nextProps

      this.state.url = this.props.url
    }
  },
  _handleError: function () {
    this.state.url = this.props.errorSrc
    this.forceUpdate()
  },
  render: function () {
    return (
      <div className={classnames({image: 'true', 'noborder': this.props.noborder}, this.props.className)} style={assign({}, this.props.style)}>
        <img src={this.state.url} onError={this._handleError} style={{width: '100%', height: '100%'}} />
      </div>
    )
  }
})

module.exports = Image
