# Hot module replacement with browserify/watchify, webpack or amok

Using hot reloading while developing can improve your workflow.
No more clicking through your application to a particular state each time you change the rendering code!

## Running the examples

This example must be run standalone, instead of through the usual `npm run examples` in this repository's root.
To install and run:

    npm install

    // for browserify
    npm run hot-browserify

    // for webpack
    npm run hot-webpack

    // for amok
    npm run hot-amok

### browserify and webpack
Edit [package.json][] if you want to run on a different port.
If you're running inside a container or VM, add `--host 0.0.0.0` (webpack) so you can access the dev server from your host machine.

Try clicking to increment the counter, then edit [render.js][]!
Your changes should instantly appear on the page without refreshing or upsetting the counter's value.
Note that if you edit [browser.js][], your page will refresh and your state will be reset (only using webpack).

### amok
Amok starts its own web server to provide hot reloading and also starts the browser. Live editing is not limited to the render function. It uses a V8 feature instead of eval and is limited to Chrome or Chromium browsers. Change the counter increment in `browser.js` for example.

Edit [package.json][] to switch the web browser to use (Chrome or Chromium).

[package.json]: ./package.json
[render.js]: ./render.js
[browser.js]: ./browser.js

## How it works

### webpack
Running `webpack-dev-server` with the `--hot` argument enables [hot module replacement][], but to make use of it you need to add a little bit of code to your application.
When webpack detects a file has changed, `module.hot.accept` gets a chance to 'claim' the reload and prevent the page from refreshing as it usually would.
We use that opportunity to replace the function the app uses to render.
We have to be careful to not reseat any references - so we pass a function that doesn't change to `hg.app` (i.e. `App.render`), but inside that function, we call a function which may change at runtime.

### browserify/watchify
The main difference to webpack is that browserify does not come with a dev-server which is why we use [http-server][] to host our example. Other than that it works quite similar. Under the hood [browserify-hmr][] imitates webpack's hot module replacement.

### amok
[Amok][] uses watchify to fire a `patch` event on the window object when a file is changed. Similarly to the webpack/browserify, we must change the state so Mercury re-renders automatically. Without this action, the changes in the code would only be seen after we clicked the button in the example. (The button click would change the state and trigger a re-render as well.)

[hot module replacement]: https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack
[http-server]: https://github.com/indexzero/http-server
[browserify-hmr]: https://github.com/AgentME/browserify-hmr
[Amok]: https://github.com/caspervonb/amok

