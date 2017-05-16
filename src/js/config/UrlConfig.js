var base = (typeof window != 'undefined' && window.location.host == 'radmin.qq.com') ? '/project' : ''

module.exports = {
  serverUrl: typeof window != 'undefined' ? 'http://' + window.location.host + '/' : '',

  getInfo: base + '/mock/getInfo.json',
  setInfo: base + '/mock/setInfo.json',
  getMenu: base + '/mock/getMenu.json',
  getTable: base + '/mock/getTable.json',
  getForm: base + '/mock/getForm.json',
  saveForm: base + '/mock/saveForm.json',

  // 上面是假数据使用方式，正常的后端接口不需要加base，直接写为
  // getInfo: '/xxx/getInfo'
  QqCom: 'http://qq.com'
}
