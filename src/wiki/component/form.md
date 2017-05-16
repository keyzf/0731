# Form 表单组件

Radmin的表单组件集合了数据双向绑定，数据校验，表单样式等功能，也可以和弹窗组件结合使用。
完整的Form组件由Form(组件)、Field(组件)，FileInput(组件)，Util(工具)四个子组件组成。

## Demo

[表单组件](http://radmin.qq.com/demo/index.html/#/form)

## 属性

**<Form>**

| 参数名            | 类型      | 默认值         | 描述  |
| :------          | :------  | :------       | :------------  |
| labelCol         | number   | 2             | 左边标签栏文字宽度  |
| contentCol       | number   | 10            | 右边输入框宽度  |
| vertical         | bool     | false         | 是否水平布局还是垂直布局  |
| onSubmit         | function | null          | 表单提交回调 |
| onCancel         | function | null          | 表单取消回调  |

* 因为需要符合栅格化布局的样式，labelCol 和 contentCol 之和需要小于12，一般是2:10或者4:8
* 如果需要自定义表单提交按钮，需要以下两步
    - 在form组件上添加ref属性，取一个id值
    - 在按钮onClick事件中调用this.refs.formid.submit()来实现，提交前会自动根据配置的规则校验数据，用法参考demo的实现
    - ref的用法参见[这里](https://facebook.github.io/react/docs/refs-and-the-dom.html)

**<Field>**

| 参数名           | 类型    | 默认值        | 描述  |
| :------          | :------ | :------       | :------------  |
| label            | string  | null          | 标签栏显示的文字  |
| desc             | string  | null          | 备注的文字  |
| validation       | object  | null          | 数据校验数据提示  |

**Util**

将input数据和state.info.name状态绑定，输入值改变就改变状态

```js
Util.linkState(this, 'info.name') 
```


带文件数据数据提交

```js
Util.submitDataWithFile({
    url: '/default/default',        //接口url
    files: self.state.files,        //文件字段
    data: {                         //数据字段
        name: self.state.name,
        psw: self.state.psw
    },
    onSuccess: function (response) {//成功回调
        alert('数据提交成功')
    }
})
```



## 用例

```js
var Form = require('radmin').Form
var FormField = Form.Field
var FormInput = Form.FileInput
var FormUtil = Form.Util

<Form
    vertical={true}
    onSubmit={function(){
        Utils.prompt('带验证表单提交成功')
    }}
    onCancel={function(){
        Utils.prompt('带验证表单取消')
    }}
    ref='form4'>
    <FormField label={<span className="required-star">用户名：</span>} validation={[{ type: 'required', message: '用户名不能为空', value: this.state.name }]}>
    <input
        type='text'
        value={this.state.name || ''}
        onChange={Form.Util.linkState(this, 'name')}
        className='form-control' />
    </FormField>
    <FormField label={<span className="required-star">密码：</span>} desc='密码是至少6位的数字和字母' validation={[{ type: 'minlength', params: 6, message: '密码是至少6位的数字和字母', value: this.state.psw }]}>
    <input
        type='password'
        value={this.state.psw || ''}
        onChange={Form.Util.linkState(this, 'psw')}
        className='form-control' />
    </FormField>
    <FormField className='text-right' contentCol={12}>
    <button className='btn btn-default' onClick={function(){this.refs.form4.cancel()}.bind(this)} style={{marginRight: 10}}>
        取消
    </button>
    <button className='btn btn-primary' onClick={function(){this.refs.form4.submit()}.bind(this)}>
        提交
    </button>
    </FormField>
</Form>
```

