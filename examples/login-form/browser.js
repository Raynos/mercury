'use strict';

var hg = require('../../index');
var h = require('../../index').h;
var LoginComponent = require('./login-component.js');
var document = require('global/document');

function App() {
    var state = hg.state({
        message: hg.value(''),
        loginDone: hg.value(false),
        loginComponent: LoginComponent()
    });

    LoginComponent.onSuccess(state.loginComponent, onSuccess);

    return state;

    function onSuccess(opts) {
        state.loginDone.set(true);

        if (opts.type === 'login') {
            state.message.set('Congrats login' +
                'user: ' + opts.user.email + ' password: ' +
                opts.user.password);
        } else if (opts.type === 'register') {
            state.message.set('Congrats register' +
                'user: ' + opts.user.email + ' password: ' +
                opts.user.password);
        }
    }
}

App.render = function render(state) {
    return h('div', [
        state.loginDone ?
            h('div', state.message) :
            LoginComponent.render(state.loginComponent)
    ]);
};

hg.app(document.body, App(), App.render);
