var mercury = require("../index.js");

var React = (function () {
  var ReactLite = {};
  ReactLite.DOM = {};
  ['div', 'img', 'p', 'a', 'h4', 'input', 'b'].forEach(function (tagName) {
    ReactLite.DOM[tagName] = function (props, children) {
      props = props || {};
      
      if (props.onKeyUp) {
        props['data-keyup'] = props.onKeyUp;
        props.onKeyUp = null;
      }
     
      return mercury.h(tagName, props, children);
    };
  });
  
  // set up event delegation
  mercury.Delegator();
  
  ReactLite.renderComponent = function (comp, container) {
    var elem = comp.init();
    container.appendChild(elem);
  };
  
  ReactLite.createClass = function (opts) {
    var Widget = function (args) {
      if (!(this instanceof Widget)) {
        return new Widget();
      }
      
      Object.keys(opts).forEach(function (key) {
        this[key] = opts[key].bind(this);
      }, this); 
      this.state = mercury.value();
    };
    
    Widget.prototype.init = function () {
      this.state.set(this.getInitialState());
      var loop = mercury.main(this.state(), this.render);
      this.state(loop.update);
      return loop.target;
    };
    
    Widget.prototype.setState = function (value) {
      this.state.set(value);
    };
    
    return Widget;
  };
  
  return ReactLite;
}());


function computeBallmerPeak(x) {
  // see: http://ask.metafilter.com/76859/Make-a-function-of-this-graph-Thats-like-an-antigraph
  x = x * 100;
  return (
    1-1/(1+Math.exp(-(x-6)))*.5 + Math.exp(-Math.pow(Math.abs(x-10), 2)*10)
  ) / 1.6;
}

var DOM = React.DOM;

var BallmerPeakCalculator = React.createClass({
  getInitialState: function() {
    return {bac: 0};
  },
  handleChange: function(event) {
    this.setState({bac: event.target.value});
  },
  render: function(state) {
    var pct = computeBallmerPeak(Number(state.bac));
    if (isNaN(pct)) {
      pct = 'N/A';
    } else {
      pct = (100 - Math.round(pct * 100)) + '%';
    }
    return DOM.div(null, [
      DOM.img(({ src: "https://raw.githubusercontent.com/facebook/react/" +
        "master/examples/ballmer-peak/ballmer_peak.png" })),
      DOM.p(null, [
        "Credit due to ",
        DOM.a({ href: "http://xkcd.com/323/" }, "xkcd"),
        "."
      ]),
      DOM.h4(null, "Complete your Balmmer Peak:"),
      DOM.p([
        "If your BAC is ",
        DOM.input({
          type: "text",
          onKeyUp: this.handleChange,
          value: state.bac
        }),
        ", then ",
        DOM.b(null, pct),
        " of your lines of code will have bugs."
      ])
    ]);
  }
});

React.renderComponent(
  BallmerPeakCalculator(),
  document.body
);
