var React = require('react');

var ImageCreator = require('radmin').ImageCreator;

module.exports = React.createClass({
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
    render: function () {
        return (
            <div className="">
                <ImageCreator
                    url={'/img/user.png'}
                    />
                <ImageCreator
                    name={'张志富'}
                    picLevel={'l'}
                    color={'#b9cdef'}
                    />
                <ImageCreator
                    name={'zeezhang'}
                    picLevel={'m'}
                    />
                <ImageCreator
                    name={'微保'}
                    picLevel={'s'}
                    />
                <ImageCreator
                    name={'前端开发'}
                    picLevel={'ss'}
                    />
            </div>
        )
    }
});