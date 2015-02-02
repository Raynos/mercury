## What is mercury.

> Below is a comment stolen from a mercury vs cycle ( https://github.com/staltz/cycle/issues/49#issuecomment-68612757 ) comparison.

Mercury is very component oriented at the root of it. Generally you write applications as a series of components that
return a state (the component data at any given point) and provides a render function. The render function knows how the
component should be rendered including the dom structure, attributes/values and events/event handlers (known as channels in Mercury).

The following is a quick example that makes a div that can be clicked which will create a new one exactly the same except it
has a different `data-foo-id` attribute value. It is created in the image of a Cycle.js example you can see here ( https://github.com/staltz/cycle/blob/master/examples/simple/simple.js ).


```js
var hg = require('mercury');
var h = require('mercury').h;

function Foo(initialState) {
    return hg.state({
        bars: hg.array(initialState.bars, createBar),
        channels: {
            addBar: Foo.addBar
        }
    });

    function createBar(x) {
        return hg.struct({
            id: hg.value(x.id),
            bar: hg.value(x.bar)
        })
    }
}

Foo.addBar = function addBar(state) {
    state.bars.push({
        id: 2,
        bar: Math.round(Math.random() * 1000)
    });
};

Foo.render = function render(state) {
    return h('div', state.bars.map(renderBar))

    function renderBar(bar) {
        return h('div', {
            'attributes': {
                'data-foo-id': bar.id
            },
            'style': {
                'margin': '10px',
                'background': '#ececec',
                'padding': '5px',
                'cursor': 'pointer',
                'display': 'inline-block'
            },
            'ev-click': hg.send(state.channels.addBar)
        });
    }
};

function main() {
    hg.app(document.body, Foo({
        bars: [{ id: 2, bar: 135 }]
    }), Foo.render);
}

main();
```

Some of the core ideas are:

 - your entire view is a single complex vtree
 - your entire view state is a single complex immutable object.
 - your rendering function is pure, it takes just the view state (disclaimer: hooks & widgets are not pure).
 - you declare all user input as channels up front in your view state.
 - the view state supports cursors, you can nest components in components.

Mercury is unidirectional because:

 - A DOM event triggers a value to be send to a channel
 - The listener for the channel updates the view state
 - An update to the view state triggers a re-render
 - A new vtree is created
 - diff() and patch() update the DOM.

See more about life cycles here ( https://github.com/Raynos/mercury/blob/master/docs/life-cycles.md ).

Mercury is also a hybrid of functional and imperative, the rendering logic is functional but the updating logic has an imperative updating interface (backed by a stream of immutable objects under the hood).

This gives you an FRP style application written in a way that still feels like its javascript
