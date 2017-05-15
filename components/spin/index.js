var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Utils = require('../utils');

/**
 * 等待接口返回时使用，并可遮挡界面以屏蔽重复操作
 */
var Spin = React.createClass({
  propTypes: {
    /**
     * 名称
     */
    statusType: React.PropTypes.any,
  },
  getInitialState: function () {
    return {
      active: false
    }
  },
  interval: null,
  componentDidMount: function () {
    var self = this;
    if (this.props.statusType) {
      this.interval = window.setInterval(function () {
        var status = Utils.AjaxUtil.getStatus(self.props.statusType);
        if (status == 1) {
          self.setState({
            active: true
          })
        } else {
          self.setState({
            active: false
          })
        }
      }, 50)
    }
  },
  componentWillUnmount: function () {
    window.clearInterval(this.interval)
  },
  render: function () {
    return (
      <div className={classnames({spin: true}, this.props.className)} style={assign({}, this.props.style)}>
        {this.props.children}
        {this.state.active ?
           <div className='overlay'>
             <i className='icon-spinner4 spinner'></i>
           </div> : null}
      </div>
    )
  }
});

module.exports = Spin;
