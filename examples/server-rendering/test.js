var test = require("tape");
var select = require("vtree-select");
var render = require('./render.js');

test("server-rendering vtree structure", function(t) {
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
  t.equal(spanText, state.description);

  // Assert items
  var items = select("div ul li span")(tree);
  t.equal(items.length, state.items.length);
  items.forEach(function(item, i) {
    t.equal(item.children[0].text, state.items[i].name);
  });

  // Assert name input
  t.ok(select("input[name=name]")(tree));
  t.end();
});
