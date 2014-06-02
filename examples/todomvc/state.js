var cuid = require("cuid")
var extend = require("xtend")
var mercury = require("../../index.js")

var TodoApp = {
    todos: [],
    route: "all",
    field: {
        text: ""
    }
}

var TodoItem = {
    id: null,
    title: "",
    editing: false,
    completed: false
}

module.exports = {
    todoApp: todoApp,
    todoItem: todoItem
}

function todoApp(events, initialState) {
    var state = extend(TodoApp, initialState)

    return mercury.struct({
        todos: mercury.array(state.todos.map(todoItem)),
        route: mercury.value(state.route),
        field: mercury.struct({
            text :mercury.value(state.field.text)
        }),
        events: events
    })
}

function todoItem(item) {
    var state = extend(TodoItem, item)

    return mercury.struct({
        id: cuid(),
        title: mercury.value(state.title),
        editing: mercury.value(state.editing),
        completed: mercury.value(state.completed)
    })
}
