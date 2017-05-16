var React = require('react')

var Utils = require('radmin').Utils
var StoreConfig = require('../../config/StoreConfig')
var ProjectAction = require('../../actions/ProjectAction')
var ProjectStore = require('../../stores/ProjectStore')
var CurrentAction = require('../../actions/CurrentAction')
var CurrentStore = require('../../stores/CurrentStore')

var Title = React.createClass({
  getDefaultProps: function () {
    return {
      hideProject: false
    }
  },
  getInitialState: function () {
    return {
      // projectAll: null,
      name: null
    }
  },
  componentWillMount: function () {
    var project_info = CurrentStore.getData(StoreConfig.STORE_CURRENT_PROJECT_DATA)
    if (typeof project_info != 'undefined' && project_info != null && project_info != '') {
      this.state.name = project_info.project_name.toString()
    } else {
      project_info = JSON.parse(Utils.CommonUtil.cookie('tae_project_info'))
      if (project_info) {
        this.state.name = project_info.project_name
        CurrentAction.setCurrentProject(project_info.project_id, project_info.project_name)
      }
    }
  },
  componentDidMount: function () {
    ProjectStore.addChangeListener(this._update)

    ProjectAction.listAll()
  },
  componentWillUnmount: function () {
    ProjectStore.removeChangeListener(this._update)
  },
  componentWillReceiveProps: function () {
    var project_info = CurrentStore.getData(StoreConfig.STORE_CURRENT_PROJECT_DATA)
    if (typeof project_info != 'undefined' && project_info != null && project_info != '') {
      this.state.name = project_info.project_name.toString()
    } else {
      project_info = JSON.parse(Utils.CommonUtil.cookie('tae_project_info'))
      if (project_info) {
        this.state.name = project_info.project_name
        CurrentAction.setCurrentProject(project_info.project_id, project_info.project_name)
      }
    }
  },
  _update: function () {
    var projectAll = ProjectStore.getData(StoreConfig.STORE_PROJECT_LIST_ALL_DATA)
    this.state.options = projectAll ? projectAll.items : null

    this.state.options.map(function (obj) {
      obj.value = obj.id
      return obj
    })

    this.forceUpdate()
  },
  _selectChange: function (value) {
    this.setState({
      selectValue: value
    })

    this.state.options.map(function (item) {
      if (item.value === value) {
        CurrentAction.setCurrentProject(item.id, item.name)
      }
    })
  },
  render: function () {
    var that = this

    return (
      <a className='navbar-brand'>
        {this.state.name}
      </a>
    )
  }
})

module.exports = Title
