"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = target => {
  const natives = {
    getters: new Map(),
    setters: new Map(),
    callers: new Map()
  };
  return new Proxy(target, {
    get(target, property, receiver) {
      if (property in natives) {
        return natives[property];
      }

      if (natives.getters.get(property)) {
        return natives.getters.get(property)(target, property, receiver);
      }

      if (natives.callers.get(property)) {
        return natives.callers.get(property);
      }

      return Reflect.get(target, property, receiver);
    },

    set(target, property, receiver) {
      if (natives.setters.has(property)) {
        return natives.setters.get(property)(target, property, receiver);
      }

      return Reflect.set(target, property, receiver);
    }

  });
};

exports.default = _default;