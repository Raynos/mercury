var mercury = require('mercury');
var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var h = mercury.h;

var PopOver = (function () {
    var offset = require('offset');

    PopOverFn.render = function (opts) {
        return new PopOverFn(opts);
    };

    function PopOverFn(opts) {
        this.title = opts.title;
        this.content = opts.content;
        this.elem = opts.elem;

        this.mutableState = null;
    }

    function render(state, opts) {
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

    PopOverFn.prototype.init = function () {
        var events = mercury.input(['toggle']);

        var state = this.mutableState = {
            visible: false,
            events: events,
            position: {
                top: null,
                left: null
            }
        }

        var tree = this.tree = render(this.mutableState, this);
        var root = createElement(tree);

        var self = this

        events.toggle(function (ev) {
            var visible = !state.visible
            // here we MUTATE the state which is
            // this.mutableState, and this.mutableState is in
            // the parent vtree, which means we MUTATE the
            // immutable vtree, lots of assumptions are just
            // broken
            state.visible = visible;

            if (visible && state.position.top === null) {
                var currentTarget = ev.currentTarget;
                var elem = currentTarget.firstChild;

                var dimension = offset(elem);
                state.position.top = dimension.top;
                state.position.left = dimension.left +
                    elem.offsetWidth;
            }

            // mutated state, must trigger a redraw
            self.update(self, root);
        });

        return root;
    };

    PopOverFn.prototype.update = function (prev, elem) {
        if (!this.mutableState) {
            this.mutableState = prev.mutableState
        }

        // prev is either the prev, i.e. this redraw is triggered
        // by the user embedding a new widget in a new tree
        // i.e. when the top level render does diff(prev, curr)

        // or prev === this when we manually call update()
        // in that code branch we actually re-assign the
        // this.tree to the latest version as per rendering
        // with mutableState.

        // Supporting both these callsites feels fragile

        var prevTree = prev.tree;
        // by re-assigning OVER this.tree we again mutate
        // the widget which is in the parent vtree and again
        // mutating the IMMUTABLE vtree breaking a lot of
        // assumptions
        var tree = this.tree = render(this.mutableState, this);

        var patches = diff(prevTree, tree)

        patch(elem, patches)
    };

    return PopOverFn;
}());

/* PopOver:

    You can call `PopOver.render({
        title: 'popover title',
        content: 'popover content',
        elem: VNode
    })`

    When you call `render()` with an elem it will render the
      element and then render the popover next to it, basically
      the elem is what the popover will pop over.
*/

var state = window.state = mercury.hash({
    info: 'some text'
});


function render(state) {
    return h('div', [
        h('div', 'some text'),
        PopOver.render({
            title: 'popover title',
            content: 'popover content',
            elem: h('button', 'some value')
        })
    ]);
}

mercury.app(document.body, state, render);
