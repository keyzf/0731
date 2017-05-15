var React = require('react');
var Utils = require('../utils');
var classnames = require('classnames');

var Pagination = React.createClass({
  propTypes: {
    total: React.PropTypes.number,
    offset: React.PropTypes.number,
    limit: React.PropTypes.number,
    onPageChange: React.PropTypes.func,
    onPageLimitChange: React.PropTypes.func,
    redirectText: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      total: 0,
      offset: 0,
      limit: 10,
      limitSettingItems: [10, 20, 100],
      redirectText: '跳转'
    }
  },
  getInitialState: function () {
    return {
      offsetLimit: this.props.limit,
      text: ''
    }
  },
  _createButtons: function () {
    var startIndex = this.props.offset;
    var endIndex = this.props.offset;

    var buttonCount = 5 - 1;
    while (buttonCount > 0) {
      var all = true;
      if (startIndex > 0) {
        startIndex--;
        buttonCount--;
        all = false
      }
      if (endIndex < Math.ceil(this.props.total / this.props.limit) - 1) {
        endIndex++;
        buttonCount--;
        all = false
      }
      if (all) {
        break
      }
    }

    var that = this;
    var ele = [];
    if (startIndex > 0) {
      var _firstPage = (function (index) {
        return function () {
          that._changePage(index)
        }
      })(0)
      var ico = '<<';
      ele.push(<li key='startstart' onClick={_firstPage}>
                 <a>
                   {ico}
                 </a>
               </li>);
      var _prePage = (function (index) {
        return function () {
          that._changePage(index);
        };
      })(Math.max(this.props.offset - 1, 0));
      var ico = '<';
      ele.push(<li key='start' onClick={_prePage}>
                 <a>
                   {ico}
                 </a>
               </li>);
    }
    for (var index = startIndex; index <= endIndex; index++) {
      var num = index + 1;
      if (index == this.props.offset) {
        ele.push(<li className='active' key={index}>
                   <a>
                     {num}
                   </a>
                 </li>);
      } else {
        var _changePage = (function (index) {
          return function () {
            that._changePage(index)
          }
        })(index);
        ele.push(<li key={index} onClick={_changePage}>
                   <a>
                     {num}
                   </a>
                 </li>);
      }
    }
    if (endIndex < Math.ceil(this.props.total / this.props.limit) - 1) {
      var _nextPage = (function (index) {
        return function () {
          that._changePage(index)
        }
      })(Math.min(this.props.offset + 1, Math.ceil(this.props.total / this.props.limit) - 1))
      var ico = '>';
      ele.push(<li key='end' onClick={_nextPage}>
                 <a>
                   {ico}
                 </a>
               </li>);
      var _lastPage = (function (index) {
        return function () {
          that._changePage(index)
        }
      })(Math.ceil(this.props.total / this.props.limit) - 1);
      var ico = '>>';
      ele.push(<li key='endend' onClick={_lastPage}>
                 <a>
                   {ico}
                 </a>
               </li>);
    }
    return ele;
  },
  _changePage: function (index) {
    if (typeof this.props.onPageChange === 'function') {
      this.props.onPageChange(index)
    }
  },
  _createLimitSetting: function () {
    var that = this;
    var buttons = this.props.limitSettingItems.map(function (obj, i) {
      var _setLimit = function () {
        that._setLimit(obj)
      };

      var style = {
        display: 'inline-block',
        margin: 'auto 2px',
        cursor: 'pointer'
      };
      if (obj === that.state.offsetLimit)
        style.color = '#2196F3'
      return (
        <div key={i} onClick={_setLimit} style={style}>
          {obj}
        </div>
      )
    });

    return (
      <div style={{float: 'left', marginTop: 27}}>
        {this.props.total ?
           <div style={{display: 'inline-block'}}>
             共
             {this.props.total}条记录，
           </div>
           : null}
        <div style={{display: 'inline-block'}}>
          每页显示
        </div>
        {buttons}
        <div style={{display: 'inline-block'}}>
          条
        </div>
      </div>
    )
  },
  _setLimit: function (limit) {
    this.setState({
      offsetLimit: limit
    });
    if (typeof this.props.onPageLimitChange === 'function') {
      this.props.onPageLimitChange(limit)
    }
  },
  _textChange: function (event) {
    this.setState({
      text: event.target.value
    })
  },
  _onRedirect: function () {
    var index = parseInt(this.state.text) - 1;
    if (typeof index === 'number' && index >= 0 && index <= Math.ceil(this.props.total / this.props.limit) - 1) {
      this._changePage(index)
    }else if(index < 0 || index > this.props.total - 1){
      Utils.prompt('页码超过范围');
    }else{
      Utils.prompt('请输入欲跳转的页码');
    }
  },
  render: function () {
    var buttons = this._createButtons();
    return ( <div className='pagination-wrapper clearfix' style={{paddingLeft: 10, paddingRight: 10}}>
               <div style={{float: 'right', verticalAlign: 'middle'}}>
                 {buttons && buttons.length > 1 ?
                    <ul className='pagination pagination-flat' style={{display: 'inline-block', verticalAlign: 'middle'}}>
                      {buttons}
                    </ul>
                    : null}
                 {this.props.redirectText && Math.ceil(this.props.total / this.props.limit) > 1 ?
                    <div  style={{display: 'inline-block', verticalAlign: 'middle'}}>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.text}
                        onChange={this._textChange} 
                        style={{display: 'inline-block', verticalAlign: 'middle', width: 50, marginLeft: 10, marginRight: 10}}/>
                      <button
                        style={{display: 'inline-block', verticalAlign: 'middle'}}
                        type='button'
                        className='btn bg-blue-ws'
                        onClick={this._onRedirect}>
                        {this.props.redirectText}
                      </button>
                    </div>
                    : null}
               </div>
               {typeof this.props.onPageLimitChange === 'function' ? this._createLimitSetting() : null}
             </div>
    )
  }
})

module.exports = Pagination
