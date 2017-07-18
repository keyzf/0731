// 配置导航菜单
var React = require('react')

module.exports = [{
  text: 'Radmin概述',
  alias: 'index',
  url: ['/'],
  iconClassName: 'icon-home2'
}, {
  text: '基础组件',
  alias: 'index',
  url: ['/component'],
  iconClassName: 'icon-puzzle3',
  value: [
    {
      text: '按钮 BUTTON',
      alias: 'component-button',
      url: ['/component/button', '/component']
    }, {
      text: '输入框 INPUT',
      alias: 'component-input',
      url: '/component/input'
    }, {
      text: '下拉框 SELECT',
      alias: 'component-select',
      url: '/component/select'
    }, {
      text: '单选框 RADIO',
      alias: 'component-radio',
      url: '/component/radio'
    }, {
      text: '复选框 CHECKBOX',
      alias: 'component-checkbox',
      url: '/component/checkbox'
    }, {
      text: '开关 SWITCH',
      alias: 'component-switch',
      url: '/component/switch'
    }, {
      text: '滑动条 SLIDER',
      alias: 'component-slider',
      url: '/component/slider'
    }, {
      text: '表单 FORM',
      alias: 'component-form',
      url: '/component/form'
    }, {
      text: '表格 TABLE',
      alias: 'component-table',
      url: '/component/table'
    }, {
      text: '悬浮提示 PROMPT',
      alias: 'component-prompt',
      url: '/component/prompt'
    }, {
      text: '气泡提示 TOOLTIP',
      alias: 'component-tooltip',
      url: '/component/tooltip'
    }
  ]
}, {
  text: '高级组件',
  alias: 'index',
  url: ['/component'],
  iconClassName: 'icon-puzzle3',
  value: [
    {
      text: '弹窗 MODAL',
      alias: 'component-modal',
      url: '/component/modal'
    }, {
      text: '日期选择 DATEPICKER',
      alias: 'component-datepicker',
      url: '/component/datepicker'
    }, {
      text: '点击复制 CLIPBOARD',
      alias: 'component-clipboard',
      url: '/component/clipboard'
    }, {
      text: '页签 TABS',
      alias: 'component-tabs',
      url: '/component/tabs'
    }, {
      text: '标签 TAGS',
      alias: 'component-tags',
      url: '/component/tags'
    }, {
      text: '树型选择器 TREESELECT',
      alias: 'component-treeselect',
      url: '/component/treeselect'
    }, {
      text: '导航 NAVIGATOR',
      alias: 'component-navigator',
      url: ['/component/navigator', '/component/navigator/2', '/component/navigator/3']
    }, {
      text: '轮播 SWIPER',
      alias: 'component-swiper',
      url: '/component/swiper'
    }, {
      text: '加载中 SPIN',
      alias: 'component-spin',
      url: '/component/spin'
    }, {
      text: '字体图标 ICONFONT',
      alias: 'component-iconfont',
      url: '/component/iconfont'
    }, {
      text: '验证码 VERIFICATIONCODE',
      alias: 'component-verificationcode',
      url: '/component/verificationcode'
    }, {
      text: '筛选表单 FilterRender',
      alias: 'component-filterrender',
      url: '/component/filterrender'
    } , {
          text: '树形下拉 pullDownTree',
          alias: 'component-pullDownTree',
          url: '/component/pullDownTree'
      }, {
          text: '两列选择 Transfer',
          alias: 'component-filterrender',
          url: '/component/transfer'
      }
  ]
}, {
  text: '扩展组件',
  alias: 'index',
  url: ['/component'],
  iconClassName: 'icon-puzzle3',
  value: [
    {
      text: '图表 CHART',
      alias: 'component-chart',
      url: '/component/chart'
    }, {
      text: '富文本编辑器 RICHEDITOR',
      alias: 'component-richeditor',
      url: '/component/richeditor'
    }
  ]
}, {
    text: '功能实例',
    alias: 'func',
    url: '/func',
    iconClassName: 'icon-steam2',
    value: [{
      text: '发送请求',
      alias: 'func-ajax',
      url: ['/func/ajax', '/func']
    }, {
      text: '多种登录',
      alias: 'func-login',
      url: '/func/login'
    }, {
      text: 'URL参数传递',
      alias: 'func-param',
      url: ['/func/param', '/func/param/:p1', '/func/param/:p1/:p2']
    }, {
      text: '布局切换',
      alias: 'func-layout',
      url: ['/func/layout', '/func/layout-new']
    }, {
      text: '组件样式修改',
      alias: 'func-style',
      url: '/func/style',
    }, {
      text: '多页面入口',
      alias: 'func-multipage',
      url: '/func/multipage',
    }, {
      text: '路由方式选择',
      alias: 'func-route',
      url: '/func/route',
    }, {
      text: '过滤器',
      alias: 'func-filter',
      url: '/func/filter',
    }, {
      text: '小工具',
      alias: 'func-tool',
      url: '/func/tool',
    }, {
      text: '一些新改动Demo',
      alias: 'func-tabTest',
      url: '/func/tabTest',
    }]
  }
]
