var React = require('react')

var Table = require('radmin').Table

var Code = require('../Code')
var Document = require('../Document')

var Table1 = require('./Table1')
var Table2 = require('./Table2')

module.exports = React.createClass({
  _format: function () {
    return [{
      name: '深圳',
      desc: '深圳市，简称深，别称鹏城，是位于中华人民共和国广东省的都市，同时是副省级计划单列市、经济特区及国家综合配套改革试验区，1979年1月在原宝安县的基础上设立，为中国的证券资本市场中心、以及重要的国际经济中心。深圳全市均划入深圳经济特区范围。南边与香港接壤，北与惠州市、东莞市毗邻。'
    }, {
      name: '广州',
      desc: '广州市，简称穗，现有别称五羊仙城、羊城、穗城、穗垣、仙城、花城，为中华人民共和国广东省省会，中国超大城市及副省级城市，是继上海、北京之后的中国第三大城市、国家中心城市、也是中国华南地区的经济、文化、科技和教育中心及交通枢纽，是中国人民解放军南部战区联合作战指挥部所在地。'
    }]
  },

  render: function () {
    return (
      <div className='content'>
        <h6 className='content-group text-semibold'>表格 <small className='display-block'></small></h6>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标准表格</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Table data={this._format()} bordered style={{width: 500}}>
                      <Table.Column dataField='name'>
                        名字
                      </Table.Column>
                      <Table.Column dataField='desc'>
                        介绍
                      </Table.Column>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标准表格（后端分页）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Table1 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Table1.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='panel panel-flat'>
              <div className='panel-heading'>
                <h5 className='panel-title'>标准表格（前端分页）</h5>
              </div>
              <div className='panel-body'>
                <div className='form-group'>
                  <div>
                    <Table2 />
                  </div>
                  <Code>
                    {require('!raw-loader!./Table2.js')}
                  </Code>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <div className='panel'>
              <div className='panel-body'>
                <Document src='component/table.md' />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
})
