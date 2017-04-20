"use strict";
exports.Path = function (constr, path) {
    var target = new String(path ? path : '');
    return new Proxy(target, {
        get: function (target, prop) {
            return constr[prop] ? exports.Path(constr[prop], path ? path + "." + prop : prop) : target[prop];
        },
        set: function (target, prop, value) {
            return false;
        }
    });
};
