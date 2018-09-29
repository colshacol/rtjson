const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:8080')

const storage = {
  uid: '',
}

const sendMessage = (message) => {
  if (typeof message === 'string') {
    return ws.send(message)
  }

  return ws.send(JSON.stringify(message))
}

ws.on('open', function open() {
  console.log('Opened connection. Sending "something".')
})

ws.on('message', function incoming(data) {
  console.log('Got a message!')
  const message = JSON.parse(data)

  if (message.messageType === 'uid') {
    console.log(`Connected with uid ${message.uid}`)
    storage.uid = message.uid

    return sendMessage({
      uid: storage.uid,
      subscribeTo: {
        user: 'amit-patel',
        name: 'my-collection',
      },
    })
  }

  if (message.messageType === 'update') {
    console.log(`Update for ${message.user} / ${message.name}`)
    console.log(message)
  }
})
