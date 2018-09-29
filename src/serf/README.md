# serf

```js
type RouteContextT = {
  request: RequestT,
  response: ResponseT
}

type RouteHandlerT = (context: RouteContextT): any

type RouteOptionsT = {
  method: 'get' | 'put' | 'post' | 'delete',
  match: string,
  handler: RouterHandlerT
}
type ServerOptionsT = {
  port: number,
  routerPrefix: string,
  routes: RouteOptionsT[]
}
```

```js
const createHttpServer = require('./serf/createHttpServer')
const createSocketServer = require('./serf/createSocketServer')

const getTest = require('./api/v0/tests/getTest')
const getTests = require('./api/v0/tests/getTests')
const getTestList = require('./api/v0/tests/getTestList')
const addTestToList = require('./api/v0/tests/addTestToList')

const start = async () => {
  const server = createHttpServer({
    port: 3001,
    routes: [getTest, getTests, getTestList, addTestToList],
    routePrefix: '/api/v0',
  })
}
```

## TODO

- Distribute this som'bitch.
