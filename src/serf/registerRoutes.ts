import Router from 'router'
import compression from 'compression'
import bodyParser from 'body-parser'

const send = (response) => (data) => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  return typeof data === 'string' ? response.end(data) : response.end(JSON.stringify(data))
}

const withCustomContext = (handler, options) => (request, response) => {
  return handler({ ...options.context, request, response, send: send(response) })
}

const registerRoute = (router, options) => ({ method, match, handler, middleware }) => {
  const path = `${options.routePrefix}${match}`

  // middleware.forEach((mw) => {
  //   router.use(path, mw())
  // })

  router[method](path, withCustomContext(handler, options))
}

const createRouter = () => {
  return Router({
    strict: true,
    caseSensitive: true,
  })
}

// const applyRouteMiddleware = (route, middlewares) => {
//   middlewares.forEach((middleware) => {
//     router.use(middleware())
//   })
// }

const applyRouterMiddleware = (router) => {
  router.use(compression())
  router.use(bodyParser.json())
}

export default (options) => {
  const router = createRouter()
  options.routes.forEach(registerRoute(router, options))
  applyRouterMiddleware(router)
  return router
}
