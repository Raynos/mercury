module.exports = {
    teaser: teaser,
    newRepo: newRepo
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
