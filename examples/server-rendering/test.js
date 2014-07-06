var assert = require("assert");
var select = require("vtree-select");
var render = require('./render.js');

var state = {
    description: 'server description',
    events: { add: {} },
    items: [{
        name: 'server item name'
    }]
};

var tree = render(state);

// Assert description
var spanText = select("div:root > span")(tree)[0].children[0].text;
assert(spanText === state.description);

// Assert items
var items = select("div ul li span")(tree);
assert(items.length === state.items.length);
items.forEach(function(item, i) {
  assert.equal(item.children[0].text, state.items[i].name);
});

// Assert name input
assert(select("input[name=name]")(tree));
