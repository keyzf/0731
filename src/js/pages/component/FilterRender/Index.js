var React = require('react')
var Utils = require('radmin').Utils
var FilterRender = Utils.FilterRender
module.exports = React.createClass({
    getInitialState: function () {
        return {
          filterData:{
              v1:'',
              v2:'',
              v3:'',
              v4:'',
              v5:'',
              v6:'',
              v7:'',
              v8:'',
              v9:'',
          }
        }
    },
  _onFilterChange: function () {
    console.log(arguments);
  },

  _getFilterData: function () {
    var options = [{
      name: '苹果', value: 'apple'
    }, {
      name: 'Pixel', value: 'pixel'
    }]

    return [{
      type: 'input', name: 'name1', label: '名称1',defaultValue:this.stata.filterData.v1
    }, {
      type: 'input', name: 'name2', label: '名称2',defaultValue:this.stata.filterData.v2
    }, {
      type: 'input', name: 'name3', label: '很长很长的名称怎么办',defaultValue:this.stata.filterData.v3
    }, {
      type: 'select', name: 'select1', label: '下拉框2', options: options, searchable: true, multiselect: true,defaultValue:this.stata.filterData.v4
    }, {
      type: 'datePicker', name: 'date1', label: '时间1',defaultValue:this.stata.filterData.v5
    }, {
      type: 'input', name: 'name4', label: '名称4',defaultValue:this.stata.filterData.v6
    }, {
      type: 'input', name: 'name6', label: '很长很长的名称怎么办',defaultValue:this.stata.filterData.v7
    }, {
      type: 'select', name: 'select2', label: '下拉框2', options: options, searchable: true, multiselect: true,defaultValue:this.stata.filterData.v8
    }, {
      type: 'datePicker', name: 'date2', label: '时间2',defaultValue:this.stata.filterData.v9
    }]
  },
    resetFilter:function(){
        this.setState()
    },

  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>FilterRender <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>FilterRender</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <FilterRender filterData={this._getFilterData()} onFilterChange={this._onFilterChange}></FilterRender>
                  </div>
                </div>
              </div>
            </div>
            <div>
                <input className='btn bg-blue' type='button' value='重置' onClick={this.resetFilter}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
