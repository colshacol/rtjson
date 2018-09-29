"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _router = _interopRequireDefault(require("router"));

var _compression = _interopRequireDefault(require("compression"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const send = response => data => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  return typeof data === 'string' ? response.end(data) : response.end(JSON.stringify(data));
};

const withCustomContext = (handler, options) => (request, response) => {
  return handler(_objectSpread({}, options.context, {
    request,
    response,
    send: send(response)
  }));
};

const registerRoute = (router, options) => ({
  method,
  match,
  handler,
  middleware
}) => {
  const path = `${options.routePrefix}${match}`; // middleware.forEach((mw) => {
  //   router.use(path, mw())
  // })

  router[method](path, withCustomContext(handler, options));
};

const createRouter = () => {
  return (0, _router.default)({
    strict: true,
    caseSensitive: true
  });
}; // const applyRouteMiddleware = (route, middlewares) => {
//   middlewares.forEach((middleware) => {
//     router.use(middleware())
//   })
// }


const applyRouterMiddleware = router => {
  router.use((0, _compression.default)());
  router.use(_bodyParser.default.json());
};

var _default = options => {
  const router = createRouter();
  options.routes.forEach(registerRoute(router, options));
  applyRouterMiddleware(router);
  return router;
};

exports.default = _default;