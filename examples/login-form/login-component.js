'use strict';

var validEmail = require('valid-email');
var hg = require('../../index.js');
var WeakmapEvent = require('../lib/weakmap-event.js');

var onSuccess = WeakmapEvent();

LoginComponent.render = require('./login-component-render.js');
LoginComponent.onSuccess = onSuccess.listen;

module.exports = LoginComponent;

function LoginComponent(options) {
    return hg.state({
        emailError: hg.value(''),
        passwordError: hg.value(''),
        registerMode: hg.value(false),
        channels: {
            switchMode: switchMode,
            login: login,
            register: register
        }
    });
}

function switchMode(state, registerMode) {
    state.registerMode.set(registerMode);
}

function login(state, user) {
    resetErrors(state);
    var email = user.email;

    if (!validEmail(email)) {
        return state.emailError.set('Invalid email');
    }

    onSuccess.broadcast(state, {
        type: 'login',
        user: user
    });
}

function register(state, user) {
    resetErrors(state);
    var email = user.email;

    if (!validEmail(email)) {
        return state.emailError.set('Invalid email');
    }

    if (user.password !== user.repeatPassword) {
        return state.passwordError.set('Password not same');
    }

    if (user.password.length <= 6) {
        return state.passwordError.set('Password too small');
    }

    onSuccess.broadcast(state, {
        type: 'register',
        user: user
    });
}

function resetErrors(state) {
    state.emailError.set('');
    state.passwordError.set('');
}
