import createHttpServer from './serf/createHttpServer'
import Socket from './socket'

import routes from './router/v0'

// Start up the server. That is all we do here!
const main = () => {
  const socket = new Socket({
    port: 80,
  })
}

main()
