var React = require('react')
var clone = require('clone')

var Utils = require('radmin').Utils
var Table = require('radmin').Table

var UiConfig = require('../../../config/UiConfig')
var StoreConfig = require('../../../config/StoreConfig')
var AjaxDemoAction = require('../../../actions/AjaxDemoAction')
var AjaxDemoStore = require('../../../stores/AjaxDemoStore')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      itemListDataAll: null, // 前端分页的列表数据，一次请求将列表数据全部返回

      limit: UiConfig.pageLimit,
      offset: 0,
      total: 0
    }
  },
  componentDidMount: function () {
    AjaxDemoStore.addChangeListener(this._update)

    this._getTableStatic()
  },
  componentWillUnmount: function () {
    AjaxDemoStore.removeChangeListener(this._update)
  },
  _update: function () {
    var dataAll = AjaxDemoStore.getData(StoreConfig.STORE_TABLE_STATIC_DATA)
    this.state.itemListDataAll = dataAll ? dataAll.list : null
    this.state.total = dataAll ? dataAll.list.length : 0
    this.forceUpdate()
  },
  _getTableStatic: function () {
    AjaxDemoAction.getTableStatic()
  },
  _edit: function (item_id) {
    Utils.prompt({
      text: '编辑' + item_id
    })
  },
  _delete: function (item_id) {
    Utils.confirm({
      text: '是否删除' + item_id + '？',
      onConfirm: function () {}
    })
  },
  _format: function () {
    var that = this

    var data = clone(this.state.itemListDataAll)

    if (data instanceof Array) {
      data = data.slice(this.state.limit * this.state.offset, this.state.limit * (this.state.offset + 1))
      data = data.map(function (obj) {
        // 自定义表格内容可按如下方式处理
        // obj.zzjgdmz = (<img src={obj.zzjgdmz}></img>)

        var _edit = function () {
          that._edit(obj.item_id)
        }

        var _delete = function () {
          that._delete(obj.item_id)
        }

        obj.operationsEle = (
          <div>
            <div style={{ display: 'inline-block' }}>
              <span onClick={_edit} style={{ color: '#5093e1', cursor: 'pointer'}}>编辑</span>
            </div>
            <div style={{ display: 'inline-block' }}>
              <span onClick={_delete} style={{ color: '#5093e1', cursor: 'pointer', marginLeft: 10}}>删除</span>
            </div>
          </div>
        )
        return obj
      })
    }
    return data
  },
  _changePage: function (limit, offset) {
    this.state.limit = limit
    this.state.offset = offset
    this.forceUpdate()
  },
  _changePageLimit: function (limit) {
    UiConfig.pageLimit = limit
    this.state.limit = limit
    this.state.offset = 0
    this.forceUpdate()
  },
  _sortCallback: function(value, order) {
    console.info(value + '-' + order)
  },
  render: function () {
    return (
      <Table
        bordered
        data={this._format()}
        pagination={{ total: this.state.total, limit: this.state.limit, offset: this.state.offset, onPageChange: this._changePage, onPageLimitChange: this._changePageLimit }}
        selectRow={{ enable: true,  onSelect: function (id, checked) { console.log(id, checked)} }}
        action={[ {content: (<span style={{marginRight: 10}}>编辑</span>), action: this._edit}, {content: (<span>删除</span>), action: this._delete} ]}>
        <Table.Column
          dataField='item_id'
          isKey={true}
          display={true}
          sort={this._sortCallback}
          style={{width: 100, textAlign: 'right'}}>
          <div style={{textAlign: 'right'}}>ID</div>
        </Table.Column>
        <Table.Column dataField='name' sort={true} style={{minWidth: 100}}>
          名称
        </Table.Column>
        <Table.Column dataField='description' style={{minWidth: 100}}>
          描述
        </Table.Column>
        <Table.Column dataField='time' style={{textAlign: 'center'}}>
          创建日期
        </Table.Column>
      </Table>
    )
  }
})
