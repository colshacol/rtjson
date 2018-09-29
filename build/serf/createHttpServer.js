"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _registerRoutes = _interopRequireDefault(require("./registerRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const http = require('http');

const finalhandler = require('finalhandler');

var _default = options => {
  const route = (0, _registerRoutes.default)(options);
  const server = http.createServer((request, response) => {
    route(request, response, finalhandler(request, response));
  });
  server.listen(options.port, error => {
    if (error) throw error;
    console.log(`Listening @ http://localhost:${options.port}`);
  });
  server.on('error', error => {
    console.error(error);
  });
};

exports.default = _default;