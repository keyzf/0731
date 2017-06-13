var React = require('react')
var Highlight = require('react-highlight')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='code-example'>
        <Highlight className='language-jsx'>
          {this.props.children}
        </Highlight>
      </div>
    )
  }
})
