'use strict';

var path = require('path');
var fs = require('fs');

var docsPath = path.join(__dirname, '..', 'docs', 'modules');
var modulesPath = path.join(__dirname, '..', 'node_modules');
var moduleReadmes = {
    'geval': ['geval', 'README.md', 'Raynos/geval'],
    'dom-delegator': ['dom-delegator', 'README.md', 'Raynos/dom-delegator'],
    'value-event': ['value-event', 'README.md', 'Raynos/value-event'],
    'observ-array': ['observ-array', 'README.md', 'Raynos/observ-array'],
    'observ-varhash': ['observ-varhash', 'Readme.md', 'nrw/observ-varhash'],
    'observ-struct': ['observ-struct', 'README.md', 'Raynos/observ-struct'],
    'observ': ['observ', 'README.md', 'Raynos/observ'],
    'virtual-dom': ['virtual-dom', 'README.md', 'Matt-Esch/virtual-dom'],
    'vtree': ['virtual-dom', path.join('vtree', 'README.md'),
        'Matt-Esch/virtual-dom'],
    'vdom': ['virtual-dom', path.join('vdom', 'README.md'),
        'Matt-Esch/virtual-dom'],
    'virtual-hyperscript': ['virtual-dom',
        path.join('virtual-hyperscript', 'README.md'),
        'Matt-Esch/virtual-dom'],
    'vdom-thunk': ['vdom-thunk', 'README.md', 'Raynos/vdom-thunk'],
    'main-loop': ['main-loop', 'README.md', 'Raynos/main-loop']
};

Object.keys(moduleReadmes).forEach(saveModuleDoc);

function saveModuleDoc(moduleName) {
    var moduleData = moduleReadmes[moduleName];
    var moduleReadmePath = path.join(modulesPath, moduleData[0],
        moduleData[1]);
    var moduleUrl = 'https://github.com/' + moduleData[2];
    var modulePackagePath = path.join(modulesPath, moduleData[0],
        'package.json');
    var modulePackageInfo = JSON.parse(fs.readFileSync(modulePackagePath,
        'utf8'));
    var moduleVersion = modulePackageInfo.version;

    var moduleDocPath = path.join(docsPath, moduleName + '.md');
    var docFile = fs.createWriteStream(moduleDocPath);

    docFile.write('Auto generated from [' + moduleData[0] + '](' + moduleUrl +
        ') (version ' + moduleVersion + ').\n\n',
        function writeModuleDocFile() {
            var moduleReadmeFile = fs.createReadStream(moduleReadmePath);
            moduleReadmeFile.pipe(docFile);
        }
    );
}
