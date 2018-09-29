import createHttpServer from './serf/createHttpServer'
import Socket from './socket'
import createDB from './database'

import routes from './router/v0'

const main = () => {
  const socket = new Socket({
    port: 8080,
  })

  const db = createDB(socket)

  return createHttpServer({
    port: 8090,
    routes,
    routePrefix: '',
    context: {
      socket,
      db,
    },
  })
}

main()
