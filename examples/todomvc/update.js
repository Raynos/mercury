var State = require("./state.js")

module.exports = {
    setRoute: setRoute,
    toggleAll: toggleAll,
    add: add,
    setTodoField: setTodoField,
    toggle: toggle,
    destroy: destroy,
    startEdit: startEdit,
    finishEdit: finishEdit,
    cancelEdit: cancelEdit,
    clearCompleted: clearCompleted
}

function setRoute(state, route) {
    state.route.set(route.substr(2) || "all")
}

function toggleAll(state, value) {
    state.todos.forEach(function (todo) {
        todo.completed.set(value.toggle)
    })
}

function add(state, data) {
    if (data.newTodo.trim() === "") {
        return
    }

    state.todos.push(State.todoItem({
        title: data.newTodo.trim()
    }))
    state.field.text.set("")
}


function setTodoField(state, data) {
    state.field.text.set(data.newTodo)
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
    if (!item || item.editing === false) {
        return
    }

    item.editing.set(false)
    item.title.set(data.title)

    if (data.title.trim() === "") {
        destroy(state, data)
    }
}

function cancelEdit(state, data) {
    var item = find(state.todos, data.id)

    item.editing.set(false)
}

function clearCompleted(state) {
    state.todos().forEach(function (todo, index) {
        if (todo.completed) {
            destroy(state, todo)
        }
    })
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
