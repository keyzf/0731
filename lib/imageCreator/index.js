'use strict';

/**
 * 图片生成
 * zee 2017-03-28
 * */
var React = require('react');

module.exports = React.createClass({
    displayName: 'exports',

    getInitialState: function getInitialState() {
        return {};
    },

    getDefaultProps: function getDefaultProps() {
        return {
            id: '',
            url: '',
            name: '',
            hashColor: '',
            className: '',
            urlPrefix: true,
            hasDelIcon: false, //zee
            imgStyle: {},
            picLevel: 'm', //l 大图 , m 中图 , s 小图 ss 超小图
            picLevelConf: {
                l: {
                    width: '60px',
                    height: '60px',
                    fontSize: '45px'
                },
                m: {
                    width: '40px',
                    height: '40px',
                    fontSize: '30px'
                },
                s: {
                    width: '30px',
                    height: '30px',
                    fontSize: '18px'
                },
                ss: {
                    width: '16px',
                    height: '16px',
                    fontSize: '12px'
                }
            },
            opacity: 0.3,
            isOnLine: true
        };
    },

    componentWillMount: function componentWillMount() {},

    componentDidMount: function componentDidMount() {},

    componentWillUnmount: function componentWillUnmount() {},

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
    _staticColors: {
        color0: '#b9cdef',
        color1: '#9ac6c7',
        color2: '#cae4e3',
        color3: '#b8dbc5',
        color4: '#8bc93a',
        color5: '#f1bcb8',
        color6: '#ffb400'
    },

    _randomRGB: function _randomRGB() {
        var hashRoot = this.props.hashColor,
            hashTotal = 0,
            aHex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'],
            colorIndex = 0,
            rgb = '#';

        if (hashRoot == null || hashRoot.length == 0) {
            for (var i = 0; i < 6; i++) {
                colorIndex = Math.floor(Math.random() * 16);
                rgb += aHex[colorIndex];
            }
        } else {
            hashRoot = hashRoot + '';
            for (var j = 0, len = hashRoot.length; j < len; j++) {
                hashTotal = hashTotal + hashRoot.charCodeAt(j);
            }
            hashTotal = hashTotal % this._staticColors.length;
            rgb = this._staticColors['color' + hashTotal];
        }
        return rgb;
    },

    _renderPic: function _renderPic() {
        var picConf = this.props.picLevelConf[this.props.picLevel],
            style = Object.assign({
            width: picConf.width,
            height: picConf.height,
            lineHeight: picConf.height,
            fontSize: picConf.fontSize
        }, this.props.imgStyle);

        if (this.props.url && this.props.url.length > 0) {
            return React.createElement(
                'span',
                {
                    className: 'image-container'
                },
                React.createElement('img', {
                    src: this.props.url,
                    style: style
                })
            );
        } else if (this.props.name) {
            style.backgroundColor = this.props.color || this._randomRGB();
            return React.createElement(
                'span',
                {
                    className: 'image-container',
                    style: style,
                    title: this.props.name
                },
                this.props.name.charAt('0').toUpperCase()
            );
        } else {
            return null;
        }
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'image-creator ' + this.props.className },
            this._renderPic()
        );
    }
});