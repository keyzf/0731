var React = require('react')

var RaImage = require('radmin').Image
var Utils = require('radmin').Utils
var LoginUtil = require('radmin').Utils.LoginUtil

var StoreConfig = require('../../config/StoreConfig')
var LoginAction = require('../../actions/LoginAction')
var LoginStore = require('../../stores/LoginStore')

var Login = React.createClass({
  getInitialState: function () {
    return {
      loginInfo: null
    }
  },
  componentDidMount: function () {
    LoginStore.addChangeListener(this._update)

    this._getLoginData()
  },
  componentWillUnmount: function () {
    LoginStore.removeChangeListener(this._update)
  },
  _getLoginData: function () {
    switch (LoginUtil.getLoginMode()) {
      case 'oa':
        if (LoginUtil.isOALogin()) {
          if (!LoginStore.getData(StoreConfig.STORE_LOGIN_DATA)) {
            LoginAction.getLoginData()
          } else {
            this._update()
          }
        }
        break
      case 'qq':
        if (LoginUtil.isQQLogin()) {
          if (!LoginStore.getData(StoreConfig.STORE_LOGIN_DATA)) {
            LoginAction.getLoginData()
          } else {
            this._update()
          }
        }
        break
      case 'qc':
        if (LoginUtil.isQCLogin()) {
          if (!LoginStore.getData(StoreConfig.STORE_LOGIN_DATA)) {
            LoginAction.getLoginData()
          } else {
            this._update()
          }
        }
        break
      default:
        // 默认显示两种登录方式供选择
        if (LoginUtil.isOALogin()) {
          if (!LoginStore.getData(StoreConfig.STORE_LOGIN_DATA)) {
            LoginAction.getLoginData()
          } else {
            this._update()
          }
        } else if (LoginUtil.isQQLogin()) {
          if (!LoginStore.getData(StoreConfig.STORE_LOGIN_DATA)) {
            LoginAction.getLoginData()
          } else {
            this._update()
          }
        }
        break
    }
  },
  _update: function () {
    var data = LoginStore.getData(StoreConfig.STORE_LOGIN_DATA)
    if (data != null) {
      if (data.mode === 'oa') {
        this.setState({loginInfo: {name: data.data.ChineseName, head: 'http://passport.oa.com/modules/passport/userimage.ashx?user=' + data.data.LoginName}})
      } else if (data.mode === 'qq') {
        this.setState({loginInfo: {name: data.data.nickname, head: data.data.head}})
      }
      else if (data.mode === 'qc') {
        this.setState({loginInfo: {name: data.data.nickname, head: data.data.figureurl_qq_2}})
      }
    }
  },
  _logout: function () {
    var that = this
    LoginAction.logout(function () {
      that.setState({loginInfo: null})

      Utils.alert({
        text: '登出成功',
        onConfirm: function () {
          window.location.reload()
        }
      })
    })
  },
  _login: function () {
    LoginAction.login()
  },
  render: function () {
    return (
      <ul className="nav navbar-nav navbar-right hidden-xs">
        <li>
          <div className='login-div'>
            {this.state.loginInfo ?
              <div className='user-info-div'>
                <div className='user-info'>
                  <img src={this.state.loginInfo.head} />
                  <div className='name'>
                    {this.state.loginInfo.name}
                  </div>
                  <div className='logout-button' onClick={this._logout}>
                    退出
                  </div>
                </div>
              </div>
              :
              <div className='login-button-div'>
                <div className='login-button' onClick={this._login}></div>
              </div>}
          </div>
        </li>
      </ul>
    )
  }
})

module.exports = Login
