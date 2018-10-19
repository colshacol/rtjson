import loki from 'lokijs'

const collectionName = (data) => `${data.user}:${data.name}`

export default (socket) => {
  const db = new loki('logs.db', { autoupdate: true, autosave: true, serializationMethod: 'pretty', autoload: true })

  const createCollection = (data) => {
    db.addCollection(collectionName(data))
  }

  const updateCollection = (data) => {
    const collection = db.getCollection(collectionName(data))
    
    ir (!collection) {
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
