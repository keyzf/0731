var React = require('react');
var PullDownTree = require('radmin').PullDownTree;
var RaForm = require('radmin').Form;

module.exports = React.createClass({
    propTypes: {},
    getInitialState: function () {
        return {}
    },

    getDefaultProps: function () {
        return {};
    },

    componentWillMount: function () {

    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    componentWillReceiveProps: function (nextProps) {

    },

    _getData: function() {
        return [{
            name: '全部',
            value: '1',
            checked: false,
            expand: true,
            children: [{
                name: '第一级元素1',
                value: 'i-1',
                checked: false,
                children: [{
                    name: '第二级元素1-1',
                    value: 'i-1-1'
                }, {
                    name: '第二级元素1-2',
                    value: 'i-1-2'
                }, {
                    name: '第二级元素1-3',
                    value: 'i-1-3'
                }]
            }, {
                name: '第一级元素2',
                value: 'i-2',
                checked: false,
                children: [{
                    name: '第二级元素2-1',
                    value: 'i-2-1'
                }, {
                    name: '第二级元素2-2',
                    value: 'i-2-2',
                    expand: true,
                    children: [{
                        name: '第二级元素2-2-1',
                        value: 'i-2-2-1'
                    }, {
                        name: '第二级元素2-2-2',
                        value: 'i-2-2-2'
                    }, {
                        name: '第二级元素2-2-3',
                        value: 'i-2-2-3',
                        checked: false
                    }]
                }]
            }, {
                name: '第一级元素3',
                value: 'i-3',
                checked: false
            }, {
                name: '第一级元素4',
                value: 'i-4',
                checked: false,
                children: [{
                    name: '第二级元素4-1',
                    value: 'i-4-1',
                    checked: true
                }, {
                    name: '第二级元素4-2',
                    value: 'i-4-2',
                    checked: false
                }, {
                    name: '第二级元素4-3',
                    value: 'i-4-3',
                    checked: false
                }]
            }]
        }]
    },

    render: function () {
        return (
            <div className="content">
                <RaForm
                    vertical={false}
                    labelCol={2}
                    contentCol={9}
                    ref='saveForm'
                    onSubmit={this._save}
                    >
                    <RaForm.Field
                        label='账户'
                        >
                        <RaForm.FormInput
                            valuePath={'staffEname'}
                            maxLength={20}
                            />
                    </RaForm.Field>
                    <RaForm.Field
                        label='机构'
                        >
                        <PullDownTree
                            data={this._getData()}
                            linkage={false}
                            />
                    </RaForm.Field>
                    <RaForm.Field
                        label='姓名'
                        >
                        <RaForm.FormInput
                            valuePath={'staffEname'}
                            maxLength={20}
                            />
                    </RaForm.Field>
                </RaForm>
            </div>
        )
    }
});