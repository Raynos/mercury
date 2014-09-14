# Hooks

A vnode consists mainly of `{ tagName, properties, children }`. When you diff two vnodes you are applying a diff on the tagName, on the properties and the children.

The properties normally consist of keys and values, where the values are strings or nested objects (e.g. style, attributes).

Other than strings and nested objects you can also place hooks on the properties object.

A hook is a `{ hook: function (domElement, propertyName) {} }` and it's used like:

```js
h('div', {
    'arbitrary-keyname': Object.create({
        hook: function (elem, propname) {
            assert(elem.tagName === 'div');
            assert(propname === 'arbitrary-keyname');
        }
    }
})
```

When you place a hook in a virtual node vtree/diff will create a patch object saying the properties have changed. Because hooks are instances of prototypes they will always be a new instance on every `diff` call so the hook value in the properties object will be different between `prev` and `current`.

The hook only gets executed in `vdom/create-element` and `vdom/patch`. Hooks get executed in key order of the properties object. Hooks also get executed together with property patches being applied. This means you probably want all your hook keys to be at the bottom of your properties object.

So whenever vdom is patching the properties on a DOM element it will also invoke hooks synchronously. The hook gets called with the DOM element and the property name.

The use case for hooks is to set properties on DOM nodes that cannot be set through the DOM property interface, for example focus has no property based declarative interface so we have a focus hook that calls the `.focus()` method.

The other use case for hooks is to manage stateful properties. Hooks are stateful and will always get called even if nothing else has changed. If a vnode has hooks we will call them, this means that even if there are no differences or the thunk has not changed we will still return a set of patches that is "invoke these hooks".

Because of the fact hooks get called on every diff/patch cycle we can use hook to manage stateful properties. For example if you say `h('input', { value: ValueHook('foo') })` we will set the value of the input to `'foo'` on every render phase because we know that the user can change it away from `'foo'` and thus the DOM and the virtual DOM get out of sync which is not something we want.
