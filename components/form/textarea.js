/**
 * Created by zeezhang on 2016/12/9.
 */
var React = require('react');
var clone = require('clone');

var Utils = require('../utils');

module.exports = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
    },
    getInitialState:function(){
        return {
            counterStr:'',
            value:'',
        }
    },

    getDefaultProps: function() {
        return {
            maxLength:0,
            placeholder:null,
            value:'',
            valuePath:'',
        };
    },

    _onChange:function(e){
        var value = e.target.value,
            len = value.length,
            counterStr = '';
        if(this.props.maxLength > 0){
            if(len <= this.props.maxLength){
                counterStr = len + '/' + this.props.maxLength;
                typeof this.props.onChange == 'function'&&this.props.onChange(value,this.props.valuePath,e);
                this.setState({
                    counterStr:counterStr,
                    value:value,
                });
            }else{

            }
        }else{
            typeof this.props.onChange == 'function'&&this.props.onChange(value,this.props.valuePath,e);
            this.setState({
                value:value,
            });
        }
    },

    componentWillMount: function() {
        this.state.counterStr = this.props.value.length + '/' + this.props.maxLength;
        this.state.value = this.props.value;
    },

    componentWillReceiveProps:function(nextProps){
        this.state.counterStr = (nextProps.value + '').length + '/' + nextProps.maxLength;
        this.state.value = nextProps.value;
    },

    render:function(){
        return (
            <div className='form-textarea-content'>
                <textarea
                    className='form-textarea form-control'
                    value={this.state.value}
                    onChange={this._onChange}
                    name={this.props.valuePath}
                    maxLength={this.props.maxLength?this.props.maxLength:null}
                    placeholder={this.props.placeholder?this.props.placeholder:null}
                    style={this.props.style}
                    />

                {this.props.maxLength?(<div className='textarea-counter'>
                    {this.state.counterStr}
                </div>):null}
            </div>
        )
    }
});