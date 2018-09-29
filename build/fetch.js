"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wretch = _interopRequireDefault(require("wretch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (() => {
  (0, _wretch.default)().polyfills({
    fetch: require('node-fetch'),
    FormData: require('form-data'),
    URLSearchParams: require('url').URLSearchParams
  });
  return _wretch.default;
})();

exports.default = _default;