var React = require('react')

var VerificationCode = require('radmin/extensions/verificationCode')

module.exports = React.createClass({
  _onChange: function(obj) {
    console.info(obj)
  },
  render: function () {
    return (
      <div>
        <VerificationCode urlOptions={{aid: 4007203, clientype: 2, apptype: 1}} style={{width: 300}} type='point' onChange={this._onChange}/>
      </div>
    )
  }
})
