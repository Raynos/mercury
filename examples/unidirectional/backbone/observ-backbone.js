'use strict';

/* This is a reference implementation of how to recursively
    observ a Backbone.Model.

    A proper implementation is going to need a bunch of
    performance optimizations

*/
module.exports = toObserv;

// given some model returns an observable of the model state
function toObserv(model) {
    // return an obect
    return function observ(listener) {
        // observ() with no args must return state
        if (!listener) {
            return serialize(model);
        }

        // observ(listener) should notify the listener on
        // every change
        listen(model, function serializeModel() {
            listener(serialize(model));
        });
    };

    // listen to a Backbone model
    function listen(model, listener) {
        model.on('change', listener);

        model.values().forEach(function listenRecur(value) {
            var isCollection = value && value._byId;

            if (!isCollection) {
                return;
            }

            // for each collection listen to it
            // console.log('listenCollection')
            listenCollection(value, listener);
        });
    }

    // listen to a Backbone collection
    function listenCollection(collection, listener) {
        collection.forEach(function listenModel(model) {
            listen(model, listener);
        });

        collection.on('add', function onAdd(model) {
            listen(model, listener);
            listener();
        });
    }

    // convert a Backbone model to JSON
    function serialize(model) {
        var data = model.toJSON();
        Object.keys(data).forEach(function serializeRecur(key) {
            var value = data[key];
            // if any value can be serialized toJSON() then do it
            if (value && value.toJSON) {
                data[key] = data[key].toJSON();
            }
        });
        return data;
    }
}
