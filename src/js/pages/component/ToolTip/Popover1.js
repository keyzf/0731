var React = require('react')

var Popover = require('radmin').Popover
var FormUtil = require('radmin').Form.Util

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '',
      open: false
    }
  },
  _handleClick: function () {
    alert('您输入的是：' + this.state.text)
    this.refs.popover.hide()
  },
  render: function () {
    return (
      <Popover
        show={this.state.open}
        direction='bottom'
        title='自定义跟随弹层'
        ref='popover'
        content={(
          <div>
            <input
              type="text"
              className="form-control"
              value={this.state.text}
              onChange={FormUtil.linkState(this, 'text')} />
            <a className="btn btn-default pull-right" style={{marginTop: 10, marginBottom: 10}} onClick={this._handleClick}>确认</a>
          </div>
        )}
        style={{width: 300}}>
        <div className='btn btn-primary'>
          弹出跟随弹层
        </div>
      </Popover>
    )
  }
})
