var React = require('react')

var Utils = require('radmin').Utils
var Tabs = require('radmin').Tabs

module.exports = React.createClass({
  getInitialState() {
    return{
      tabs: [
        'Tab1',
        'Tab2',
        'Tab3',
        'Tab4'
      ]
    }
  },
  _onAdd: function(){
    Utils.prompt('add')
    this.state.tabs.push('Tabs'+ (this.state.tabs.length+1))
    this.forceUpdate()
  },
  _onDelete: function(index){
    Utils.prompt('delete ' + index)
    this.state.tabs.splice(index, 1)
    this.forceUpdate()
  },
  _onChange: function (index) {
    Utils.prompt('标签' + index)
  },
  render: function () {
    return (
      <div>
        <button 
          style={{marginBottom: '10px'}}
          type='button' 
          className='btn btn-primary'
          onClick={this._onAdd}
          >
          新增页签
        </button>
        <Tabs 
          onChange={this._onChange}
          onDelete={this._onDelete}
          >
          {
            this.state.tabs.map(function(tab, index){
              return(
                <Tabs.Tab 
                  key={index} 
                  name={tab} 
                  style={{ minWidth: 100 }}
                  >
                  Content of {tab}
                </Tabs.Tab>
              )
            })
          }
        </Tabs>
      </div>
      
    )
  }
})
