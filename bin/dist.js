var browserify = require('browserify');
var fs = require('fs');
var path = require('path');

var version = require('../package.json').version;

var bundle = browserify()
    .add(path.join(__dirname, '..', 'index.js'))
    .bundle({ standalone: 'mercury' });

var dest = fs.createWriteStream(
    path.join(__dirname, '..', 'dist', 'mercury.js')
);

dest.write('// mercury @ ' + version + ' \n');
bundle.pipe(dest);

dest.on('finish', function fini() {
    console.log('OK done');
});
