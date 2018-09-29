"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createCollection = _interopRequireDefault(require("./createCollection"));

var _updateCollection = _interopRequireDefault(require("./updateCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_createCollection.default, _updateCollection.default];
exports.default = _default;