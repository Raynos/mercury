A component in mercury is two things

 - a "constructor" that takes some initialization arguments and
    returns state
 - a rendering function.

The `state` that is returned from a component is a
black box & a lens. You embed it into your "top level" state
atom at some key.

For example:

```js
var appState = mercury.struct({
    loginState: LoginComponent(...)
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

A component also has events, this is similar to how you 
pass channels into a component in om except it's slightly
less coupled.

The events a component jas might be something like 
"login button pressed", i.e. a component is saying 
"I have a login button but have no idea how to handle login, 
please listen to my event and mutate the correct state somewhere".

For example:

```js
var loginComp = LoginComponent(...)

var appState = mercury.struct({
    loginState: loginComp
})

LoginComponent.onLogin(loginComp, function (user) {
    /* do something with user. probably ajax, maybe redirect */
})
```

Note that if you want to mutate the black box `state` of a
component you must not mutate it directly, a component
should expose a set of functions like `resetField(state)`
exactly like how evan has demonstrated.

For example:

```js
LoginComponent.renderLogOutForm(loginComp)
```

The advantage of this technique is that you need to know nothing
about how a component updates itself nor do you need to know
anything about any events a component might have.

Instead the component will internally broadcast any events
or do the correct mutation of it's own state.
Since the state it returns is a lens it will "mutate" the top
level state that the caller of the component has embedded the
component into thus triggering a redraw.

Note: this article is written based on my reply to the Elm
discuss thread about modularity, to see other techniques used
by Elm & om, read more at https://groups.google.com/forum/#!msg/elm-discuss/sv7DVJ47QkE/VhLr9_V-5E4J
