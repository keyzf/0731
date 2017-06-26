var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Util = require('./util');

var Field = React.createClass({
  propTypes: {
    label: React.PropTypes.any, //  填写字段中文标签
    desc: React.PropTypes.string //  填写内容描述
  },
  contextTypes : {
    form_id: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      validate: false,
      info: null
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (!deepEqual(this.props, nextProps)) {
      if (this.state.validate) {
        this.props = nextProps
        this.doValidate()
      }
    }
  },
  componentDidMount: function () {
    Util.EventEmitter.dispatch('addField', {uuid: this.context.form_id, field: this})
  },
  componentWillUnmount: function () { 
    Util.EventEmitter.dispatch('removeField', {uuid: this.context.form_id, field: this}) 
  },
  doValidate: function(nextProps){
    var info = Util.validate(this.props.validation);
    if(info){
      this.setState({
        validate: true,
        info: info
      })
      return false
    } else{
      this.setState({
        info: null
      });
      return true
    }
  },
  _calcCol: function (col, type) {
    if (this.props.vertical) return 'col-xs-12';
    if (col) {
      return 'col-xs-' + col
    } else {
      return type == 'label' ? 'col-xs-2' : 'col-xs-10'
    }
  },
  render: function () {
    var info = this.state.info ? (<span className='help-block'>{this.state.info}</span>) : null;
    var label = this.props.label ? (<label className={'control-label text-semibold text-' + (this.props.align == 'right' ? 'right' : 'left') + ' ' + this._calcCol(this.props.labelCol, 'label')} style={{width:this.props.labelWidth || ''}}>
                                      {this.props.label}
                                    </label>) : null;
    var desc = this.props.desc ? (<span className='help-block'>{this.props.desc}</span>) : null;
    var content = (
    <div className={this._calcCol(this.props.contentCol, 'content')}>
      {this.props.children}
      {info ? info : desc}
    </div>
    );
    return (
      <div className={classnames({'form-group': true, 'clearfix': true, 'has-error': info ? true : false}, this.props.className)} style={assign({}, this.props.style)}>
        {label}
        {content}
      </div>
    )
  }
});

module.exports = Field;
