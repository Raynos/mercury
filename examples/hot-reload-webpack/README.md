# Hot module replacement with webpack

Using hot reloading while developing can improve your workflow.
No more clicking through your application to a particular state each time you change the rendering code!

## Running the example

This example must be run standalone, instead of through the usual `npm run examples` in this repository's root.
To install and run it:

    npm install
    npm run dev

Edit [package.json][] if you want to run on a different port.
If you're running inside a container or VM, add `--host 0.0.0.0` so you can access the dev server from your host machine.

Try clicking to increment the counter, then edit [render.js][]!
Your changes should instantly appear on the page without refreshing or upsetting the counter's value.
Note that if you edit [browser.js][], your page will refresh and your state will be reset.

[package.json]: ./package.json
[render.js]: ./render.js
[browser.js]: ./browser.js

## How it works

Running `webpack-dev-server` with the `--hot` argument enables [hot module replacement][], but to make use of it you need to add a little bit of code to your application.
When webpack detects a file has changed, `module.hot.accept` gets a chance to 'claim' the reload and prevent the page from refreshing as it usually would.
We use that opportunity to replace the function the app uses to render.
We have to be careful to not reseat any references - so we pass a function that doesn't change to `hg.app` (i.e. `App.render`), but inside that function, we call a function which may change at runtime.

[hot module replacement]: https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack
