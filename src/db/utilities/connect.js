import rethink from 'rethinkdb'

export default (options) => {
  return new Promise((resolve, reject) => {
    rethink.connect(
      options,
      (error, connection) => {
        if (error) reject(error)
        resolve(connection)
      },
    )
  })
}
