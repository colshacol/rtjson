"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lokijs = _interopRequireDefault(require("lokijs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const collectionName = data => `${data.user}:${data.name}`;

var _default = socket => {
  const db = new _lokijs.default('logs.db', {
    autoupdate: true,
    autosave: true,
    serializationMethod: 'pretty',
    autoload: true
  });

  const createCollection = data => {
    db.addCollection(collectionName(data));
  };

  const updateCollection = data => {
    const collection = db.getCollection(collectionName(data));

    if (data.additions) {
      collection.insert(data.additions);
    }

    socket.broadcast(data);
  };

  return {
    createCollection,
    updateCollection,
    db
  };
};

exports.default = _default;