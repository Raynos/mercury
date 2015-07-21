# Thunks

vtree has a notion of a thunk build into the virtual tree data structure. A virtual tree can either be a virtual node, a virtual text node, a widget or a thunk.

A thunk is an unevaluated virtual node.The purpose of it is to make the virtual tree data structure lazy, i.e. to create a new complex virtual tree data structure you do not have to build the entire thing top to bottom.

Being lazy on it's own adds little value without also being able to add caching.

The problem we are solving here is that creating 5000 virtual nodes from top to bottom every time something changes is expensive on GC churn. There are two solutions to this problem, you either make subsections of the virtual tree lazy and only evaluate them if you need to evaluate them or you do subtree re-rendering.

As a brief aside, the subtree re-rendering technique (which is not implemented) says that recreating the entire virtual tree from the top to the bottom when anything changes is a bad idea. Instead if something changes we should try and only recreate the component that has changed (and it's children). This is not implemented because having a state <-> component mapping is hard to do whilst keeping purity, immutability & referential transparency.

So thunks, allow us to only evaluate subsets of the virtual tree if they really need to be evaluated. Imagine that only one text node has really changed, and imagine this text node is 10 vnodes deep in the tree, i.e. has 10 parents. Ideally we only evaluate that node and it's 10 parents, the other 4989 nodes in the virtual tree do not have to be constantly recreated or constantly diffed at 60 frames per second.

So how do thunks work.

A thunk is an object that looks like

```js
{
  type: "Thunk",
  render: function (previous) {
    return h('div', 'some text')
  },
  vnode: null
}
```
It's important to note that `render` is only allowed to return one vnode ever. So for every thunk instance we will only call `render()` once then cache the result on `thunk.vnode` and access `thunk.vnode` in the future. This means there is zero cache invalidation and this is because we assume a thunk is just an unevaluated vnode and any thunk instance only ever evaluates to a single vnode.

When we see a thunk, if `thunk.vnode` exists we use that and don't call `.render()`. If `thunk.vnode` does not exist we call `.render(previousThunk)`. i.e. if we are doing a diff and we see a thunk object in the previous tree and a thunk object in the current tree we will call the current thunk with the previous thunk.

The purpose of invoking a thunk instance in the current tree with the equivelant thunk instance in the previous tree is so that the implementor of the thunk can implement a better caching technique.

For example

```js
{
  type: "Thunk",
  isTextThunk: true,
  render: function (previous) {
    if (previous.text === this.text && previous.isTextThunk) {
      return prev.vnode
    }

    return h('div', this.text)
  },
  text: 'some text',
  vnode: null
}
```

Here we use the fact that all our thunk instances that `isTextThunk` will have a text property and the only thing that makes this thunk dynamic is the text. This means that if the previous thunk has the same text we know that the previous vnode is deep equivelant to the thunk we would have created so we can return it instead.

This safes us a small amount of computation because we do not have to call `h()`. Also because we are return the previous vnode we know that the vtree/diff algorithm will go `prevVnode === currVnode` i.e. returning the same vnode instance means the diff algorithm can short circuit and does not have to recursively check stuff.

Now imagine you wrapped a subtree containing 1000 virtual nodes behind a thunk, you would save having to recreate them if nothing changed and you would save having to diff them because diff can short circuit on strict equality of the root virtual node for that subtree.

## Partials

`hg.partial` is a wrapper over a low-level [thunk implementation](https://github.com/Raynos/vdom-thunk).
Call it with a render function and the arguments that will be passed to that render function:

```js
App.render = function render(state) {
    return h('div.counters', [
        hg.partial(renderCounter, state.counter1),
        hg.partial(renderCounter, state.counter2),
    ]);
};

function renderCounter(counterValue) {
   return h('span', ''+counterValue);
}
```

In this example, when the `counter1` state changes, the `counter2` partial will not be re-evaluated and its vdom tree will simply be reused from the last state.

**Be careful**: partials are also re-evaluated when their rendering function changes.
If the code above were changed to:

```js
App.render = function render(state) {
    var renderCounterLocal = function(cv) { ... };
    return h('div.counters', [
        hg.partial(renderCounterLocal, state.aCounter),
        ...
```

then the counter's vdom would be re-evaluated every render, because the identity of `renderCounterLocal` changes every time the `render` function is called.
This nullifies the benefits of using partials.
