const http = require('http')
const finalhandler = require('finalhandler')
import registerRoutes from './registerRoutes'

export default (options) => {
  const route = registerRoutes(options)

  const server = http.createServer((request, response) => {
    route(request, response, finalhandler(request, response))
  })

  server.listen(options.port, (error) => {
    if (error) throw error
    console.log(`Listening @ http://localhost:${options.port}`)
  })

  server.on('error', (error) => {
    console.error(error)
  })
}
