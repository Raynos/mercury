var validEmail = require('valid-email')
var mercury = require('../../index.js')

loginComponent.render = require('./view.js')

module.exports = loginComponent

function loginComponent(options) {
    var events = {
        login: mercury.input(),
        switchMode: mercury.input(),
        register: mercury.input()
    }
    var onSuccess = mercury.input()
    var state = mercury.struct({
        events: events,
        emailError: mercury.value(''),
        passwordError: mercury.value(''),
        registerMode: mercury.value(false)
    })

    events.switchMode(function (registerMode) {
        state.registerMode.set(registerMode)
    })

    events.login(function (user) {
        resetErrors()
        var email = user.email

        if (!validEmail(email)) {
            return state.emailError.set('Invalid email')
        }

        onSuccess({
            type: 'login',
            user: user
        })
    })

    events.register(function (user) {
        resetErrors()
        var email = user.email

        if (!validEmail(email)) {
            return state.emailError.set('Invalid email')
        }

        if (user.password !== user.repeatPassword) {
            return state.passwordError.set('Password not same')
        }

        if (user.password.length <= 6) {
            return state.passwordError.set('Password too small')
        }

        onSuccess({
            type: 'register',
            user: user
        })
    })

    return {
        state: state,
        events: {
            onSuccess: onSuccess
        }
    }

    function resetErrors() {
        state.emailError.set('')
        state.passwordError.set('')
    }
}
