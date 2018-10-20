import loki from 'lokijs'

const collectionName = (data) => `${data.user}:${data.name}`

export default (socket) => {
  const db = new loki('logs.db', { autoupdate: true, autosave: true, serializationMethod: 'pretty', autoload: true })

  const createCollection = (data) => {
    return db.addCollection(collectionName(data))
  }

  const getCollection = (data) => {
    return db.getCollection(collectionName(data)) || createCollection(data)
  }

  const updateCollection = (data) => {
    const collection = getCollection(data)

    if (data.additions) {
      collection.insert(data.additions)
    }
  }

  return {
    createCollection,
    updateCollection,
    db,
  }
}
