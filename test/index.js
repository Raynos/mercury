var test = require('tape');

var mercury = require('../index');

// FFFfffff--- phantomJS.
if (!Function.prototype.bind) {
    Function.prototype.bind = require('function-bind');
}

test('mercury is a object', function t(assert) {
    assert.equal(typeof mercury, 'object');
    assert.end();
});

require('./synthetic-events.js');
require('./count.js');
require('./shared-state.js');
require('./bmi-counter.js');
