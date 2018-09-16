import * as nanoid from 'nanoid'
import * as bodyJson from 'body/json'
import * as pify from 'pify'

import createHttpServer from './serf/createHttpServer'
import Socket from './Socket'
import createDB from './database'

const jsonBody = pify(bodyJson)

const main = async () => {
  const socket = new Socket({
    port: 8080,
  })

  const database = createDB(socket)

  const addLog = {
    method: 'post',
    match: '/addLog',
    async handler(context) {
      try {
        const b = await jsonBody(context.request, context.response)
        socket.broadcast(b)
        context.response.setHeader('Content-Type', 'application/json; charset=utf-8')
        context.response.end(JSON.stringify({ result: 'success' }))
      } catch (error) {
        console.error('EEE', error)
      }
    },
  }

  const server = createHttpServer({
    port: 8090,
    routes: [addLog],
    routePrefix: '',
  })
}

main()
