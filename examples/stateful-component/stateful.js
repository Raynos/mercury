var mercury = require('mercury');
var h = mercury.h;

var PopOver = (function () {
    var offset = require('offset');

    PopOverFn.render = popoverRender;
    PopOverFn.open = open;
    PopOverFn.close = close;

    function open(state) {
        state.visible.set(true);
    }

    function close(state) {
        state.visible.set(false);
    }

    function PopOverFn() {
        var events = mercury.input(['toggle']);

        var state = mercury.hash({
            visible: mercury.value(false),
            position: mercury.hash({
                top: mercury.value(null),
                left: mercury.value(null)
            }),
            events: events
        });

        events.toggle(function (ev) {
            var visible = !state.visible();
            state.visible.set(visible);

            /* SUCH DOM. SO SADS */
            if (visible && state.position.top() === null) {
                var currentTarget = ev.currentTarget;
                var elem = currentTarget.firstChild;

                var dimension = offset(elem);
                state.position.top.set(dimension.top);
                state.position.left.set(dimension.left +
                    elem.offsetWidth);
            }
        });

        return { state: state };
    }

    function popoverRender(state, opts) {
        return h('.popover-container', {
            'data-click': state.events.toggle
        }, [
            opts.elem,
            h('.popover', {
                style: {
                    display: state.visible ? 'block' : 'none',
                    top: state.position.top + 'px',
                    left: state.position.left + 'px',
                    position: 'absolute'
                }
            }, [
                h('.title', opts.title),
                h('.content', opts.content)
            ])
        ]);
    }

    return PopOverFn;
}());

/* PopOver:

    You can call `PopOver()` to create a new popover widget, 
      it returns { state: state }, you must embed it's state
      somewhere.

    You can call `PopOver.close(popOverState)` to close a
      popover widget instance

    You can call `PopOver.open(popOverState)` to open a
      popover widget instance.

    You can call `PopOver.render(popOverState, {
        title: 'popover title',
        content: 'popover content',
        elem: VNode
    })`

    When you call `render()` you must pass it the plain state,
      not the observable state.

    When you call `render()` with an elem it will render the
      element and then render the popover next to it, basically
      the elem is what the popover will pop over.
*/

var events = mercury.input(['open', 'close']);

var state = window.state = mercury.hash({
    info: 'some text',
    events: events,
    popover: PopOver().state
});

events.open(function () {
    PopOver.open(state.popover);
});

events.close(function () {
    PopOver.close(state.popover);
});

function render(state) {
    return h('div', [
        h('div', 'some text'),
        PopOver.render(state.popover, {
            title: 'popover title',
            content: 'popover content',
            elem: h('button', 'some value')
        }),
        h('button', {
            'data-click': mercury.event(state.events.open)
        }, 'open the popover manually'),
        h('button', {
            'data-click': mercury.event(state.events.close)
        }, 'close the popover manually')
    ]);
}

mercury.app(document.body, state, render);
