import * as loki from 'lokijs'
import proxy from './proxy'

export default (socket) => {
  const db = new loki('logs.db')
  const logs = db.addCollection('logs')

  const database = proxy(logs)

  database.callers.set('insert', (log) => {
    socket.broadcast(log)
    logs.insert(log)
    return log
  })

  return database
}
