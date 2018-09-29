"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pify = _interopRequireDefault(require("pify"));

var _json = _interopRequireDefault(require("body/json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jsonBody = (0, _pify.default)(_json.default);
var _default = {
  method: 'post',
  match: '/createCollection',

  async handler(context) {
    try {
      const body = await jsonBody(context.request, context.response);
      console.log(`Creating user "${body.user}" collection "${body.name}".`);
      context.db.createCollection(body);
      context.send({
        success: true
      });
    } catch (error) {
      console.error('/createCollection error: ', error);
    }
  }

};
exports.default = _default;