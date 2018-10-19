import loki from 'lokijs'

const collectionName = (data) => `${data.user}:${data.name}`

export default (socket) => {
  const db = new loki('logs.db', { autoupdate: true, autosave: true, serializationMethod: 'pretty', autoload: true })

  const createCollection = (data) => {
    return db.addCollection(collectionName(data))
  }

  const updateCollection = (data) => {
    const collection = db.getCollection(collectionName(data)) || createCollection(data)

    console.log({ collection, data })

    if (!collection) {
      createCollection(collectionName(data))
      return updateCollection(data)
    }

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
