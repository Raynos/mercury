var State = require("./state.js")

module.exports = {
    setRoute: setRoute,
    toggleAll: toggleAll,
    add: add,
    setTodoField: setTodoField,
    toggle: toggle,
    destroy: destroy,
    startEdit: startEdit,
    finishEdit: finishEdit
}

function setRoute(state, route) {
    state.route.set(route.substr(2) || "all")
}

function toggleAll(state) {
    state.todos.forEach(function (todo) {
        todo.completed.set(!todo.completed())
    })
}

function add(state, data) {
    state.todos.push(State.todoItem({
        title: data.newTodo
    }))
    state.todoField.set("")
}

function setTodoField(state, data) {
    state.todoField.set(data.newTodo)
}

function toggle(state, data) {
    var item = find(state.todos, data.id)
    item.completed.set(data.completed)
}

function startEdit(state, data) {
    var item = find(state.todos, data.id)
    item.editing.set(true)
}

function destroy(state, data) {
    var index = findIndex(state.todos, data.id)
    state.todos.splice(index, 1)
}

function finishEdit(state, data) {
    var item = find(state.todos, data.id)
    item.editing.set(false)
    item.title.set(data.title)
}

function find(list, id) {
    for (var i = 0; i < list.getLength(); i++) {
        var item = list.get(i)
        if (item.id === id) {
            return item
        }
    }

    return null
}

function findIndex(list, id) {
    for (var i = 0; i < list.getLength(); i++) {
        var item = list.get(i)
        if (item.id === id) {
            return i
        }
    }

    return null
}
