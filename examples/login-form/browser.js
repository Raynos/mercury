'use strict';

var mercury = require('../../index');
var h = require('../../index').h;
var LoginComponent = require('./login-component.js');
var document = require('global/document');

var comp = LoginComponent();

var state = mercury.struct({
    message: mercury.value(''),
    loginDone: mercury.value(false),
    loginComponent: comp.state
});

comp.events.onSuccess(function onSuccess(opts) {
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
});

mercury.app(document.body, state, appRender);

function appRender(state) {
    return h('div', [
        state.loginDone ?
            h('div', state.message) :
            LoginComponent.render(state.loginComponent)
    ]);
}
