'use strict';

var RCSS = require('rcss');

module.exports = {
    error: RCSS.registerClass({
        color: 'red'
    }),
    inputError: RCSS.registerClass({
        borderColor: 'red'
    })
};
