var React = require('react')

var Form = require('radmin').Form

module.exports = React.createClass({
  getInitialState: function () {
    return {
      info: {
        name: ''
      }
    }
  },
  render: function () {
    return (
      <div>
        <div>
          <input
            type='text'
            placeholder='请输入姓名'
            value={this.state.info.name ? this.state.info.name : ''}
            onChange={Form.Util.linkState(this, 'info.name')}
            className='form-control' />
        </div>
        <div>
          {this.state.info.name}
        </div>
      </div>
    )
  }
})
