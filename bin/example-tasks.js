var path = require('path')

var examplesDir = path.join(__dirname, '..', 'examples')
var examplesTasks = [
    browserifyTask('geometry'),
    browserifyTask('todomvc'),
    browserifyEditorTask('field-reset'),
    browserifyEditorTask('bmi-counter'),
    browserifyEditorTask('shared-state'),
    browserifyEditorTask('react-ballmer'),
    browserifyEditorTask('count')
]

module.exports = examplesTasks

function browserifyTask(folder) {
    return {
        src: path.join(examplesDir, folder, 'browser.js'),
        dest: path.join(examplesDir, folder, 'index.html'),
        type: 'browserify'
    }
}

function browserifyEditorTask(file) {
    return {
        src: path.join(examplesDir, file + '.js'),
        dest: path.join(examplesDir, file + '.html'),
        type: 'browserify-editor'
    }
}
