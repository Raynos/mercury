var mercury = require('../../index.js')
var h = require('../../index.js').h
var styles = require('./styles.js')

module.exports = render

function render(state) {
    return state.registerMode ?
        renderRegister(state) :
        renderLogin(state)
}

function renderLogin(state) {
    var events = state.events

    return h('div', {
        'ev-event': mercury.submitEvent(events.login)
    }, [
        h('fieldset', [
            h('legend', 'Login Form'),
            labeledInput('Email: ', {
                name: 'email',
                error: state.emailError
            }),
            labeledInput('Password: ', {
                name: 'password',
                type: 'password'
            }),
            h('div', [
                h('button', {
                    'ev-click': mercury.event(events.switchMode,
                        !state.registerMode)
                }, 'Register new User'),
                h('button', 'Login')
            ])
        ])
    ])
}

function renderRegister(state) {
    var events = state.events

    return h('div', {
        'ev-event': mercury.submitEvent(events.register)
    }, [
        h('fieldset', [
            h('legend', 'Register Form'),
            labeledInput('Email: ', {
                name: 'email',
                error: state.emailError
            }),
            labeledInput('Password: ', {
                name: 'password',
                type: 'password',
                error: state.passwordError
            }),
            labeledInput('Repeat Password: ', {
                name: 'repeatPassword',
                type: 'password'
            }),
            h('div', [
                h('button', {
                    'ev-click': mercury.event(events.switchMode,
                        !state.registerMode)
                }, 'Login into existing User'),
                h('button', 'Register')
            ])
        ])
    ])
}

function labeledInput(label, opts) {
    opts.className = opts.error ?
        styles.inputError.className : ''

    return h('div', [
        h('label', {
            className: opts.error ? styles.error.className : ''
        }, [
            label,
            h('input', opts)
        ]),
        h('div', {
            className: styles.error.className
        }, [
            opts.error
        ])
    ])
}
