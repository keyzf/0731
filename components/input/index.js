/**
 * Created by zeezhang on 2016/12/9.
 */
var React = require('react');
var clone = require('clone');

var Utils = require('../utils');
var FormUtil = require('../form/util');

module.exports = React.createClass({
    propTypes: {
        /**
         * 对输入进行过滤
         * */
        inputFilter: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onKeyUp: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onFocus: React.PropTypes.func,
    },
    getInitialState:function(){
        return {
            value:'',
        }
    },

    getDefaultProps: function() {
        return {
            maxLength:0,
            type:'text',
            className:'',
            placeholder:null,
            value:'',
            valuePrefix:'',//输入的值固定的前缀
            valuePath:'',
            readOnly:false,
            valueType:'',
            valueReg:'',
        };
    },

    _onChange:function(e){
        var value = this._inputFilter(e),
            valuePrefixLen = this.props.valuePrefix.length;

        if(valuePrefixLen){
            if(value.substr(0,valuePrefixLen) != this.props.valuePrefix){
                this.setState({
                    value:this.state.value,
                });
                return;
            }
        }

        if(value){
            if(this.props.valueType){
                if(!FormUtil.validateValue(this.props.valueType,value)){
                    value = this.state.value;
                }
            }
            if(this.props.valueReg){
                if(!this.props.valueReg.test(value)){
                    value = this.state.value;
                }
            }
        }


        typeof this.props.onChange == 'function'&&this.props.onChange(value,this.props.valuePath,e);
        this.setState({
                value:value,
        });
    },

    _onBlur:function(e){
        typeof this.props.onBlur == 'function'&&this.props.onBlur(this.state.value,this.props.valuePath,e);
    },
    _onFocus:function(e){
        typeof this.props.onFocus == 'function'&&this.props.onFocus(this.state.value,this.props.valuePath,e);
    },

    _inputFilter:function(e){
        var value = e.target.value;
        if(typeof this.props.inputFilter == 'function'){
            return this.props.inputFilter(value,e);
        }else{
            return value;
        }
    },

    _onKeyDown:function(e){
        typeof this.props.onKeyDown == 'function'&&this.props.onKeyDown(e);
    },

    _onKeyUp:function(e){
        typeof this.props.onKeyUp == 'function'&&this.props.onKeyUp(e);
    },

    componentWillMount: function() {
        this.state.value = this.props.value;
    },

    componentWillReceiveProps:function(nextProps){
        if(this.state.value != nextProps.value){
            this.state.value = nextProps.value;
        }
    },

    render:function(){
        return (
            <input
                type={this.props.type}
                className={' '+ this.props.className}
                value={this.state.value}
                onChange={this._onChange}
                onBlur={this._onBlur}
                onFocus={this._onFocus}
                onKeyUp={this._onKeyUp}
                onKeyDown={this._onKeyDown}
                name={this.props.valuePath}
                maxLength={this.props.maxLength?this.props.maxLength:null}
                placeholder={this.props.placeholder?this.props.placeholder:null}
                readOnly={this.props.readOnly?'readonly':null}
                />
        )
    }
});