"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const parseMessage = data => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

var _default = self => data => {
  console.log('Got a message.');
  const message = parseMessage(data);

  if (message.subscribeTo) {
    console.log('Got a subscription.');
    self.subscribe(message);
  }
};

exports.default = _default;