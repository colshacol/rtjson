import * as Router from 'router'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'

const withCustomContext = (handler) => (request, response) => {
  return handler({ request, response })
}

const registerRoute = (router, options) => ({ method, match, handler }) => {
  const path = `${options.routePrefix}${match}`
  router[method](path, withCustomContext(handler))
}

const createRouter = () => {
  return Router({
    strict: true,
    caseSensitive: true,
  })
}

const applyMiddleware = (router) => {
  router.use(compression())
  router.use(bodyParser.json())
}

export default (options) => {
  const router = createRouter()
  options.routes.forEach(registerRoute(router, options))
  applyMiddleware(router)
  return router
}
