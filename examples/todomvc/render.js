var mercury = require("../../index.js")
var h = require("../../index.js").h

var doMutableFocus = require("./lib/do-mutable-focus.js")

var ESCAPE = 27
var footer = infoFooter()

module.exports = render

function render(state) {
    return h(".todomvc-wrapper", [
        h("link", {
            rel: "stylesheet",
            href: "https://rawgithub.com/raynos/mercury/master/examples/todomvc/style.css"
        }),
        h("section#todoapp.todoapp", [
            mercury.partial(header, state.field, state.events),
            mainSection(state.todos, state.route, state.events),
            mercury.partial(statsSection, state.todos, state.route, state.events)
        ]),
        footer
    ])
}

function header(field, events) {
    return h("header#header.header", {
        "data-event": [
            mercury.changeEvent(events.setTodoField),
            mercury.submitEvent(events.add)
        ]
    }, [
        h("h1", "Todos"),
        h("input#new-todo.new-todo", {
            placeholder: "What needs to be done?",
            autofocus: true,
            value: field.text,
            name: "newTodo"
        })
    ])
}

function mainSection(todos, route, events) {
    var allCompleted = todos.every(function (todo) {
        return todo.completed
    })
    var visibleTodos = todos.filter(function (todo) {
        return route === "completed" && todo.completed ||
            route === "active" && !todo.completed ||
            route === "all"
    })

    return h("section#main.main", { hidden: !todos.length }, [
        h("input#toggle-all.toggle-all", {
            type: "checkbox",
            name: "toggle",
            checked: allCompleted,
            "data-change": mercury.valueEvent(events.toggleAll)
        }),
        h("label", { htmlFor: "toggle-all" }, "Mark all as complete"),
        h("ul#todo-list.todolist", visibleTodos.map(function (todo) {
            return todoItem(todo, events)
        }))
    ])
}

function todoItem(todo, events) {
    var className = (todo.completed ? "completed " : "") +
        (todo.editing ? "editing" : "")

    return h("li", { className: className, key: todo.id }, [
        h(".view", [
            h("input.toggle", {
                type: "checkbox",
                checked: todo.completed,
                "data-change": mercury.event(events.toggle, {
                    id: todo.id,
                    completed: !todo.completed
                })
            }),
            h("label", {
                "data-dblclick": mercury.event(events.startEdit, { id: todo.id })
            }, todo.title),
            h("button.destroy", {
                "data-click": mercury.event(events.destroy, { id: todo.id })
            })
        ]),
        h("input.edit", {
            value: todo.title,
            name: "title",
            // when we need an RPC invocation we add a 
            // custom mutable operation into the tree to be
            // invoked at patch time
            "data-focus": todo.editing ? doMutableFocus() : null,
            "data-keydown": mercury.keyEvent(events.cancelEdit, ESCAPE, { id: todo.id }),
            "data-event": mercury.submitEvent(events.finishEdit, { id: todo.id }),
            "data-blur": mercury.valueEvent(events.finishEdit, { id: todo.id })
        })
    ])
}

function statsSection(todos, route, events) {
    var todosLeft = todos.filter(function (todo) {
        return !todo.completed
    }).length
    var todosCompleted = todos.length - todosLeft

    return h("footer#footer.footer", { hidden: !todos.length }, [
        h("span#todo-count.todo-count", [
            h("strong", String(todosLeft)),
            todosLeft === 1 ? " item" : " items",
            " left"
        ]),
        h("ul#filters.filters", [
            link("#/", "All", route === "all"),
            link("#/active", "Active", route === "active"),
            link("#/completed", "Completed", route === "completed")
        ]),
        h("button.clear-completed#clear-completed", {
            hidden: todosCompleted === 0,
            "data-click": mercury.event(events.clearCompleted)
        }, "Clear completed (" + String(todosCompleted) + ")")
    ])
}

function link(uri, text, isSelected) {
    return h("li", [
        h("a", { className: isSelected ? "selected" : "", href: uri }, text)
    ])
}

function infoFooter() {
    return h("footer#info.info", [
        h("p", "Double-click to edit a todo"),
        h("p", [
            "Written by ",
            h("a", { href: "https://github.com/Raynos" }, "Raynos")
        ]),
        h("p", [
            "Part of ",
            h("a", { href: "http://todomvc.com" }, "TodoMVC")
        ])
    ])
}
