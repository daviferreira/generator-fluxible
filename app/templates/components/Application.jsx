'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible').StoreMixin;

var Application = React.createClass({
    propTypes: {
        context: React.PropTypes.object.isRequired
    },
    mixins: [RouterMixin, StoreMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        var appStore = this.getStore(ApplicationStore);
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            route: appStore.getCurrentRoute(),
            pages: appStore.getPages()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    render: function () {
        var output = '';
        switch (this.state.currentPageName) {
            case 'home':
                output = <Home/>;
                break;
            case 'about':
                output = <About/>;
                break;
        }
        return (
            <div>
                <Nav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
                {output}
            </div>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        var newState = this.state;
        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }
        document.title = newState.pageTitle;
    }
});

module.exports = Application;