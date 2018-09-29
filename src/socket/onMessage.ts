const parseMessage = (data) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export default (self) => (data) => {
  console.log('Got a message.')
  const message = parseMessage(data)

  if (message.subscribeTo) {
    console.log('Got a subscription.')
    self.subscribe(message)
  }

  if (message.additions) {
    console.log(`Updating user "${message.user}" collection "${message.name}".`)
    self.db.updateCollection(message)
    self.broadcast(message)
  }
}
