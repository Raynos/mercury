'use strict';

var document = require('global/document');
var mercury = require('../../index');
var app = require('./app');
var state = app();

mercury.app(document.body, state, app.render);
