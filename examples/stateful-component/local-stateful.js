var mercury = require('mercury');
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
    }

    PopOverFn.prototype.init = function () {

    };

    PopOverFn.prototype.update = function () {

    };

    // function PopOverFn() {
    //     var events = mercury.input(['toggle']);

    //     var state = mercury.hash({
    //         visible: mercury.value(false),
    //         position: mercury.hash({
    //             top: mercury.value(null),
    //             left: mercury.value(null)
    //         }),
    //         events: events
    //     });

    //     events.toggle(function (ev) {
    //         var visible = !state.visible();
    //         state.visible.set(visible);

    //          SUCH DOM. SO SADS 
    //         if (visible && state.position.top() === null) {
    //             var currentTarget = ev.currentTarget;
    //             var elem = currentTarget.firstChild;

    //             var dimension = offset(elem);
    //             state.position.top.set(dimension.top);
    //             state.position.left.set(dimension.left +
    //                 elem.offsetWidth);
    //         }
    //     });

    //     return { state: state };
    // }

    // function popoverRender(state, opts) {
    //     return h('.popover-container', {
    //         'data-click': state.events.toggle
    //     }, [
    //         opts.elem,
    //         h('.popover', {
    //             style: {
    //                 display: state.visible ? 'block' : 'none',
    //                 top: state.position.top + 'px',
    //                 left: state.position.left + 'px',
    //                 position: 'absolute'
    //             }
    //         }, [
    //             h('.title', opts.title),
    //             h('.content', opts.content)
    //         ])
    //     ]);
    // }

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
