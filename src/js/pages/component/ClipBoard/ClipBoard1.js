var React = require('react')

var ClipBoard = require('radmin').ClipBoard

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <label className='control-label'>
            网址链接：
        </label>
        <ClipBoard text={'http://www.qq.com'}>
          <input
            type='text'
            className='form-control'
            readOnly={true}
            style={{ paddingRight: 80 }}
            value={'http://www.qq.com'} />
          <div style={{ position: 'absolute', right: 10, top: 34, color: '#4781ec' }}>
            复制链接
          </div>
        </ClipBoard>
      </div>
    )
  }
})
