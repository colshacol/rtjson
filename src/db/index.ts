import rethink from 'rethinkdb'

import connect from './connect'

const connectionOptions = { host: 'localhost', port: 28015 }

const createTable = (connection, tableName) => {
  return new Promise((resolve, reject) => {
    rethink.db()
  })
}

const initialize = async () => {
  try {
    const connection = await connect(connectionOptions)

    rethink.db('test').tableCreate('server_logs').run

    r.db('test')
      .tableCreate('tv_shows')
      .run(connection, function(err, res) {
        if (err) throw err
        console.log(res)
        r.table('tv_shows')
          .insert({ name: 'Star Trek TNG' })
          .run(connection, function(err, res) {
            if (err) throw err
            console.log(res)
          })
      })
  } catch (error) {
    throw new Error('Connection failed:', error)
  }
}
