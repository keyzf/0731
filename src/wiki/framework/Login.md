# 登录相关功能介绍

Radmin框架提供了三种不同的登录方式：QQ登录（ptlogin）、OA登录、QQ互联登录（QC登录、适用于所有域名），仅需简单配置即可使用，节约了开发时间

## 登录配置

打开src/js/config/LoginConfig.js，配置如下：

```js
module.exports = {
  // 设置用户可使用的登录方式：'oa'代表oa登录，'qq'代表qq登录，both代表qq和oa两种方式任选，'qc'代表qq互联登录，不区分大小写
  loginMode: 'qq',

  /** 
   * 这是OA登录需要的配置，要改为自己项目对应的值
   * sysid在tof.oa.com上申请
   * 如使用框架自带的接口获取用户信息，则需要在tof上设置<允许的IP>加入以下内容：172.27.22.11, 10.198.143.178, 10.208.128.155, 172.27.208.21, 10.185.4.95, 10.219.146.107, 10.219.146.172, 10.219.146.174, 10.223.148.234
   * 使用自定义的获取用户信息（头像，昵称等）接口，可填入userInfoUrl，并在tof上设置<允许的IP>加入此url的服务器地址
   */
  oa: {
    appkey: '767ef78e03294ce0867e7d6879065910',
    sysid: '24330',
    userInfoUrl: ''
  },

  /**
   * 这是QQ登录需要的配置，要改为自己项目对应的值，请在pt.oa.com上申请
   * daid是申请的用于登录态隔离的参数，需要相关的CNAME或证书配置，详情请查阅pt.oa.com
   * 使用自定义的获取用户信息（头像，昵称等）接口，可填入userInfoUrl
   */
  qq: {
    appid: '1600000953',
    daid: '541',
    userInfoUrl: ''
  },

  /**
   * 这是QQ互联登录（非QQ等域名）需要的配置，要改为自己项目对应的值
   * 这两个值在QQ互联官网http://connect.qq.com/申请
   */
  qc: {
    appid: '101317089',
    redirecturi: 'http://qq.com'
  },

  // 是否采用跳转到notlogin页面的方式，配合loginFilter使用
  redirectNotLoginPage: false
}
```

## 登录实现

登录模块的界面部分位于src/js/layout/default/Login.js，
数据请求位于src/js/actions/LoginAction.js，
数据存储位于src/js/stores/LoginStore.js，

如果对登录有特殊需求可自行修改
