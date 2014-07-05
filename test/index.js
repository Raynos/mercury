var test = require('tape');

var mercury = require('../index');

test('mercury is a object', function t(assert) {
    assert.equal(typeof mercury, 'object');
    assert.end();
});

require('./synthetic-events.js');
require('./count.js');
require('./shared-state.js');
require('./field-reset.js');
