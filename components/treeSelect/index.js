var React = require('react');
var ReactDom = require('react-dom');
var assign = require('object-assign');
var classnames = require('classnames');
var deepEqual = require('deep-equal');

var TreeStore = require('./store');
var Utils = require('../utils');
var CheckBox = require('../checkBox');

/**
 * 树形选择器
 */
var TreeSelect = React.createClass({
    propTypes: {
        /**
         * 树的相关数据
         */
        data: React.PropTypes.array,
        /**
         * 是否显示选择框,不显示则为单选
         */
        showCheckBox: React.PropTypes.bool,
        /**
         * 子父是否联动
         */
        linkage: React.PropTypes.bool,
        /**
         * 每层缩进宽度
         */
        marginLeft: React.PropTypes.number,

        /**
         * 被选中回调函数
         */
        onChange: React.PropTypes.func,
        /**
         * 显示添加按钮
         */
        showAddBtn: React.PropTypes.func,
        /**
         * 显示删除按钮
         */
        showDelBtn: React.PropTypes.func,
        /**
         * 添加操作
         */
        addChild: React.PropTypes.func,
        /**
         * 删除操作
         */
        delChild: React.PropTypes.func,
        /**
         * 修改操作
         */
        editChild: React.PropTypes.func,
        /**
         * 显示编辑按钮
         */
        showEditBtn: React.PropTypes.func,
        /**
         * text的key值
         */
        displayKey: React.PropTypes.string,
        /**
         * value的key值
         */
        displayValue: React.PropTypes.string,
    },
    getDefaultProps: function () {
        return {
            data: [],
            marginLeft: 12,
            displayKey: 'name',
            displayValue: 'value',
            childrenKey:'children',
            linkage: true,
            showCheckBox: true,
            onChange: function () {
            },
            realOnChange: null,//用于备份初始的onChange
            showAddBtn: function (item) {
                return false
            },
            showDelBtn: function (item) {
                return false
            },
            showEditBtn: function (item) {
                return false
            },
        }
    },
    getInitialState: function () {
        return {
            data: this.props.data,
        }
    },
    componentWillMount: function () {
        if (!this.props.treeStore) {
            this.state.treeStore = new TreeStore();
        } else {
            this.state.treeStore = this.props.treeStore;
        }
        this._formatData();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.data != this.props.data) {
            this.state.data = nextProps.data;
            this._formatData();
            this.props = nextProps;
        }

    },

    _formatData: function () {
        var data = this.state.data;
        for (var i = 0, len = data.length; i < len; i++) {
            if (!data[i].treeItemUniqueKey) {
                data[i].treeItemUniqueKey = Utils.CommonUtil.getRandomId();
            }
        }
    },

    _getSelected: function (data) {
        var selected = [];
        for (var key in data) {
            if (data[key].isParent) {
                if (data[key].checked) {
                    selected.push(data[key][this.props.displayValue]);
                }
                selected = selected.concat(this._getSelected(data[key][this.props.childrenKey]));
            } else if (data[key].checked) {
                selected.push(data[key][this.props.displayValue]);
            }
        }
        return selected;
    },

    _getSelectedItems: function (data) {
        var selectedItems = [];
        for (var key in data) {
            if (data[key].isParent) {
                if (data[key].checked) {
                    selectedItems.push(data[key]);
                }
                selectedItems = selectedItems.concat(this._getSelectedItems(data[key][this.props.childrenKey]));
            } else if (data[key].checked) {
                selectedItems.push(data[key]);
            }
        }
        return selectedItems;
    },

    _changeParentState: function () {
        var that = this;

        this.state.data.map(function (item) {

            if (item.isParent) {
                if (that.props.showCheckBox && that.props.linkage) {
                    var selected = 0;
                    var unselected = 0;
                    item[that.props.childrenKey].map(function (sub_item) {
                        if (sub_item.className == 'middle-status') {
                            selected++;
                            unselected++;
                        } else {
                            sub_item.checked ? selected++ : unselected++;
                        }
                    });

                    item.checked = unselected <= 0;
                    item.className = (selected > 0 && unselected > 0) ? 'middle-status' : '';
                }
            }

            if (item.treeItemUniqueKey != undefined && item.treeItemUniqueKey != that.state.treeStore.getProp('focusItemKey') && !that.props.showCheckBox) {
                item.checked = false;
                item.className = '';
            }

        });
        this.forceUpdate();
    },

    _onSelectChange: function () {
        var that = this;
        if (!this.props.showCheckBox) {//zee
            Utils.CommonUtil.traverseTreeData(this.state.data,{childrenKey:that.props.childrenKey,callFn:function(item){
                if (item.treeItemUniqueKey != undefined && item.treeItemUniqueKey != that.state.treeStore.getProp('focusItemKey')) {
                    item.checked = false;
                }
            }});
        }
        var data = this.state.data;
        var selected = this._getSelected(data);
        var selectedItems = this._getSelectedItems(data);
        this.props.onChange(selected, selectedItems);
    },
    _onChildrenChange: function () {
        this._changeParentState();
        this._onSelectChange();
    },
    _toggleChildren: function (item) {
        var show = item.expand || false;
        item.expand = !show;
        this.forceUpdate();
    },
    //单选一定不联动，不联动不一定是单选，单选只能选中一个值,优先判断是否是单选
    _itemOnChange: function (item) {
        var that = this;
        if (item.isParent) {
            if (!this.props.showCheckBox) {
                this._checkAllChildren(item, false);
            } else if (this.props.linkage) {
                this._checkAllChildren(item, !item.checked)
            }
        }
        item.className = '';
        item.checked = (!this.props.showCheckBox ? true : !item.checked);
        this.state.treeStore.setProps({focusItemKey: item.treeItemUniqueKey});


        this.forceUpdate();
        this._onSelectChange();

       /* if (this.props.showCheckBox) {
            this._onSelectChange();
        } else {//单选
            if (typeof this.props.realOnChange == 'function') {
                this.props.realOnChange([item[this.props.displayValue]], [item]);
            } else {
                this.props.onChange([item[this.props.displayValue]], [item]);
            }
        }*/
    },
    _checkAllChildren: function (item, checked) {
        var that = this;
        item[this.props.childrenKey].map(function (item) {
            if (item.isParent) {
                //that._checkAllChildren(item, checked);
                if (!that.props.showCheckBox) {
                    that._checkAllChildren(item, checked);
                } else if (that.props.linkage) {
                    that._checkAllChildren(item, !item.checked)
                }
            }
            item.checked = checked;
            item.className = '';
        })
    },
    _onMouseEnter: function (e, item) {
        var target = e.target;
        /*if(target.className == 'tree-item'){
         target.className = 'tree-item onHover';
         }*/
    },
    _onMouseLeave: function (e, item) {
        var target = e.target;
        //target.className = 'tree-item';
    },
    _addChild: function (treeItem) {
        this.props.addChild(treeItem);
    },
    _editItem: function (treeItem) {
        this.props.editChild(treeItem);
    },
    _delItem: function (treeItem) {
        this.props.delChild(treeItem);
    },
    _createTree: function (data) {
        var t = [];
        var that = this;
        if (!(data instanceof Array)) {
            return null;
        }
        data.map(function (item) {
            var key = Utils.getRandomString(),
                itemClass = 'tree-item';

            if (item.checked) {
                itemClass += ' tree-checked';
            }
            if (item.className) {
                itemClass += ' ' + item.className;
            }

            if (item.treeItemUniqueKey != undefined && item.treeItemUniqueKey == that.state.treeStore.getProp('focusItemKey')) {
                itemClass += ' tree-focus';
            }else  if (!that.props.showCheckBox&&item.checked) {
                itemClass += ' tree-focus';
            }

            var _toggleChildren = function (event) {
                event.stopPropagation();
                that._toggleChildren(item);
            };
            var _itemOnChange = function () {
                that._itemOnChange(item);
            };

            item.isParent = !!(item[that.props.childrenKey] && item[that.props.childrenKey] instanceof Array && item[that.props.childrenKey].length);

            t.push((
                <div key={'i' + key} style={{marginLeft: that.props.marginLeft}}>
                    <div
                        className={itemClass}
                        style={{top: item.checked ? 1 : 2}}
                        onMouseEnter={function(e){
                            that._onMouseEnter(e,item);
                          }}
                        onMouseLeave={function(e){
                            that._onMouseLeave(e,item);
                          }}
                        >
                        {item.isParent ? <i onClick={_toggleChildren}
                                            className={item.expand ? 'text-info expand  icon-minus2' : 'text-info expand  icon-plus2'}
                                            style={{fontSize: '14px'}}></i> : <i className='expand'></i>}
                        {that.props.showCheckBox ?
                            <CheckBox
                                key={'cb' + key}
                                value={item[that.props.displayValue]}//displayValue,displayKey
                                checked={item.checked}
                                className={item.className}
                                style={{display: 'inline-block', marginLeft: 2}}
                                onChange={_itemOnChange}>
                                {item[that.props.displayKey]}
                            </CheckBox>
                            :
                            <div className='tree-text-content' onClick={_itemOnChange}>
                                {/*item.isParent ? <i className={item.expand ? 'icon-folder-open' : 'icon-folder2'} style={{marginLeft: 2, marginRight: 1}}></i> : <i className='icon-file-empty2'></i>*/}
                                <span>{item[that.props.displayKey]}</span>
                            </div>}
              <span className='opera-container'>
                {that.props.showAddBtn(item) ?
                    <span
                        className='icon-add'
                        onClick={function(){
                        that._addChild(item);
                      }}
                        >
                  </span> : null}
                  {that.props.showEditBtn(item) ?
                      <span
                          className='icon-pencil5'
                          onClick={function(){
                        that._editItem(item);
                      }}
                          >
                  </span> : null}
                  {that.props.showDelBtn(item) ?
                      <span
                          className='icon-cross2'
                          onClick={function(){
                        that._delItem(item);
                      }}
                          >
                  </span> : null}

              </span>
                    </div>
                    {item.isParent ?
                        <TreeSelect
                            onChange={that._onChildrenChange}
                            showAddBtn={that.props.showAddBtn}
                            showDelBtn={that.props.showDelBtn}
                            showEditBtn={that.props.showEditBtn}
                            addChild={that.props.addChild}
                            delChild={that.props.delChild}
                            editChild={that.props.editChild}
                            data={item[that.props.childrenKey]}
                            realOnChange={typeof that.props.realOnChange == 'function'?that.props.realOnChange:that.props.onChange}
                            treeStore={that.state.treeStore}
                            linkage={that.props.linkage}
                            displayKey={that.props.displayKey}
                            displayValue={that.props.displayValue}
                            childrenKey={that.props.childrenKey}
                            marginLeft={that.props.marginLeft}
                            style={{display: item.expand ? 'block' : 'none'}}
                            showCheckBox={that.props.showCheckBox}/>
                        :
                        null}

                </div>
            ))
        });
        return t;
    },
    render: function () {
        var tree = this._createTree(this.state.data);
        return (
            <div className={classnames({'tree-select': true}, this.props.className)}
                 style={assign({}, this.props.style)}>
                {tree}
            </div>
        )
    }
});

module.exports = TreeSelect;
