var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

/**
 * 浮动提示，3秒后消失
 */
var Prompt = React.createClass({
  propTypes: {
    /**
     * 提示内容，例：'成功'
     */
    text: React.PropTypes.any
  },
  getDefaultProps: function () {
    return {
      text: '',
      onClose: null
    }
  },
  componentDidMount: function () {
    var that = this;
    window.setTimeout(function () {
      if (typeof that.props.onClose === 'function') {
        that.props.onClose();
      }
    }, 3000);
  },
  componentWillUnmount: function () {},
  render: function () {
    return (
      <div className={classnames({prompt: true}, this.props.className)} style={assign({}, this.props.style)}>
        <div className='prompt-text'>
          {this.props.text}
        </div>
      </div>
    )
  }
});

module.exports = Prompt;
