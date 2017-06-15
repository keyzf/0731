/**
 * Created by zeezhang on 2017/1/10.
 */
var React = require('react');
var svgSources = require('./svg');
var Assign = require('object-assign');


module.exports = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
        delay: React.PropTypes.number,
        height: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        type: React.PropTypes.string,
        width: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    },

    getInitialState:function(){
	    return {
            delayed: false
        }
    },

    getDefaultProps: function() {
        return {
            style:{},
	        delay: 1000,
	        type: 'balls',

        };
    },

    componentWillMount:function(){
        var  delayed = this.props.delay > 0;

        if (delayed) {
            this.setState({delayed: true});
            this._timeout = setTimeout(() => {
                this.setState({delayed: false});
            }, this.props.delay);
        }
    },

    componentDidMount:function(){

    },

    componentWillUnMount:function(){
        this._timeout && clearTimeout(this._timeout);
    },

    render:function(){
        var type = this.state.delayed ? 'blank' : this.props.type;
        var svg = svgSources[type];
	    var style = Assign({fill: '#44b549', height: 40, width: 40},this.props.style);

        return (
            <div
	            className='loading-icon-container'
                style={style}
                dangerouslySetInnerHTML={{__html:svg}}
                />
        );
    }
});