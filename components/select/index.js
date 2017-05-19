var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');
var Clone = require('clone');

var Option = React.createClass({
    propTypes: {
        /**
         * 选项的数据
         */
        optionData: React.PropTypes.object,
        /**
         * 下拉选项的显示内容
         */
        displayKey: React.PropTypes.string,
        /**
         * 下拉选项显示内容的值
         */
        displayValue: React.PropTypes.string,
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
         /**
         * 支持筛选时，选项高亮
         */
        highlight: React.PropTypes.bool,
        /**
         * 选中选项高亮
         */
        active: React.PropTypes.bool,
        /**
         * 选项是否禁用
         */
        isDisabled: React.PropTypes.bool,
    },
    getDefaultProps() {
        return {
            displayKey: 'name',
            displayValue: 'value',
            highlight: false,
            active: false,
            isDisabled: false,
            optionData: {},
        }
    },
    getInitialState: function () {
        return {
            highlight: this.props.highlight
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (!deepEqual(this.state.data, nextProps)) {
            this.setState({
                highlight: nextProps.highlight
            })
        }
    },
    _handleClick: function () {
        this.props.select(this.props.selectKey, this.props.children)
    },
    _handleMouseEnter: function () {
        this.setState({
            highlight: true
        })
    },
    _handleMouseLeave: function () {
        this.setState({
            highlight: false
        })
    },
    render: function () {
        var classes = classnames({
            'select2-result': true,
            'select2-hover-highlighted': this.state.highlight,
            'select2-highlighted': this.props.active,
            'select2-disabled': this.props.isDisabled
        });
        return (
            <li
                className={classes}
                onClick={this._handleClick}
                onMouseEnter={this._handleMouseEnter}
                onMouseLeave={this._handleMouseLeave}>

                <div title={this.props.children} className='select2-result-label'>
                    {typeof this.props.renderOption == 'function' ? this.props.renderOption(this.props.optionData, this.props.displayKey, this.props.displayValue) : this.props.children}
                </div>
            </li>
        )
    }
});
/**
 * 多种功能的下拉框组件，包含单选、多选、搜索、自动完成等模式
 */
var Select = React.createClass({
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
         * placeholder  in  autocomplete
         */
        placeholder: React.PropTypes.string,
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
        onBlur: React.PropTypes.func,
        /**
         * 可以自定义选项的显示
         */
        renderOption: React.PropTypes.func,
        /**
         * 是否可以清楚所选
         */
        clearable: React.PropTypes.bool,
    },
    getDefaultProps: function () {
        return {
            name: '',
            searchable: false,
            clearable: false,
            autocomplete: false,
            placeholder: '',
            noResultText: '没有结果',
            multiselect: false,
            displayKey: 'name',
            displayValue: 'value',
            options: [],
            dropStyle: {},//zee add for set drop style
            valuePath: ''
        }
    },
    getInitialState: function () {
        return {
            open: false,
            name: this.props.name,
            term: '',
            options: Clone(this.props.options),
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
            multiValue: ''
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (deepEqual(this.props, nextProps)) {
            return;
        }
        //zee 注释
        /*  if (nextProps.options && this.props.autocomplete) {
         this.state.open = !!nextProps.options.length;
         }*/

        var defaultValueChange = false;
        if (!deepEqual(this.props.defaultValue, nextProps.defaultValue)) {
            defaultValueChange = true;
        }
        var optionsChange = false;
        if (!deepEqual(this.props.options, nextProps.options)) {
            optionsChange = true;
        }
        if (optionsChange && nextProps.options) {
            this.state.options = Clone(nextProps.options);
            this.props = nextProps;
        } else {
            this.props = nextProps;
        }

        if (defaultValueChange || optionsChange) {
            this.componentWillMount();
        }
    },

    componentWillMount: function () {
        if (this.props.multiselect) {
            var multiselectArray = [];
            var that = this;
            var defaultValue = this.props.defaultValue;
            if (typeof defaultValue != 'undefined' && defaultValue != null && !(defaultValue instanceof Array)) {
                defaultValue = [defaultValue]
            }
            if (defaultValue && defaultValue.length > 0) {
                defaultValue.map(function (value) {
                    for (var index in that.state.options) {
                        if (deepEqual(value, that.state.options[index][that.props.displayValue])) {
                            multiselectArray.push(that.state.options[index]);
                            /*                            multiselectArray.push({
                             [that.props.displayKey]: that.state.options[index][that.props.displayKey],
                             [that.props.displayValue]: that.state.options[index][that.props.displayValue]
                             })*/
                        }
                    }
                })
            }
            this.state.multiselectArray = multiselectArray;
            this.props.onChange(defaultValue, this.state.multiselectArray, this.props.valuePath);
        } else if (this.props.autocomplete) {//zee
            this.setState({term: this.props.defaultValue || ''});
        } else {
            for (var index in this.state.options) {
                if (deepEqual(this.props.defaultValue, this.state.options[index][this.props.displayValue])) {
                    this.setState({
                        name: this.state.options[index][this.props.displayKey],
                        selectedOption: this.state.options[index]
                    });
                    this.props.onChange(this.props.defaultValue, this.state.options[index], this.props.valuePath);
                    return
                }
            }

            this.props.onChange('', null, this.props.valuePath);
            this.setState({
                name: this.props.name,
                selectedOption: null,
            });
        }
    },

    componentDidMount() {
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.refs.drop && this.state.open) {
            this.refs.drop.scrollIntoViewIfNeeded()
        }
    },

    componentWillUnmount: function () {
        document.removeEventListener('click', this._handleClickOutside)
    },

    _handleClickOutside: function (event) {
        if (!this.state.open) {
            return
        }
        var outsideFlag = true;
        var selectEle = ReactDom.findDOMNode(this.refs.select_div);
        var eventTarget = (event.target) ? event.target : event.srcElement;
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

    _handleClick: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.disabled) return;
        this._setDropState();
    },

    _handleMultiAutoClick: function (e) {
        ReactDom.findDOMNode(this.refs.selectInput).focus()
    },

    _handleInputChange: function (e) {
        var self = this,
            changeState = {
                term: e.target.value,
                options: this._getSearchOption(e.target.value),
                open: true
            };
        if (!this.props.multiselect) {
            changeState.selectedOption = null;
        }
        this.setState(changeState, function () {
            self.props.onUpdate && self.props.onUpdate(self.state.term, self.props.valuePath)
        });
    },

    //获取搜索
    _getSearchOption: function (value) {
        var self = this;
        if (typeof value === 'undefined' || value == null || value === '') {
            return Clone(this.props.options);
        } else {
            return this.props.options.filter(function (item) {
                return (value || value === 0) && (item[self.props.displayKey].indexOf(value) > -1)
            });
        }
    },

    _handleInputKeyDown: function (e) {
        var that = this, index;
        switch (e.keyCode) {
            case 13: // enter
                if (this.props.searchable || this.props.autocomplete) {
                    this.state.options.forEach(function (item, index) {
                        if (item[that.props.displayKey] != that.state.term) {
                            return
                        }
                        that.state.focusedOption = item;
                        that.state.focusedIndex = index;
                    })
                }
                if (this.props.multiselect && !this.state.focusedOption) {//zee add for multiselect
                    return;
                }
                this._selectItem(this.state.focusedOption, this.state.focusedIndex);
                break;
            case 27: // escape
                this.setState({
                    name: null
                });
                break;
            case 38: // up
                if (!this.state.focusedOption) {
                    index = this.state.options.length - 1;
                    this.setState({
                        focusedIndex: index,
                        focusedOption: this.state.options[index],
                        term: this.state.options[index][this.props.displayKey]
                    });
                    break
                }
                for (index in this.state.options) {
                    if (this.state.options[index][this.props.displayValue] == this.state.focusedOption[this.props.displayValue]) {
                        index = index == 0 ? this.state.options.length - 1 : parseInt(index) - 1;
                        if (this.state.options[index]) {
                            this.setState({
                                focusedIndex: index,
                                focusedOption: this.state.options[index],
                                term: this.state.options[index][this.props.displayKey]
                            });
                        }
                        break;
                    }
                }
                break;
            case 40: // down
                if (!this.state.focusedOption) {
                    index = 0;
                    this.setState({
                        focusedIndex: index,
                        focusedOption: this.state.options[index],
                        term: this.state.options[index][this.props.displayKey]
                    });
                    break;
                }
                for (index in this.state.options) {
                    if (this.state.options[index][this.props.displayValue] == this.state.focusedOption[this.props.displayValue]) {
                        index = index == this.state.options.length - 1 ? 0 : parseInt(index) + 1;
                        if (this.state.options[index]) {
                            this.setState({
                                focusedIndex: index,
                                focusedOption: this.state.options[index],
                                term: this.state.options[index][this.props.displayKey]
                            })
                        }
                        break
                    }
                }
                break;
            case 8: // backspace
                if (this.props.multiselect && !this.state.term) {
                    if (this.state.multiselectArray && this.state.multiselectArray.length > 0) {
                        this.state.multiselectArray.splice(this.state.multiselectArray.length - 1, 1);

                        var values = this.state.multiselectArray.map(function (item) {
                            return item[that.props.displayValue]
                        });

                        this.props.onChange(values, this.state.multiselectArray, this.props.valuePath);
                        this.forceUpdate(function () {
                            that._handleMultiAutoClick()
                        });
                    }
                }
                return;
            default:
                return
        }
        e.preventDefault();
    },

    _handleInputFocus: function (e) {
        /*var onUpdate = this.props.onUpdate;
         onUpdate && onUpdate(this.state.term, this.props.valuePath)*/
        this._handleInputChange(e);
    },

    _handleInputBlur: function (e) {
        var that = this;
        setTimeout(function () {
            that.setState({
                open: false
            });
            //that.props.onChange(that.state.term)
            that.props.onBlur && that.props.onBlur(that.state.term, that.props.valuePath);//zee
        }, 300)

    },

    _handleClearClick: function (e) {
        this.props.onChange('', null, this.props.valuePath);
        this.setState({
            name: this.props.name,
            selectedOption: null,
        });
        e.stopPropagation();
    },

    _setDropState: function (open) {

        if (typeof open === 'undefined' || open == null) {
            open = !this.state.open
        }
        this.setState({
            open: open
        }, function () {
            if (this.state.open) {
                document.addEventListener('click', this._handleClickOutside);
            } else {
                document.removeEventListener('click', this._handleClickOutside);
                /*if (this.props.autocomplete) {
                 ReactDom.findDOMNode(this.refs.autocompleteInput).blur();
                 }*/
            }
        })
    },

    _selectItem: function (option, index) {
        var that = this;
        if (option && option['isDisabled']) {//选项被禁用
            return;
        }
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
                    this.state.multiselectArray.push({
                        [that.props.displayKey]: option[that.props.displayKey],
                        [that.props.displayValue]: option[that.props.displayValue]
                    })
                }
                var values = this.state.multiselectArray.map(function (item) {
                    return item[that.props.displayValue]
                });

                // this.refs.input.focus()
                this.props.onChange(values, this.state.multiselectArray, this.props.valuePath);
                this.setState({
                    name: '',
                    term: '',
                    options: Clone(this.props.options),
                }, function () {
                    if (that.props.autocomplete) {
                        that._handleMultiAutoClick()
                    }
                });
            } else {
                this.props.onChange(option[this.props.displayValue], option, this.props.valuePath);
                this.setState({
                    name: option[this.props.displayKey],
                    options: Clone(this.props.options),
                    term: this.props.searchable ? '' : option[this.props.displayKey],
                    selectedOption: option
                })
            }
            this.setState({
                focusedOption: null,
                focusedIndex: -1
            })
        }
    },

    _hoverItem: function (option) {
        this.setState({
            focusedOption: option
        })
    },

    _createDrop: function () {
        var options = this.state.options;
        var optionEle = [];
        var that = this;
        var noValue = (<li className='select2-no-results' key='no-result'>
            {this.props.noResultText}
        </li>);
        if (this.props.searchable) {
            optionEle.unshift(<li className='select2-search' key='search'>
                <input
                    type='text'
                    className='select2-input option-search'
                    placeholder='搜索'
                    value={this.state.term}
                    onChange={this._handleInputChange}
                    onKeyDown={this._handleInputKeyDown}/>
            </li>)
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
            var _selectItem = function () {
                that._selectItem(item, index);
            };
            var _hoverItem = function () {
                that._hoverItem(item)
            };
            if (that.state.focusedOption && name == that.state.focusedOption[that.props.displayKey]) {
                highlight = true
            }
            if (that.state.selectedOption && name == that.state.selectedOption[that.props.displayKey]) {
                active = true
            }
            if (that.props.multiselect) {
                for (var j = 0; j < that.state.multiselectArray.length; j++) {
                    if (that.state.multiselectArray[j][that.props.displayValue] === item[that.props.displayValue]) {
                        active = true
                    }
                }
            }
            optionEle.push(<Option
                key={index + 1}
                optionData={item}
                selectKey={name}
                displayKey={that.props.displayKey}
                displayValue={that.props.displayValue}
                select={_selectItem}
                hover={_hoverItem}
                highlight={highlight}
                isDisabled={item.isDisabled}
                renderOption={that.props.renderOption}
                active={active}>
                {name}
            </Option>)
        });
        // if (search) optionEle.unshift(search)
        return optionEle.filter(function (item) {
            return item
        }).length ? optionEle : noValue
    },

    /*  componentDidUpdate() {
     if (this.props.multiselect || this.props.autocomplete) {//zee 添加了autocomplete
     var input = ReactDom.findDOMNode(this.refs.selectInput || this.refs.autocompleteInput);
     if (this.state.open) {
     input.focus();
     } else {
     input.blur();
     }
     }
     },*/
    render: function () {
        var that = this;
        var drop = null,
            dropStyle = Object.assign({
                display:this.state.open ?'block':'none'
            },this.props.dropStyle);

        // if (this.state.open) {
        drop = (<div className='select2-drop select2-drop-active' ref='drop'
                     style={dropStyle}>
                <ul className='select2-results'>
                    {this._createDrop()}
                </ul>
            </div>
        );
        // }

        var choices = null;

        if (this.props.multiselect && this.state.multiselectArray) {
            choices = this.state.multiselectArray.map(function (item, i) {
                var remove = function (ev) {
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
                        that.props.onChange(values, that.state.multiselectArray, that.props.valuePath);
                    }
                    that.forceUpdate();
                };
                return (
                    <li key={i} className={'select2-search-choice'}>
                        <div>
                            {item[that.props.displayKey]}
                        </div>
                        <a className='select2-search-choice-close' onClick={remove}></a>
                    </li>
                )
            });
        }
        var className = classnames({
            'select2-container': true,
            'select': true,
            'select2-dropdown-open': this.state.open,
            'select2-allowclear': this.props.clearable && this.state.selectedOption,
            'select2-container-multi': this.props.multiselect,
            'select2-container-disabled': this.props.disabled
        }, this.props.className);
        var trigger;
        if (this.props.multiselect) {
            trigger = this.props.autocomplete ?
                <ul
                    className='select2-choices'
                    onClick={this._handleMultiAutoClick}
                    >
                    {
                        choices.concat(
                            <li key={that.state.multiselectArray.length} className='select2-search-field'>
                                <input
                                    ref='selectInput'
                                    type='text'
                                    //value={this.state.multiValue}
                                    value={this.state.term}
                                    className='select2-input multi-select'
                                    onFocus={this._handleInputFocus}
                                    onBlur={this._handleInputBlur}
                                    onChange={this._handleInputChange}
                                    onKeyDown={this._handleInputKeyDown}
                                    />
                            </li>
                        )
                    }
                </ul>
                :
                <ul
                    className='select2-choices'
                    onClick={this._handleClick}
                    >
                    {
                        choices.concat(
                            <li key={that.state.multiselectArray.length} className='select2-search-field'>
                                <input
                                    ref='selectInput'
                                    type='text'
                                    value={this.state.multiValue}
                                    className='select2-input'
                                    onClick={this._handleClick}
                                    onKeyUp={this._handleInputKeyDown}
                                    />
                            </li>
                        )
                    }
                </ul>
        } else if (this.props.autocomplete) {
            trigger = (
                <input
                    ref='autocompleteInput'
                    type='text'
                    value={this.state.term}
                    className='form-control'
                    onFocus={this._handleInputFocus}
                    onBlur={this._handleInputBlur}
                    onChange={this._handleInputChange}
                    onKeyDown={this._handleInputKeyDown}/>
            )
        } else {
            trigger = (
                <a
                    title={this.state.name}
                    className='select2-choice'
                    onClick={this._handleClick}
                    style={{ overflow: 'hidden' }}>
                    {this.state.name}
                    <span className='select2-arrow'><b></b></span>
                    <i className="icon-cross3 select2-clear" onClick={this._handleClearClick}></i>
                    </a>
            )
        }

        return (
            <div
                ref='select_div'
                className={className}
                style={assign({}, this.props.style)}
                >
                {trigger}
                {drop}
            </div>
        )

    }
});

module.exports = Select;
