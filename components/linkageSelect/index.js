/**
 * 联动下拉组件
 * @author zee
 * @date 2017-03-21
 * */
var React = require('react');
var Select = require('../select');
var Clone = require('clone');

var Utils = require('../utils');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      linkageId: Utils.CommonUtil.getRandomId(),
      oneItemStyle: {

      },
      linkAgeConfig: [],
    }
  },

  getDefaultProps: function () {
    return {
      data: [],
      displayKey: 'name',
      displayValue: 'value',
      level: 3,
      marginRight: 10,
      linkAgeConfig: [
        {
          defaultText: 's1',
          data: [],
          callFn: function (itemData) {

          }
        },
        {
          defaultText: 's2',
          data: [],
          callFn: function (itemData) {

          }
        },
        {
          defaultText: 's3',
          data: [],
          callFn: function (itemData) {

          }
        },
      ]
    };
  },

  componentWillMount: function () {
    this.state.linkAgeConfig = this.props.linkAgeConfig;

    this.setState({
      linkAgeConfig: this.state.linkAgeConfig
    }, function () {
      var oneItemStyle = Clone(this.state.oneItemStyle),
        oneWith = 'calc((100% - ' + (this.state.linkAgeConfig.length - 1) * this.props.marginRight + 'px)/' + this.state.linkAgeConfig.length + ')';
      oneItemStyle.width = oneWith;
      this.setState({
        oneItemStyle: oneItemStyle
      });
    });

  },



  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  componentWillReceiveProps: function (nextProps) {
    //if(nextProps.data.length != this.props.data.length){
    this.props = nextProps;
    this.componentWillMount();
    // }
  },

  _renderSelect: function () {
    var self = this,
      linkAgeConfig = this.state.linkAgeConfig;
    return (
      <div>
        {linkAgeConfig.map(function (selectItemConfig, configIndex) {
          return (
            <div className='linkage-item' key={self.state.linkageId + configIndex} style={self.state.oneItemStyle} >
              <Select
                searchable={selectItemConfig.searchable}
                valuePath={selectItemConfig.name}
                defaultValue={selectItemConfig.defaultValue}
                renderOption={selectItemConfig.renderOption}
                displayKey={self.props.displayKey}
                displayValue={self.props.displayValue}
                onUpdate={selectItemConfig.onUpdate}
                onChange={function (selected, selectData, valuePath) {
                  if (configIndex < linkAgeConfig.length - 1) {
                    if (selectData && selectData.children&& selectData.children.length) {
                      linkAgeConfig[configIndex + 1].data = selectData.children;
                      //linkAgeConfig[configIndex + 1].defaultValue = selectData.children[0][self.props.displayValue];
                    } else {
                      linkAgeConfig[configIndex + 1].data = [];
                    }

                  }
                  self.forceUpdate();
                  typeof selectItemConfig.onChange == 'function' && selectItemConfig.onChange(selectData, valuePath);
                }}
                name={selectItemConfig.defaultText}
                options={self.state.linkAgeConfig[configIndex].data}
              />
            </div>

          )
        })}
      </div>

    )
  },

  render: function () {
    return (
      <div className="linkage-select" ref='linkageSelectContainer'>
        {this._renderSelect()}
      </div>
    )
  }
});