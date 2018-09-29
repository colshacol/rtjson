"use strict";

var _fetch = _interopRequireDefault(require("./fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fetch.default)('http://localhost:8090/addLog').post({
  type: 'log',
  messages: ['a', 'b', 'c']
}).json(a => {
  console.log('success!', a);
});