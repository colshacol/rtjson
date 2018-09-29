"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ws = _interopRequireDefault(require("ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Socket {
  constructor(options) {
    _defineProperty(this, "socket", void 0);

    _defineProperty(this, "sendTo", (client, data) => {
      if (client.readyState === _ws.default.OPEN) {
        client.send(JSON.stringify(data));
      }
    });

    _defineProperty(this, "broadcast", data => {
      this.socket.clients.forEach(client => {
        this.sendTo(client, data);
      });
    });

    _defineProperty(this, "onListening", () => {
      console.log('WebSocket server listening.');
    });

    _defineProperty(this, "onConnection", client => {
      console.log('Got a connection.', client);
      client.on('message', this.onMessage);
    });

    _defineProperty(this, "onMessage", data => {
      console.log('Got a message', data);
    });

    const socket = new _ws.default.Server(options);
    socket.on('connection', this.onConnection);
    socket.on('listening', this.onListening);
    this.socket = socket;
  }

}

exports.default = Socket;