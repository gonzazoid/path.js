"use strict";
exports.Path = function (constr, path) {
    var target = new String(path);
    return new Proxy(target, {
        get: function (target, prop) {
            return prop in target || typeof prop !== 'string' ? target[prop] : exports.Path(path ? path + "." + prop : prop);
        },
        set: function (target, prop, value) {
            return false;
        }
    });
};
