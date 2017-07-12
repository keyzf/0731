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
      itemListData: null, // 后端分页的列表数据，不同页的请求返回内容会不同

      limit: UiConfig.pageLimit,
      offset: 0,
      total: 0
    }
  },
  componentDidMount: function () {
    AjaxDemoStore.addChangeListener(this._update)

    this._getTableAjax()
  },
  componentWillUnmount: function () {
    AjaxDemoStore.removeChangeListener(this._update)
  },
  _update: function () {
    var data = AjaxDemoStore.getData(StoreConfig.STORE_TABLE_AJAX_DATA)
    this.state.itemListData = data ? data.list : null
    this.state.total = data.count

    this.forceUpdate()
  },
  _getTableAjax: function () {
    AjaxDemoAction.getTableAjax(this.state.limit, this.state.limit * this.state.offset)
  },
  _edit: function (item_id) {
    Utils.prompt({
      text: '编辑' + item_id
    })
  },
  _delete: function (item_id) {
    Utils.confirm({
      text: '是否删除' + item_id +'？',
      onConfirm: function () {}
    })
  },

  _changePage: function (limit, offset) {
    this.state.limit = limit
    this.state.offset = offset
    this._getTableAjax()
  },
  _changePageLimit: function (limit) {
    UiConfig.pageLimit = limit

    this.state.limit = limit
    this.state.offset = 0
    this._getTableAjax()
  },
  _format: function () {
    var that = this

    var data = clone(this.state.itemListData)
    if (data instanceof Array) {
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
  render: function () {
    return (
      <Table data={this._format()} scroll={{x: 1500}} selectRow={{ enable: true, onSelect: function (id, checked) { console.log(id, checked)} }} bordered pagination={{ total: this.state.total, limit: this.state.limit, offset: this.state.offset, onPageChange: this._changePage, onPageLimitChange: this._changePageLimit}}>
          {/*<Table.Column
          dataField='item_id'
          isKey={true}
          display={false}
          sort={true}
          style={{minWidth: 100, textAlign: 'right'}}
          >
          ID
        </Table.Column>*/}
        <Table.Column dataField='name' style={{minWidth: 10}}>
          名称
        </Table.Column>
        <Table.Column dataField='description' style={{minWidth: 100}}>
          描述
        </Table.Column>
        <Table.Column dataField='time' style={{minWidth: 100, textAlign: 'center'}}>
          创建日期
        </Table.Column>
        <Table.Column dataField='operationsEle' style={{width: 100, textAlign: 'center'}}>
          操作
        </Table.Column>
      </Table>
    )
  }
})
