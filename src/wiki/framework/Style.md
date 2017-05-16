# 样式的使用及修改

Radmin在造了几次轮子之后，采用了Bootstrap CSS作为默认主题样式（为了更加美观使用了LimitLess样式扩展，并且部分组件是模仿此样式开发（因为刚好没有现成的- -）），同时也支持对样式的自定义。
也许你可以从官网[http://getbootstrap.com/css/](http://getbootstrap.com/css/)得到特别全面的了解，但也许又过于复杂。
那就不要在官网浪费时间哟，直接往下读文档

## 目录结构
我们来了解一下src/less目录下的代码结构：

```
less
├── core               # 核心参数文件夹，包括基础变量等，用于修改基础样式
    ├── bootstrap      # bootstrap的基础变量，改变样式修改这里
    ├── addition       # bootstrap的扩展变量，改变样式修改这里
    ├── colors         # 基本颜色定义
    ├── mixins         # 滚动条样式和函数
├── layout             # 布局样式文件夹
├── pages              # 页面样式文件夹
├── variables.less     # 所有变量
├── layout.less        # 所有布局
├── pages.less         # 所有页面
└── index.less         # index
```

## 如何增加布局和页面的样式

* 以页面src/js/pages/module/index.less为例（一般一个功能模块的页面放在同一个文件夹下，这里叫做module），其render函数如下：

```js
render: function() {
  return <div className="my-page">内容</div>
}
```

* 在src/less/pages加入此模块对应的less文件module.less，语法使用less或css均可（less兼容css）：

```css
.my-page {
    color: #0000ff;
}
```

* 打开src/less/pages.less中，加入module.less

```css
@import "pages/module.less";
```

* 执行npm start（或者加sudo）

## 最常用的组件样式修改方法

即便直接使用Radmin提供的组件，也免不了对样式进行微调，例如宽高等，最常用的方法是在render（jsx）中直接修改组件的样式，以Select组件为例

```js
render: function () {
  return (
    <Select style={{width:200}} className='my-select' name='请选择' onChange={this._onChange} options={[{ name: '苹果', value: '0' }, { name: '梨子', value: '1' }, { name: '香蕉', value: '2' }]} />
  )
}
```

直接添加style或者像之前的例子中使用className都可

## 通过less变量修改组件样式

Radmin组件的样式采用less编写，定义了常用参数变量如颜色等，在项目编译时才生成组件样式的CSS，因此易于修改。
Radmin已经将所需的变量放置于project的less文件夹下，直接修改编译即可。
这里以修改弹出框背景色为例：

* 打开less/core/bootstrap/variables.less(修改的变量都集中在bootstrap和addition文件夹里面)，找到@modal-content-bg变量，将其值由#fff改为#0000ff

* 打开Alert组件（直接使用Demo或者自行创建一个实例）看背景色是否发生变化

## 以覆盖的方式修改组件样式

对于自行设计的样式而言，单纯通过修改变量的方式可能无法达到要求。这时，我们可以选择覆盖这个组件的样式。以方法如下：

* 打开最外层的依赖包文件夹node_modules，打开radmin/less/components/，找到需要修改的组件样式xxx.less并将其复制到项目文件夹src/less/components下
，以便覆盖默认的样式

* 打开src/less/components.less中，加入xxx.less

```css
@import "components/xxx.less";
```

## 第三方组件与自行开发组件

当Radmin提供的组件不能满足需求时，也可以采用第三方组件或自行开发组件。无论采用哪种方式，样式的处理都可以参照前面的几种做法