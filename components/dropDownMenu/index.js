var React = require('react');
var Utils = require('../utils');

module.exports = React.createClass({
    propTypes: {
        /**
         * title自定义
         */
        renderTitle: React.PropTypes.func,
        /**
         * 菜单自定义
         */
        renderMenu: React.PropTypes.func,
    },
    getInitialState: function () {
        return {

        };
    },

    getDefaultProps: function () {
        return {
            title:'',
            className:'',
            menuData:[],
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

    _renderMenuItem:function(){
        var self = this;
        return this.props.menuData.map(function(item,index){
            if(typeof self.props.renderMenu == 'function'){
                return self.props.renderMenu(item,index,Utils.CommonUtil.getRandomId());
            }else{
                return (
                    <li className={item.className} onClick={item.onClick} key={Utils.CommonUtil.getRandomId()}>
                        <a href={item.url?item.url:'javascript:;'} target='_self'>{item.text}</a>
                    </li>
                )
            }
        });
    },

    render: function () {
        return (
            <div className={"drop-down " + this.props.className}>
                <a href='javascript:;' className='drop-down-toggle'>
                    {typeof this.props.renderTitle == 'function'?this.props.renderTitle(this.props.title):<span className='drop-down-text'>{this.props.title}</span>}
                </a>
                <div className='drop-down-menu'>
                    <ul className='menu-ul'>
                        {this._renderMenuItem()}
                    </ul>
                </div>
            </div>
        )
    }
});