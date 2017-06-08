/**
 * 图片生成
 * zee 2017-03-28
 * */
var React = require('react');


module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },

    getDefaultProps: function () {
        return {
            id : '',
            url : '',
            name : '',
            hashColor : '',
            className : '',
            urlPrefix : true,
            hasDelIcon : false,//zee
            picStyle:{},
            picLevel : 'm',			//l 大图 , m 中图 , s 小图 ss 超小图
            picLevelConf : {
                l : {
                    width : '60px',
                    height : '60px',
                    fontSize : '45px'
                },
                m : {
                    width : '40px',
                    height : '40px',
                    fontSize : '30px'
                },
                s : {
                    width : '30px',
                    height : '30px',
                    fontSize : '18px'
                },
                ss : {
                    width : '16px',
                    height : '16px',
                    fontSize : '12px'
                }
            },
            opacity : 0.3,
            isOnLine : true
        };
    },

    componentWillMount: function () {

    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    componentWillReceiveProps: function (nextProps) {

    },
    _staticColors : {
        color0 : '#ffb400',
        color1 : '#5091f9',
        color2 : '#eb5945',
        color3 : '#8bc93a',
        color4 : '#3ac9c7',
        color5 : '#a6a6a6',
        color6 : '#b9cdef'
    },

    _randomRGB : function (){
        var	hashRoot = this.props.hashColor,
            hashTotal = 0,
            aHex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'],
            colorIndex = 0,
            rgb = '#';

        if( hashRoot==null || hashRoot.length==0 ) {
            for( var i = 0; i < 6; i++){
                colorIndex = Math.floor( Math.random()*16 );
                rgb += aHex[ colorIndex ];
            }
        }else{
            hashRoot = hashRoot + '';
            for( var j=0,len=hashRoot.length ; j<len ; j++ ) {
                hashTotal = hashTotal + hashRoot.charCodeAt( j );
            }
            hashTotal = hashTotal%this._staticColors.length;
            rgb = this._staticColors[ 'color'+hashTotal ];
        }
        return rgb;
    },

    _renderPic:function(){
        var	picConf = this.props.picLevelConf[this.props.picLevel],
            style = Object.assign({
                width:picConf.width,
                height:picConf.height,
                lineHeight:picConf.height,
                fontSize:picConf.fontSize,
            },this.props.picStyle);

        if( this.props.url && this.props.url.length>0 ) {
            return (
                <span
                    className='image-container'
                    >
                    <img
                        src={this.props.url}
                        style={style}
                        />
                </span>
            )
        }else if( this.props.name ){
            style.backgroundColor = this.props.color || this._randomRGB();
            return (
                <span
                    className='image-container'
                    style={style}
                    title={this.props.name}
                    >{this.props.name.charAt('0').toUpperCase()}</span>
            )
        }else{
            return null
        }
    },

    render: function () {
        return (
            <div className={'image-creator '+this.props.className}>
                {this._renderPic()}
            </div>
        )
    }
});