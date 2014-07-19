# The life cycles of a mercury app

A well structure mercury app is reasonably deterministic about
  when certain code runs.

There are a few main "phases"

 - Reacting to browser events from the event loop
 - Running application update logic
 - Running the rendering cycle in `requestAnimationFrame`

## Reacting to the event loop

The only time JavaScript get's executed is when the event loop
  tells your code that a new thing happened.

This includes the initial evaluation of your `browser.js`
  source code. 

On first evaluation you setup your state, render your view
  and insert it into the DOM.

### Reacting to DOM events

All your handling of DOM events (i.e. `click`, `change`, ...)
  should go through `dom-delegator`.

`dom-delegator` intercepts all events and sees if you have
  registered an event handler using the `ev-{{name}}` syntax
  in `h()` or have registered a global listener using
  `delegator.addGlobalEventListener()`.

If it finds one it will invoke it.

If you suspect there might be an issue or bug with an event not
  getting fired you should go into
  `node_modules/mercury/node_modules/dom-delegator` and edit
  your copy of dom-delegator to add print statements.

One common issue might be that your event is not in the whitelist
  ( https://github.com/Raynos/dom-delegator/blob/master/index.js#L10-L16 )
  you should call `delegator.listenTo(eventName)` to make sure
  the delegator registers a global event handler for it.

### Reacting to other entries from the event loop

There are many other ways the event loop can notify you that
  something has changed.

It's highly recommended that you take all other effects & 
  entries to the event loop and wrap them in a `geval` interface.

For example: 

 - https://github.com/Raynos/mercury/blob/master/examples/todomvc/input.js#L15
 - https://github.com/Raynos/mercury/blob/github-issues/examples/github-issues-viewer/input.js#L11-L12

The benefit is that once you've done this, you can now trace or
  debug `geval` to check all new events entering the event loop.

The other benefit is isolating your actual core application logic
  that does not concern itself with effects from the code with
  side effects.

If you put all the IO in one bucket and create a "seperate"
  part of your app that is just "on a geval event, run business 
  logic and update state" then that second part is really simple
  to reason about and unit test.

## Running application logic

### `geval` event listeners

Eventually a event from the event loop will trigger into a new
  discrete value being emitted on a `geval` Event instance.

This discrete value should be a application specific value, you
  shouldn't have any dom events or raw xhr objects being emitted
  through geval but instead have already converted them into
  something specific to your application.

### Application logic

At this point the listener to the `geval` Event is generally one
  of your applications `update` functions that has access to
  either the top level state or one of the nested states.

This is your core application / business logic and you do some
  computation and update the state into a new state.

## The request animation frame rendering loop

### Scheduling a `requestAnimationFrame`    

Any time you do `state.set()` or `state.some.key.set()` the
  `main-loop` module will check if we have scheduled a rerender
  yet and if not will schedule a render on the next frame.

If you suspect a `requestAnimationFrame` is not scheduled then
  add logging or tracing to `main-loop`.

### Entering a `requestAnimationFrame`

The browser will enter the `main-loop` rendering phase on the
  next animation frame.

#### Rendering the view to create a new virtual tree.

`main-loop` will call the top level `render` function that you
  passed to `mercury.app(state, render)` and create a new virtual
  tree.

One of the tricks that makes this fast is the fact that
  `mercury.partial` is used to avoid evaluating subtrees in
  `render` unless needed

If you suspect this doesn't happen just add debug statements to
  your top level render function.

#### Calling diff on the trees

The next step is the diff phase, here `vtree` will diff the
  new and previous tree. At this point any `partial`'s that have
  actually changed will be evaluated and their respective
  rendering functions will be called.

If you suspect anything is wrong here it's recommended you add
  a print to `main-loop` to inspect the `patches` returned by
  the `diff()` function and see if your expected changes are
  included.

#### Calling patch on the DOM

The final step is calling `patch()` on the actual DOM with your
  patches from `diff`.

This is the only place in the life cycle of a mercury app where
  actual DOM manipulation happens. it happens at the end of
  any raf we have scheduled. Here all patches are applied and
  all hooks get called

If you suspect something is wrong here it's recommended that you
  use DOM mutation observers with a helper like listenMutation
  ( https://github.com/Raynos/jsonml-stringify/blob/master/examples/lib/listen-mutation.js )
  to inspect the actual mutations applied to the DOM and see if
  they are what you might expect.

