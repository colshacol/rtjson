"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ws = _interopRequireDefault(require("ws"));

var _nanoid = _interopRequireDefault(require("nanoid"));

var _onMessage = _interopRequireDefault(require("./onMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const collectionName = data => `${data.user}:${data.name}`;

class Socket {
  constructor(options) {
    _defineProperty(this, "socket", void 0);

    _defineProperty(this, "subscriptions", new Map());

    _defineProperty(this, "associations", new Map());

    _defineProperty(this, "connections", new Set());

    _defineProperty(this, "sendTo", (client, data) => {
      client.send(JSON.stringify(data));
    });

    _defineProperty(this, "broadcast", data => {
      const _collectionName = collectionName(data);

      if (this.subscriptions.has(_collectionName)) {
        const subs = this.subscriptions.get(_collectionName);
        console.log(`Broadcasting change to ${subs.size} subscribers.`);
        subs.forEach(client => {
          this.sendTo(client, _objectSpread({
            messageType: 'update'
          }, data));
        });
      }
    });

    _defineProperty(this, "subscribe", data => {
      const client = this.associations.get(data.uid);

      const _collectionName = collectionName(data.subscribeTo);

      this.subscriptions.has(_collectionName) ? this.subscriptions.get(_collectionName).add(client) : this.subscriptions.set(_collectionName, new Set([client]));
      this.sendTo(client, {
        subscribed: true
      });
    });

    _defineProperty(this, "onListening", () => {
      console.log('WebSocket server listening.');
    });

    _defineProperty(this, "confirmConnection", data => () => {
      this.connections.add(data.uid);
    });

    _defineProperty(this, "onConnection", client => {
      console.log('Got a connection.');
      const data = {
        messageType: 'uid',
        uid: (0, _nanoid.default)()
      };
      this.connections.add(data.uid);
      this.associations.set(data.uid, client);
      client.on('message', this.onMessage);
      client.on('pong', this.confirmConnection(data));
      this.sendTo(client, data);
    });

    _defineProperty(this, "onMessage", (0, _onMessage.default)(this));

    const socket = new _ws.default.Server(options);
    socket.on('connection', this.onConnection);
    socket.on('listening', this.onListening);
    this.socket = socket;
    setInterval(() => {
      this.associations.forEach((client, uid) => {
        if (!this.connections.has(uid)) return client.terminate();
        this.connections.delete(uid);
        client.ping(() => {});
      });
    }, 10000);
  }

}

exports.default = Socket;