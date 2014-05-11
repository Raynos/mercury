module.exports = {
    setRepo: setRepo,
    submitRepo: submitRepo,
    validRepo: validRepo,
    teaser: teaser,
    newRepo: newRepo
}

function setRepo(state, data) {
    state.repoText.set(data.repo.trim())
}

function submitRepo(state, data) {
    if (!validRepo(state.repo().value, state.repoText())) {
        return
    }

    state.repo.value.set(data.repo)
}

function validRepo(repoValue, repoText) {
    var parts = repoText.split("/")
    var disabled = repoText !== repoValue &&
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
