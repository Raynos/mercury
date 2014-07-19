A component in mercury is two things

 - a "constructor" that takes some initialization arguments and
    returns { state, events }
 - a rendering function.

The `state` that is returned from a component is a
black box & a lens. You embed it into your "top level" state
atom at some key.

For example:

```js
var appState = mercury.struct({
    loginState: LoginComponent(...).state
})
```

You then update your "top level" rendering logic to call the
components rendering function with the state that you
"embedded" at some key.

For example:

```js
function appRender(state) {
    return h('div', [
        h('.header', [
            h('.my-logo'),
            LoginComponent.render(state.loginState)
        ])
    ])
}
```

A component also returns events, this is similar to how you 
pass channels into a component in om except it's slightly
less coupled.

The events a component returns might be something like 
"login button pressed", i.e. a component is saying 
"I have a login button but have no idea how to handle login, 
please listen to my event and mutate the correct state somewhere".

For example:

```js
var loginComp = LoginComponent(...)

var appState = mercury.struct({
    loginState: loginComp.state
})

loginComp.events.login(function (user) {
    /* do something with user. probably ajax, maybe redirect */
})
```

Note that if you want to mutate the black box `state` of a
component you must not mutate it directly, a component
should expose a set of functions like `resetField(state)`
exactly like how evan has demonstrated.

For example:

```js
LoginComponent.renderLogOutForm(loginComp.state)
```

The advantage of this technique is that you need to know nothing
about how a component updates itself nor do you need to know
anything about any `geval` events a component might have.

Instead the component interally stores a geval events as a 
property on it's own state and interally calls `updateState`,
since the state it returns is a lens it will "mutate" the top
level state that the caller of the component has embedded the
component into thus triggering a redraw.
