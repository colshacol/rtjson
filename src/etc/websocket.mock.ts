const WebSocket = require('ws')

// Connect to the socket server.

const ws = new WebSocket('ws://localhost:8080')

const storage = {
  uid: '',
}

// This is just a utility to simply sending message to my socket server.

const sendMessage = (message) => {
  if (typeof message === 'string') {
    return ws.send(message)
  }

  return ws.send(JSON.stringify(message))
}

// What to do when the socket connection is made.

ws.on('open', () => {
  console.log('Opened connection. Sending "something".')
})

// What to do when your app receives a message from the socket server.

ws.on('message', (data) => {
  console.log('Got a message from the socket server.')
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

// setTimeout(() => {
//   sendMessage({
//     uid: storage.uid,
//     user: 'amit-patel',
//     name: 'my-collection',
//     additions: [
//       {
//         type: 'log',
//         messages: ['rorororor', 'bbb', '222'],
//       },
//       {
//         type: 'error',
//         messages: ['hehe', 'qa3ym,,', '111'],
//       },
//       {
//         type: 'warn',
//         messages: ['q3gaedg', 'srgrs', '998699'],
//       },
//     ],
//   })
// }, 5000)
