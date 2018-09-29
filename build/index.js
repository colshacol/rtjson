"use strict";

var _createHttpServer = _interopRequireDefault(require("./serf/createHttpServer"));

var _socket = _interopRequireDefault(require("./socket"));

var _database = _interopRequireDefault(require("./database"));

var _v = _interopRequireDefault(require("./router/v0"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const main = () => {
  const socket = new _socket.default({
    port: 8080
  });
  const db = (0, _database.default)(socket);
  return (0, _createHttpServer.default)({
    port: 8090,
    routes: _v.default,
    routePrefix: '',
    context: {
      socket,
      db
    }
  });
};

main();