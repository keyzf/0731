var React = require('react');

var FileInput = React.createClass({
  getInitialState: function () {
    return {
      name: this.props.name
    }
  },
  _onClick: function (e) {
    e && e.preventDefault();
    this.refs['file-input'].click();
  },
  _onChange: function (e) {
    if (e.target.files.length) {
      this.setState({
        name: e.target.files[0].name
      });
      this.props.onChange && this.props.onChange(e);
    }
  },
  render: function () {
    return (
      <div className='file-input clearfix'>
        <div className='uploader bg-warning'>
          <span className='filename'>{this.state.name ? this.state.name : '上传文件'}</span>
          <span className='action' onClick={this._onClick}><i className='icon-googleplus5'></i></span>
        </div>
        <input
          type='file'
          ref='file-input'
          onChange={this._onChange}
          style={{ display: 'none' }} />
      </div>
    )
  }
});

module.exports = FileInput;
