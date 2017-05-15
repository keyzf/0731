'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var Option = React.createClass({
  displayName: 'Option',

  propTypes: {
    /**
     * 显示的内容
     */
    selectKey: React.PropTypes.any,
    /**
     * 点击选项的回调
     */
    select: React.PropTypes.func,
    /**
     * mouseover的回调
     */
    hover: React.PropTypes.func,
    /**
     * 支持筛选时，选项高亮
     */
    highlight: React.PropTypes.bool,
    /**
     * 选中选项高亮
     */
    active: React.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      highlight: false,
      active: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      highlight: this.props.highlight
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.state.data, nextProps)) {
      this.setState({
        highlight: nextProps.highlight
      });
    }
  },
  _handleClick: function _handleClick() {
    this.props.select(this.props.selectKey, this.props.children);
  },
  _handleMouseEnter: function _handleMouseEnter() {
    this.setState({
      highlight: true
    });
  },
  _handleMouseLeave: function _handleMouseLeave() {
    this.setState({
      highlight: false
    });
  },
  render: function render() {
    var classes = classnames({
      'select2-result': true,
      'select2-hover-highlighted': this.state.highlight,
      'select2-highlighted': this.props.active
    });
    return React.createElement(
      'li',
      {
        className: classes,
        onClick: this._handleClick,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave },
      React.createElement(
        'div',
        { title: this.props.children, className: 'select2-result-label' },
        this.props.children
      )
    );
  }
});

/**
 * 多种功能的下拉框组件，包含单选、多选、搜索、自动完成等模式
 */
var Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    /**
     * 显示的内容
     */
    name: React.PropTypes.string,
    /**
     * 下拉选项源数据
     */
    options: React.PropTypes.array,
    /**
     * 初始值
     */
    defaultValue: React.PropTypes.any,
    /**
     * 是否支持筛选
     */
    searchable: React.PropTypes.bool,
    /**
     * autocomplete模式
     */
    autocomplete: React.PropTypes.bool,
    /**
     * 数据源为空时显示
     */
    noResultText: React.PropTypes.string,
    /**
     * 是否支持多选
     */
    multiselect: React.PropTypes.bool,
    /**
     * 下拉选项的显示内容
     */
    displayKey: React.PropTypes.string,
    /**
     * 下拉选项显示内容的值
     */
    displayValue: React.PropTypes.string,

    /**
     * 点击选项的回调函数
     */
    onChange: React.PropTypes.func,
    /**
     * 支持筛选时，通知父组件更新下拉选项数据源的回调函数
     */
    onUpdate: React.PropTypes.func,
    /**
     * 支持autocomplete blur时，通知父组件用户输入的值的回调函数
     */
    onBlur: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      searchable: false,
      autocomplete: false,
      noResultText: '没有结果',
      multiselect: false,
      displayKey: 'name',
      displayValue: 'value',
      options: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      open: false,
      name: this.props.name,
      term: '',
      options: this.props.options,
      /**
       * 用于记录鼠标hover和键盘up&down的选项
       */
      focusedOption: null,
      focusedIndex: 0,
      /**
       * 用于记录选中选项
       */
      selectedOption: null,
      multiselectArray: [],
      lastCount: 0,
      inputWidth: 'auto',
      multiValue: '',
      defaultValue: this.props.defaultValue
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (deepEqual(this.props, nextProps)) {
      return;
    }

    if (nextProps.options && this.props.autocomplete) {
      this.state.open = !!nextProps.options.length;
    }

    var defaultValueChange = false;
    if (!deepEqual(this.props.defaultValue, nextProps.defaultValue)) {
      this.state.defaultValue = nextProps.defaultValue;
      defaultValueChange = true;
    }
    var optionsChange = false;
    if (!deepEqual(this.props.options, nextProps.options)) {
      optionsChange = true;
    }
    if (nextProps.options) {
      this.state.options = nextProps.options;

      this.props = nextProps;
    } else {
      this.props = nextProps;
    }

    if (defaultValueChange || optionsChange) {
      this.componentWillMount();
    }
    this.state.defaultValue = null;
  },
  componentWillMount: function componentWillMount() {
    if (this.props.multiselect) {
      if (this.props.autocomplete) {
        if (this.state.defaultValue) {
          this.state.multiselectArray = this.state.defaultValue;
        }
        return;
      }
      var multiselectArray = [];
      var that = this;
      var defaultValue = this.state.defaultValue;
      if (typeof defaultValue != 'undefined' && defaultValue != null && !(defaultValue instanceof Array)) {
        defaultValue = [defaultValue];
      }
      if (defaultValue && defaultValue.length > 0) {
        defaultValue.map(function (value) {
          for (var index in that.props.options) {
            if (deepEqual(value, that.props.options[index][that.props.displayValue])) {
              var _multiselectArray$pus;

              multiselectArray.push((_multiselectArray$pus = {}, _defineProperty(_multiselectArray$pus, that.props.displayKey, that.props.options[index][that.props.displayKey]), _defineProperty(_multiselectArray$pus, that.props.displayValue, that.props.options[index][that.props.displayValue]), _multiselectArray$pus));
            }
          }
        });
      }
      this.state.multiselectArray = multiselectArray;
    } else {

      this.setState({
        name: this.props.name,
        selectedOption: null
      });

      for (var index in this.props.options) {
        if (deepEqual(this.state.defaultValue, this.props.options[index][this.props.displayValue])) {
          this.setState({
            name: this.props.options[index][this.props.displayKey],
            selectedOption: this.props.options[index]
          });
          break;
        }
      }
    }
  },
  componentDidMount: function componentDidMount() {},
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.refs.drop && this.state.open) {
      this.refs.drop.scrollIntoViewIfNeeded();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutside);
  },
  _handleClickOutside: function _handleClickOutside(event) {
    if (!this.state.open) {
      return;
    }
    var outsideFlag = true;
    var selectEle = ReactDom.findDOMNode(this.refs.select_div);
    var eventTarget = event.target ? event.target : event.srcElement;
    while (eventTarget != null) {
      if (eventTarget === selectEle) {
        outsideFlag = false;
        break;
      }
      eventTarget = eventTarget.offsetParent;
    }

    if (outsideFlag) {
      this._setDropState(false);
    }
  },
  _handleKeyup: function _handleKeyup(e) {
    e.keyCode === 27 && this._setDropState(false);
  },
  _handleClick: function _handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.disabled) return;
    this._setDropState();
  },
  _handleMultiAutoClick: function _handleMultiAutoClick(e) {
    ReactDom.findDOMNode(this.refs.selectInput).focus();
  },
  _handleInputChange: function _handleInputChange(e) {
    var self = this;
    this.setState({
      term: e.target.value,
      selectedOption: null
    }, function () {
      self.props.onUpdate && self.props.onUpdate(self.state.term);
    });
  },
  _handleInputKeyDown: function _handleInputKeyDown(e) {
    var that = this;
    var index;
    switch (e.keyCode) {
      case 13:
        // enter
        if (this.props.searchable || this.props.autocomplete) {
          this.props.options.forEach(function (item, index) {
            if (item[that.props.displayKey] != that.state.term) {
              return;
            }
            that.state.focusedOption = item;
            that.state.focusedIndex = index;
          });
        }
        if (!this.state.focusedOption) {
          return;
        }
        this._selectItem(this.state.focusedOption, this.state.focusedIndex);
        break;
      case 27:
        // escape
        this.setState({
          name: null
        });
        break;
      case 38:
        // up
        if (!this.state.focusedOption) {
          index = this.props.options.length - 1;
          this.setState({
            focusedIndex: index,
            focusedOption: this.props.options[index],
            term: this.props.options[index][this.props.displayKey]
          });
          break;
        }
        for (index in this.props.options) {
          if (this.props.options[index][this.props.displayValue] == this.state.focusedOption[this.props.displayValue]) {
            index = index == 0 ? this.props.options.length - 1 : parseInt(index) - 1;
            if (this.props.options[index]) {
              this.setState({
                focusedIndex: index,
                focusedOption: this.props.options[index],
                term: this.props.options[index][this.props.displayKey]
              });
            }
            break;
          }
        }
        break;
      case 40:
        // down
        if (!this.state.focusedOption) {
          index = 0;
          this.setState({
            focusedIndex: index,
            focusedOption: this.props.options[index],
            term: this.props.options[index][this.props.displayKey]
          });
          break;
        }
        for (index in this.props.options) {
          if (this.props.options[index][this.props.displayValue] == this.state.focusedOption[this.props.displayValue]) {
            index = index == this.props.options.length - 1 ? 0 : parseInt(index) + 1;
            if (this.props.options[index]) {
              this.setState({
                focusedIndex: index,
                focusedOption: this.props.options[index],
                term: this.props.options[index][this.props.displayKey]
              });
            }
            break;
          }
        }
        break;
      case 8:
        // backspace
        if (this.props.multiselect) {
          if (this.state.term !== '' && this.props.autocomplete) {
            return;
          }
          if (this.state.multiselectArray && this.state.multiselectArray.length > 0) {
            this.state.multiselectArray.splice(this.state.multiselectArray.length - 1, 1);

            var values = this.state.multiselectArray.map(function (item) {
              return item[that.props.displayValue];
            });

            this.props.onChange(values, this.state.multiselectArray);
            this.forceUpdate(function () {
              that._handleMultiAutoClick();
            });
          }
        }
        return;
      default:
        return;
    }
    e.preventDefault();
  },
  _handleInputFocus: function _handleInputFocus(e) {
    var onUpdate = this.props.onUpdate;
    onUpdate && onUpdate(this.state.term);
  },
  _handleInputBlur: function _handleInputBlur(e) {
    var that = this;
    setTimeout(function () {
      that.setState({
        open: false
      });
      that.props.onBlur && that.props.onBlur(that.state.term);
    }, 300);
  },
  _setDropState: function _setDropState(open) {
    //切换下拉框展开状态
    if (typeof open === 'undefined' || open == null) {
      open = !this.state.open;
    }
    this.setState({
      open: open
    }, function () {
      if (open) {
        document.addEventListener('click', this._handleClickOutside);
      } else {
        document.removeEventListener('click', this._handleClickOutside);
      }
    });
  },
  _selectItem: function _selectItem(option, index) {
    //选中选项
    var that = this;
    this._setDropState(false);
    if (typeof this.props.onChange === 'function') {
      if (this.props.multiselect) {
        var contain = false;
        this.state.multiselectArray.map(function (item) {
          if (item[that.props.displayValue] === option[that.props.displayValue]) {
            contain = true;
          }
        });
        if (!contain) {
          var _state$multiselectArr;

          this.state.multiselectArray.push((_state$multiselectArr = {}, _defineProperty(_state$multiselectArr, that.props.displayKey, option[that.props.displayKey]), _defineProperty(_state$multiselectArr, that.props.displayValue, option[that.props.displayValue]), _state$multiselectArr));
        }
        var values = this.state.multiselectArray.map(function (item) {
          return item[that.props.displayValue];
        });

        // this.refs.input.focus()
        this.props.onChange(values, this.state.multiselectArray);
        this.setState({
          name: '',
          term: ''
        }, function () {
          if (that.props.autocomplete) {
            that._handleMultiAutoClick();
          }
        });
      } else {
        this.props.onChange(option[this.props.displayValue], index);
        this.setState({
          name: option[this.props.displayKey],
          term: this.props.searchable ? '' : option[this.props.displayKey],
          selectedOption: option
        });
      }
      this.setState({
        focusedOption: null,
        focusedIndex: -1
      });
    }
  },
  _hoverItem: function _hoverItem(option) {
    this.setState({
      focusedOption: option
    });
  },
  _createDrop: function _createDrop() {
    //创建下拉选项
    var options = this.state.options;
    var optionEle = [];
    var that = this;
    var noValue = React.createElement(
      'li',
      { className: 'select2-no-results', key: 'no-result' },
      this.props.noResultText
    );
    if (this.props.searchable) {
      optionEle.unshift(React.createElement(
        'li',
        { className: 'select2-search', key: 'search' },
        React.createElement('input', {
          type: 'text',
          className: 'select2-input',
          placeholder: '\u641C\u7D22',
          value: this.state.term,
          onChange: this._handleInputChange,
          onKeyDown: this._handleInputKeyDown })
      ));
    }
    if (options == null || options.length == 0) {
      optionEle.push(noValue);
      return optionEle;
    }
    options.forEach(function (item, index) {
      var name = item[that.props.displayKey];
      var value = item[that.props.displayValue];
      var active = false;
      var highlight = false;
      var _selectItem = function _selectItem() {
        that._selectItem(item, index);
      };
      var _hoverItem = function _hoverItem() {
        that._hoverItem(item);
      };
      if (that.state.focusedOption && name == that.state.focusedOption[that.props.displayKey]) {
        highlight = true;
      }
      if (that.state.selectedOption && name == that.state.selectedOption[that.props.displayKey]) {
        active = true;
      }
      if (that.props.multiselect) {
        for (var j = 0; j < that.state.multiselectArray.length; j++) {
          if (that.state.multiselectArray[j][that.props.displayValue] === item[that.props.displayValue]) {
            active = true;
          }
        }
      }
      optionEle.push(React.createElement(
        Option,
        {
          key: index + 1,
          selectKey: name,
          select: _selectItem,
          hover: _hoverItem,
          highlight: highlight,
          active: active },
        name
      ));
    });
    // if (search) optionEle.unshift(search)
    return optionEle.filter(function (item) {
      return item;
    }).length ? optionEle : noValue;
  },
  render: function render() {
    var that = this;
    var drop = null;

    // if (this.state.open) {
    drop = React.createElement(
      'div',
      { className: 'select2-drop select2-drop-active', ref: 'drop', style: this.state.open ? { display: 'block' } : { display: 'none' } },
      React.createElement(
        'ul',
        { className: 'select2-results' },
        this._createDrop()
      )
    );
    // }

    var choices = null;

    if (this.props.multiselect && this.state.multiselectArray) {
      choices = this.state.multiselectArray.map(function (item, i) {
        var remove = function remove(ev) {
          ev.stopPropagation();
          for (var j = 0; j < that.state.multiselectArray.length; j++) {
            if (that.state.multiselectArray[j][that.props.displayValue] === item[that.props.displayValue]) {
              that.state.multiselectArray.splice(j, 1);
            }
          }

          if (typeof that.props.onChange === 'function') {
            var values = that.state.multiselectArray.map(function (item) {
              return item[that.props.displayValue];
            });
            that.props.onChange(values, that.state.multiselectArray);
          }
          that.forceUpdate();
        };
        return React.createElement(
          'li',
          { key: i, className: 'select2-search-choice' },
          React.createElement(
            'div',
            null,
            item[that.props.displayKey]
          ),
          React.createElement('a', { className: 'select2-search-choice-close', onClick: remove })
        );
      });
    }

    var className = classnames({
      'select2-container': true,
      'select': true,
      'select2-dropdown-open': this.state.open,
      'select2-container-multi': this.props.multiselect,
      'select2-container-disabled': this.props.disabled
    }, this.props.className);

    var trigger;
    if (this.props.multiselect) {
      trigger = this.props.autocomplete ? React.createElement(
        'ul',
        {
          className: 'select2-choices',
          onClick: this._handleMultiAutoClick
        },
        choices.concat(React.createElement(
          'li',
          { key: that.state.multiselectArray.length, className: 'select2-search-field' },
          React.createElement('input', {
            ref: 'selectInput',
            type: 'text',
            value: this.state.term,
            className: 'select2-input',
            onFocus: this._handleInputFocus,
            onBlur: this._handleInputBlur,
            onChange: this._handleInputChange,
            onKeyDown: this._handleInputKeyDown
          })
        ))
      ) : React.createElement(
        'ul',
        {
          className: 'select2-choices',
          onClick: this._handleClick
        },
        choices.concat(React.createElement(
          'li',
          { key: that.state.multiselectArray.length, className: 'select2-search-field' },
          React.createElement('input', {
            ref: 'selectInput',
            type: 'text',
            value: this.state.multiValue,
            className: 'select2-input',
            onClick: this._handleClick,
            onKeyUp: this._handleInputKeyDown
          })
        ))
      );
    } else if (this.props.autocomplete) {
      trigger = React.createElement('input', {
        ref: 'autocompleteInput',
        type: 'text',
        value: this.state.term,
        className: 'form-control',
        onFocus: this._handleInputFocus,
        onBlur: this._handleInputBlur,
        onChange: this._handleInputChange,
        onKeyDown: this._handleInputKeyDown });
    } else {
      trigger = React.createElement(
        'a',
        {
          title: this.state.name,
          className: 'select2-choice',
          onClick: this._handleClick,
          style: { overflow: 'hidden' } },
        this.state.name,
        React.createElement(
          'span',
          { className: 'select2-arrow' },
          React.createElement('b', null)
        )
      );
    }

    return React.createElement(
      'div',
      { ref: 'select_div', className: className, style: assign({}, this.props.style) },
      trigger,
      drop
    );
  }
});

module.exports = Select;