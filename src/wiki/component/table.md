# Table 表格组件

Radmin的表格组件可以为你传入的数据快速制作表格，并保证一定程度上的自定义。
完整的表格组件由Table(组件)、Column(组件)两个个子组件组成。

## Demo

[表格组件](http://radmin.qq.com/demo/index.html/#/table)

## 属性

**<Table>**

| 参数名            | 类型      | 默认值         | 描述  |
| :------          | :------  | :------       | :------------  |
| data             | array    | null          | 需要渲染的表格数组  |
| pagination       | object   | null          | 分页相关的属性和回调函数集合  |
| selectRow        | object   | null          | 控制表格第一列自带checkbox，以及选中的回调  |
| action           | array    | null          | 控制表格最后一列的操作按钮以及按钮点击事件 |

* 表格并不包含发送数据请求，数据需要通过data参数传入，并且在传入之前做好格式化的工作，传入的数据就是本次要渲染到表格的数据
* pagination需要的参数为
    - total(number)：数组总数，并不是表格data数据的总数，而是一共需要分页的数据总数，pagination会根据这个数量自动计算分页的数量
    - offset(number)：当前指针，表示当前分页应该显示到第几条数据上
    - limit(number)：当前页面总数，指每一页应该显示的数据数目
    - onPageChange(function)：用户点击某一页跳转时调用的回调函数，参数默认传入limit, offset
    - onPageLimitChange(function)：用户点击切换每一页显示数据数的回调函数，参数传入limit
* selectRow需要的参数为
    - onSelect(function)：选中某一栏的回调
    - onSelectAll(function)：全选当前所有数据的回调
* action的数组格式，按钮也可以通过在deta中自定义来实现，详见demo代码
    - content：显示到表格中的按钮，可以是文字也可以是自定义的jsx片段
    - action：点击按钮之后的回调

**<Column>**

| 参数名           | 类型    | 默认值        | 描述  |
| :------          | :------ | :------       | :------------  |
| dataField        | string  | null          | 属性字段  |
| isKey            | bool    | false         | 是否是主键  |
| display          | bool    | true          | 控制当前列是否在表格中显示出来  |
| minWidth         | number  | null          | 当前列最小宽度  |
| maxWidth         | number  | null          | 当前列最大宽度  |
| width            | number  | null          | 当前列固定宽度  |
| align            | string  | left          | 当前align属性('left','center', 'right')  |
| sort             | any     | false         | 是否排序，true或者回调函数function(dataField, sortDirection){}  |


* Column定义了需要显示出来的表格列，用dataField属性字段对应了table中data属性的一个字段
* 主键一般在表格中只存在一个，一般是数据的id，如果用户点击了某一行的选中或者查看详情等操作(action)，回调中默认传入该行主键字段所对应的值。如果未定义主键，则传入该行在data数组中的顺序号。




## 用例

```js
var Table = require('radmin').Table

<Table
    data={this._format()}
    pagination={{ total: this.state.total, limit: this.state.limit, offset: this.state.offset, onPageChange: this._changePage, onPageLimitChange: this._changePageLimit }}
    selectRow={{ enable: true,  onSelect: function (id, checked) { console.log(id, checked)} }}
    action={[ {content: (<span style={{marginRight: 10}}>编辑</span>), action: this._edit},
        {content: (<span>删除</span>), action: this._delete} ]}>
    <Table.Column
        dataField='item_id'
        isKey={true}
        align='right'
        display={false}
        sort={true}
        width={100}>
        ID
    </Table.Column>
    <Table.Column dataField='name' minWidth={100}>
        名称
    </Table.Column>
    <Table.Column dataField='description' minWidth={100}>
        描述
    </Table.Column>
    <Table.Column dataField='time' align='center' minWidth={100}>
        创建日期
    </Table.Column>
</Table>
```

