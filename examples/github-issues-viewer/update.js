module.exports = {
    setRepo: setRepo,
    submitRepo: submitRepo,
    validRepo: validRepo,
    teaser: teaser,
    newRepo: newRepo
}

function setRepo(state, data) {
    state.repo.text.set(data.repo.trim())
}

function submitRepo(state, data) {
    if (!validRepo(state.repo())) {
        return
    }

    state.repo.value.set(data.repo)
}

function validRepo(repo) {
    var parts = repo.text.split("/")
    var disabled = repo.text !== repo.value &&
        parts.length === 2 &&
        parts[0].length !== 0 &&
        parts[1].length !== 0

    return disabled
}

function newRepo(state, repoEvent) {
    if (repoEvent.error) {
        return state.errorMessage.set(repoEvent.error.message)
    }

    state.issues.set(repoEvent.issues)
}

function teaser(text, maxLength) {
    maxLength = maxLength || 140

    return text.slice(0, maxLength)
}
