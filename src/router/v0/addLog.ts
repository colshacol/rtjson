// const addLog = {
//   method: 'post',
//   match: '/addLog',
//   middleware: [compression(), bodyParser.json()],

//   async handler(context) {
//     try {
//       const b = await jsonBody(context.request, context.response)
//       socket.broadcast(b)
//       context.response.setHeader('Content-Type', 'application/json; charset=utf-8')
//       context.response.end(JSON.stringify({ result: 'success' }))
//     } catch (error) {
//       console.error('EEE', error)
//     }
//   },
// }
